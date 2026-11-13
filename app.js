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
  let savedTheme = (() => {
    try { return window.localStorage.getItem('fn-theme'); } catch (_) { return null; }
  })();
  if (savedTheme === 'dark' || savedTheme === 'light') root.dataset.theme = savedTheme;
  // Keep page canvas, theme metadata and browser chrome aligned with the selected
  // site theme. Android system navigation/gesture bars are owned by the browser/OS;
  // a PWA may keep its install-time bar colour even after these values change.
  const BAR = { light: '#f2f2f2', dark: '#000000' };
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const schemeMeta = document.querySelector('meta[name="color-scheme"]');

  const updateSystemThemeColor = () => {
    const mode = root.dataset.theme === 'dark' ? 'dark' : 'light';
    const color = BAR[mode];
    // Update the EXISTING element; don't remove/recreate it on each toggle.
    // Browsers can miss a rapid dynamic meta replacement, especially in PWAs.
    if (themeMeta) themeMeta.setAttribute('content', color);
    if (schemeMeta) schemeMeta.setAttribute('content', mode);
    root.style.colorScheme = mode;
    root.style.backgroundColor = color;
    body.style.backgroundColor = color;
  };

  const updateThemeControl = () => {
    const isDark = root.dataset.theme === 'dark';
    if (themeButton) {
      themeButton.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      themeButton.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
    updateSystemThemeColor();
  };

  const followSystemTheme = () => {
    if (savedTheme === 'dark' || savedTheme === 'light') return;
    root.dataset.theme = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    updateThemeControl();
  };

  try {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
    if (typeof systemTheme.addEventListener === 'function') {
      systemTheme.addEventListener('change', followSystemTheme);
    } else if (typeof systemTheme.addListener === 'function') {
      systemTheme.addListener(followSystemTheme);
    }
  } catch (_) { /* Old browsers may not expose media-query listeners. */ }

  // Restore the selected colour when returning from the back-forward cache or
  // the home screen; don't reset an explicitly chosen theme.
  window.addEventListener('pageshow', () => {
    if (savedTheme !== 'dark' && savedTheme !== 'light') followSystemTheme();
    else updateThemeControl();
  });
  window.addEventListener('visibilitychange', () => {
    if (!document.hidden) updateSystemThemeColor();
  });

  updateThemeControl();
  themeButton?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    savedTheme = next;
    try { window.localStorage.setItem('fn-theme', next); }
    catch (_) { /* Private browsing: keep the theme for this session. */ }
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
  window.addEventListener('resize', () => { if (window.innerWidth > 880) closeMenu(); }, { passive: true });

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

  // Connection buttons open only a configured https URL. No fabricated links.
  const connectUrls = { whatsapp: config.whatsappChannelUrl, discord: config.discordInviteUrl, homie: config.whatsappGroupUrl, updates: config.updatesChannelUrl, smp: config.minecraftWhatsappUrl };
  const validUrl = (value) => (typeof value === 'string' && /^https:\/\//i.test(value.trim()) ? value.trim() : '');
  document.querySelectorAll('[data-connect]').forEach((button) => {
    button.setAttribute('rel', 'noopener noreferrer');
    const url = validUrl(connectUrls[button.dataset.connect]);
    if (url) {
      button.href = url;
      button.target = '_blank';
    }
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

  const connectNote = document.getElementById('connect-note');
  if (connectNote && validUrl(config.whatsappChannelUrl) && validUrl(config.discordInviteUrl)) connectNote.textContent = 'Official community links open in a new tab.';

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
