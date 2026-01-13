(function () {
  // Always show loader immediately
  if (typeof showLoader === "function") {
    showLoader();
  }

  const lang = localStorage.getItem("seva_lang");

  // If language is NOT selected, redirect to language page
  if (!lang) {
    window.location.replace("../language.html");
  }
})();