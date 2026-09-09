(() => {
  const root = document.documentElement;
  const defaults = { language: "ar", theme: "light" };

  function read(key, allowed, fallback) {
    try {
      const value = localStorage.getItem(key);
      return allowed.includes(value) ? value : fallback;
    } catch {
      return fallback;
    }
  }

  const preferences = {
    language: read("portfolio-language", ["ar", "en"], defaults.language),
    theme: read("portfolio-theme", ["light", "dark"], defaults.theme),
    save(language, theme) {
      this.language = language;
      this.theme = theme;
      try {
        localStorage.setItem("portfolio-language", language);
        localStorage.setItem("portfolio-theme", theme);
      } catch {
        // The current page still works when browser storage is unavailable.
      }
    }
  };

  root.lang = preferences.language;
  root.dir = preferences.language === "ar" ? "rtl" : "ltr";
  root.dataset.theme = preferences.theme;
  document.getElementById("metaTheme")?.setAttribute(
    "content",
    preferences.theme === "dark" ? "#080b18" : "#ffffff"
  );
  window.PORTFOLIO_PREFERENCES = preferences;
})();
