(() => {
  'use strict';
  const source = Array.isArray(window.FN_FEED_ITEMS) ? window.FN_FEED_ITEMS : [];
  const list = document.getElementById('stream-list');
  const sentinel = document.getElementById('stream-sentinel');
  const loadButton = document.getElementById('load-more');
  const loader = document.getElementById('stream-loader');
  const end = document.getElementById('stream-end');
  const empty = document.getElementById('stream-empty');
  const count = document.getElementById('stream-count');
  const search = document.getElementById('stream-search');
  const filters = [...document.querySelectorAll('[data-stream-filter]')];
  if (!list || !loadButton) return;

  const BATCH_SIZE = 4;
  let activeFilter = 'all';
  let cursor = 0;
  let visibleItems = [];
  let isLoading = false;
  let observer = null;
  let debounceId = 0;

  const currentMatches = () => {
    const query = (search?.value || '').trim().toLocaleLowerCase();
    return source.filter((item) => {
      const categories = String(item.category || '').split(/\s+/);
      const matchCategory = activeFilter === 'all' || categories.includes(activeFilter);
      const haystack = `${item.label || ''} ${item.title || ''} ${item.body || ''} ${item.source || ''}`.toLocaleLowerCase();
      return matchCategory && (!query || haystack.includes(query));
    });
  };

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>\"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', "'": '&#39;' })[char]);

  const artMarkup = (item) => {
    const tone = ({ editorial: 'stream-art-editorial', meme: 'stream-art-meme', signal: 'stream-art-signal', game: 'stream-art-game' })[item.art] || 'stream-art-editorial';
    const label = escapeHtml(item.artLabel || 'FN SQUAD');
    const headline = String(item.artHeadline || 'FN SQUAD').split(/\r?\n/).map(escapeHtml).join('<br>');
    return `<div class="stream-art ${tone}" aria-hidden="true"><span class="stream-art-label">${label}</span><strong>${headline}</strong><span class="stream-art-monogram">FN</span></div>`;
  };

  const cardMarkup = (item, index) => {
    const title = escapeHtml(item.title || 'Content slot');
    const body = escapeHtml(item.body || '');
    const label = escapeHtml(item.label || 'CONTENT SLOT');
    const sourceLabel = escapeHtml(item.source || 'SOURCE NEEDED');
    return `<article class="stream-card" data-entry-id="${String(item.id || `item-${index}`).replace(/[^a-zA-Z0-9_-]/g, '')}">
      <div class="stream-card-top"><span class="stream-avatar" aria-hidden="true">FN</span><div class="stream-author"><strong>FreakyNews</strong><span>FN Squad · DEMO</span></div><span class="preview-tag">CONTENT SLOT</span></div>
      <div class="stream-card-body"><div class="stream-category">${label}</div><h3>${title}</h3><p>${body}</p>${artMarkup(item)}</div>
      <div class="stream-card-footer"><span class="stream-source"><span class="source-dot" aria-hidden="true"></span>${sourceLabel}</span><span class="stream-count-index">${String(index + 1).padStart(2, '0')}</span></div>
    </article>`;
  };

  const updateStatus = () => {
    const shown = list.children.length;
    count.textContent = `Showing ${shown} of ${visibleItems.length} preview entries`;
    loadButton.hidden = cursor >= visibleItems.length || visibleItems.length === 0;
    end.hidden = cursor < visibleItems.length || visibleItems.length === 0;
    empty.hidden = visibleItems.length !== 0;
    if (filters.length) {
      const allButton = filters.find((button) => button.dataset.streamFilter === 'all');
      const countBadge = allButton?.querySelector('span');
      if (countBadge) countBadge.textContent = String(source.length).padStart(2, '0');
    }
  };

  const loadNextBatch = (isAutomatic = false) => {
    if (isLoading || cursor >= visibleItems.length) {
      updateStatus();
      return;
    }
    isLoading = true;
    if (loader) loader.hidden = false;
    const start = cursor;
    const stop = Math.min(cursor + BATCH_SIZE, visibleItems.length);
    const fragment = document.createDocumentFragment();
    for (let i = start; i < stop; i += 1) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = cardMarkup(visibleItems[i], i).trim();
      if (wrapper.firstElementChild) fragment.appendChild(wrapper.firstElementChild);
    }
    list.appendChild(fragment);
    cursor = stop;
    if (loader) loader.hidden = true;
    isLoading = false;
    updateStatus();
  };

  const resetFeed = () => {
    if (observer) observer.disconnect();
    list.replaceChildren();
    cursor = 0;
    visibleItems = currentMatches();
    if (visibleItems.length) loadNextBatch(false);
    else updateStatus();
    if (observer && sentinel) observer.observe(sentinel);
  };

  filters.forEach((button) => button.addEventListener('click', () => {
    activeFilter = button.dataset.streamFilter || 'all';
    filters.forEach((candidate) => {
      const selected = candidate === button;
      candidate.classList.toggle('is-active', selected);
      candidate.setAttribute('aria-pressed', String(selected));
    });
    resetFeed();
  }));
  search?.addEventListener('input', () => {
    window.clearTimeout(debounceId);
    debounceId = window.setTimeout(resetFeed, 120);
  });
  loadButton.addEventListener('click', () => loadNextBatch(false));

  if ('IntersectionObserver' in window && sentinel) {
    observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) loadNextBatch(true);
    }, { root: null, rootMargin: '0px 0px 320px 0px', threshold: 0 });
    observer.observe(sentinel);
  }

  visibleItems = currentMatches();
  loadNextBatch(false);
  if (observer && sentinel) observer.observe(sentinel);
})();
