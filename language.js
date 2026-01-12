// If language already selected, skip this page
(function () {
  const lang = localStorage.getItem("seva_lang");
  if (lang) {
    showLoader();
    window.location.href = "./home-page/index.html";
  }
})();

// Called when user clicks a language
function selectLanguage(lang) {
  showLoader();

  localStorage.setItem("seva_lang", lang);

  setTimeout(() => {
    window.location.href = "./home-page/index.html";
  }, 300);
}
