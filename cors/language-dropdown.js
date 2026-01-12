document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".lang-wrapper");
  const btn = document.getElementById("langBtn");
  const dropdown = document.getElementById("langDropdown");

  if (!wrapper || !btn || !dropdown) {
    console.error("Language dropdown elements not found");
    return;
  }

  // Toggle dropdown
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    wrapper.classList.toggle("show");
  });

  // Language buttons
  dropdown.querySelectorAll("button").forEach(item => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();

      const lang = item.getAttribute("data-lang");
      console.log("Language clicked:", lang);

      localStorage.setItem("seva_lang", lang);
      showLoader();
      loadPageContent();

      wrapper.classList.remove("show");
    });
  });

  // Close when clicking outside
  document.addEventListener("click", () => {
    wrapper.classList.remove("show");
  });
});
