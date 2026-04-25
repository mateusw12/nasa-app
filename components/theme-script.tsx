export const ThemeScript = () => {
  const script = `
    (() => {
      const saved = localStorage.getItem('nasa-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = saved ? saved === 'dark' : prefersDark;
      document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
};
