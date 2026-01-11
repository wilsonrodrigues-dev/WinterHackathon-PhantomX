// if the language is already in localstorage then skip this page
(function () {
  const lang = localStorage.getItem("seva_lang");
  if (lang) {
    showLoader();
    window.location.href = "./home-page/index.html";
  }
})();

//this function is called when the user select the language
function selectLanguage(lang) {
  showLoader();

  localStorage.setItem("seva_lang", lang);

  setTimeout(() => {
    window.location.href = "./home-page/index.html";
  }, 300);
}
