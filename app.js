(() => {
  'use strict';

  const config = window.FN_CONFIG || {};
  const root = document.documentElement;
  const body = document.body;
  const toast = document.getElementById('toast');
  let toastTimeout;

  const announce = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => { toast.hidden = true; }, 3800);
  };

  // Keep the theme preference small and optional; the system theme is the fallback.
  const themeButton = document.querySelector('.theme-toggle');
  const savedTheme = (() => {
    try { return window.localStorage.getItem('fn-theme'); } catch (_) { return null; }
  })();
  if (savedTheme === 'dark' || savedTheme === 'light') root.dataset.theme = savedTheme;
  const updateThemeControl = () => {
    if (!themeButton) return;
    const isDark = root.dataset.theme === 'dark' || (!root.dataset.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    themeButton.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    themeButton.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  };
  updateThemeControl();
  themeButton?.addEventListener('click', () => {
    const currentDark = root.dataset.theme === 'dark' || (!root.dataset.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const next = currentDark ? 'light' : 'dark';
    root.dataset.theme = next;
    try { window.localStorage.setItem('fn-theme', next); } catch (_) { /* Private browsing: theme still works for this page. */ }
    updateThemeControl();
  });

  // Accessible mobile navigation. No scroll locking or heavyweight menu library.
  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenu = () => {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    mobileMenu.hidden = true;
    body.classList.remove('menu-open');
  };
  menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    mobileMenu.hidden = isOpen;
    body.classList.toggle('menu-open', !isOpen);
  });
  mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); }, { passive: true });

  // Search and category filters work locally against the content blocks already in the page.
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const feedCards = [...document.querySelectorAll('.feed-card')];
  const searchInput = document.getElementById('feed-search');
  const emptyState = document.getElementById('feed-empty');
  let activeFilter = 'all';
  const filterFeed = () => {
    const query = (searchInput?.value || '').trim().toLowerCase();
    let shown = 0;
    feedCards.forEach((card) => {
      const categories = (card.dataset.category || '').split(/\s+/);
      const searchable = `${card.dataset.search || ''} ${card.textContent}`.toLowerCase();
      const matchesCategory = activeFilter === 'all' || categories.includes(activeFilter);
      const matchesQuery = !query || searchable.includes(query);
      const visible = matchesCategory && matchesQuery;
      card.hidden = !visible;
      if (visible) shown += 1;
    });
    if (emptyState) emptyState.hidden = shown !== 0;
  };
  filterButtons.forEach((button) => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter || 'all';
    filterButtons.forEach((candidate) => {
      const selected = candidate === button;
      candidate.classList.toggle('is-active', selected);
      candidate.setAttribute('aria-pressed', String(selected));
    });
    filterFeed();
  }));
  searchInput?.addEventListener('input', filterFeed, { passive: true });

  // Connection buttons open only a configured, verified URL. No fabricated link.
  document.querySelectorAll('[data-connect="whatsapp"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      const url = typeof config.whatsappChannelUrl === 'string' ? config.whatsappChannelUrl.trim() : '';
      if (url && /^https:\/\//i.test(url)) {
        event.preventDefault();
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        event.preventDefault();
        announce('WhatsApp link not configured yet. Add the official channel URL in site-config.js.');
      }
    });
  });

  // Show verified Minecraft details only; unconfigured values remain explicit.
  const serverAddress = typeof config.minecraftServerAddress === 'string' ? config.minecraftServerAddress.trim() : '';
  const edition = typeof config.minecraftEdition === 'string' ? config.minecraftEdition.trim() : '';
  const version = typeof config.minecraftVersion === 'string' ? config.minecraftVersion.trim() : '';
  const addressEl = document.getElementById('server-address');
  const editionEl = document.getElementById('server-edition');
  const versionEl = document.getElementById('server-version');
  const copyButton = document.getElementById('copy-server');
  const serverStatus = document.querySelector('.server-status');
  const serverNote = document.getElementById('server-note');
  if (serverAddress && addressEl) {
    addressEl.textContent = serverAddress;
    if (copyButton) copyButton.disabled = false;
    if (serverStatus) { serverStatus.classList.add('is-configured'); serverStatus.lastChild.textContent = ' Details added'; }
    if (serverNote) serverNote.textContent = 'Use the confirmed address above, and make sure your game edition and version match the server requirements.';
  }
  if (editionEl && edition) editionEl.textContent = edition;
  if (versionEl && version) versionEl.textContent = version;
  copyButton?.addEventListener('click', async () => {
    if (!serverAddress) return;
    try {
      await navigator.clipboard.writeText(serverAddress);
      announce('Server address copied. See you in the world.');
    } catch (_) {
      announce(`Server address: ${serverAddress}`);
    }
  });

  const whatsappConfigured = typeof config.whatsappChannelUrl === 'string' && /^https:\/\//i.test(config.whatsappChannelUrl.trim());
  const connectNote = document.getElementById('connect-note');
  if (whatsappConfigured && connectNote) connectNote.textContent = 'FreakyNews is ready to open in a new tab.';

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Mark sections in view for the small active-link hint; no continuous scroll handlers.
  if ('IntersectionObserver' in window) {
    const navLinks = [...document.querySelectorAll('.desktop-nav a')];
    const linkById = new Map(navLinks.map((link) => [link.getAttribute('href')?.slice(1), link]));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.remove('is-current'));
        linkById.get(entry.target.id)?.classList.add('is-current');
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    ['worlds', 'freakynews', 'smp', 'about'].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }
})();
