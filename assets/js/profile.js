/* Progressive enhancement: content, navigation and citations work without JS. */
(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const syncTheme = () => {
    const dark = root.dataset.theme === 'dark';
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    themeColor.setAttribute('content', dark ? '#101a2b' : '#f5f8fc');
  };
  if (toggle) {
    toggle.hidden = false;
    syncTheme();
    toggle.addEventListener('click', () => {
      const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = theme;
      try { localStorage.setItem('yilun-theme', theme); } catch (error) { /* Storage is optional. */ }
      syncTheme();
    });
  }
  const links = [...document.querySelectorAll('.primary-nav a')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  let scheduled = false;
  const updateNavigation = () => {
    const offset = document.querySelector('.site-header').offsetHeight + 45;
    let current = sections[0];
    sections.forEach(section => { if (section.getBoundingClientRect().top <= offset) current = section; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = sections[sections.length - 1];
    links.forEach(link => {
      if (current && link.getAttribute('href') === `#${current.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scheduled = false;
  };
  const scheduleNavigation = () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); } };
  window.addEventListener('scroll', scheduleNavigation, { passive: true });
  window.addEventListener('resize', scheduleNavigation);
  updateNavigation();
  if (navigator.clipboard && window.isSecureContext) {
    document.querySelectorAll('.copy-citation').forEach(button => {
      button.hidden = false;
      button.addEventListener('click', async () => {
        const container = button.closest('.citation-body');
        const status = container.querySelector('.copy-status');
        try {
          await navigator.clipboard.writeText(container.querySelector('code').textContent.trim());
          status.textContent = 'Citation copied.';
        } catch (error) {
          status.textContent = 'Copy is unavailable. You can select and copy the citation below.';
        }
      });
    });
  }
})();
