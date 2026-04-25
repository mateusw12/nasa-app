"use client";

export const ThemeToggle = () => {
  const toggleTheme = () => {
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const next = current === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("nasa-theme", next);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="ui-button rounded-full px-3 py-2 text-sm font-semibold"
      aria-label="Alternar tema"
    >
      Alternar tema
    </button>
  );
};
