document.addEventListener('DOMContentLoaded', function () {
    const THEME_KEY = 'lt-theme';
    const toggleBtn = document.getElementById('lt-theme-toggle');
    const root = document.documentElement;
  
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) {
      root.setAttribute('data-theme', saved);
    }
  
    function toggleTheme() {
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem(THEME_KEY, next);
    }
  
    toggleBtn.addEventListener('click', toggleTheme);
  });
  
  