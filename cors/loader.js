function showLoader() {
  const loader = document.getElementById("ss-loader");
  if (loader) loader.style.display = "flex";
}

function hideLoader() {
  const loader = document.getElementById("ss-loader");
  if (!loader) return;

  setTimeout(() => {
    loader.style.display = "none";
  }, 300);
}

window.addEventListener("load", () => {
  hideLoader();
});
