function getValue(obj, path) {
  return path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
}

function loadPageContent() {
  const lang = localStorage.getItem("seva_lang");
  if (!lang) return;

  console.log("Current language:", lang);

  fetch(`./${lang}.json`)
    .then(res => res.json())
    .then(data => {
      console.log("Loaded JSON:", data);

      document.querySelectorAll("[data-key]").forEach(el => {
        const keyPath = el.dataset.key; // e.g. nav.home
        const value = getValue(data, keyPath);

        if (typeof value === "string") {
          el.textContent = value;
        }
      });
    })
    .catch(err => console.error("JSON error:", err));
}
