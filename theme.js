(() => {
  const localStorageKey = "color-scheme";
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  let preference = null;

  try {
    const stored = localStorage.getItem(localStorageKey);
    if (stored === "light" || stored === "dark") {
      preference = stored;
    }
  } catch {}

  function applyTheme() {
    if (preference) {
      document.documentElement.dataset.theme = preference;
    } else {
      delete document.documentElement.dataset.theme;
    }
  }

  applyTheme();

  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("theme-toggle");

    function updateControls() {
      toggle.checked = preference ? preference === "dark" : systemTheme.matches;
    }

    function setPreference(value) {
      preference = value;
      applyTheme();
      updateControls();

      try {
        if (preference) {
          localStorage.setItem(localStorageKey, preference);
        } else {
          localStorage.removeItem(localStorageKey);
        }
      } catch {}
    }

    toggle.addEventListener("change", () => {
      setPreference(toggle.checked ? "dark" : "light");
    });

    systemTheme.addEventListener("change", updateControls);
    window.addEventListener("storage", (event) => {
      if (event.key !== localStorageKey && event.key !== null) return;
      preference = event.newValue === "light" || event.newValue === "dark"
        ? event.newValue
        : null;
      applyTheme();
      updateControls();
    });

    updateControls();
    document.querySelector(".theme-control").hidden = false;
  });
})();
