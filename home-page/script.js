const menuToggle = document.getElementById("menuToggle");
const sideNav = document.getElementById("sideNav");
const navOverlay = document.getElementById("navOverlay");

// Helper to toggle Menu State
const toggleMenu = (isOpen) => {
  menuToggle.classList.toggle("open", isOpen);
  sideNav.classList.toggle("show", isOpen);
  navOverlay.classList.toggle("show", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
};

menuToggle.addEventListener("click", () => {
  const isOpening = !sideNav.classList.contains("show");
  toggleMenu(isOpening);
});

navOverlay.addEventListener("click", () => toggleMenu(false));

sideNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => toggleMenu(false));
});

window.toggleFaq = function (element) {
  const allFaqItems = document.querySelectorAll(".faq-item");
  allFaqItems.forEach((item) => {
    if (item !== element) item.classList.remove("active");
  });
  element.classList.toggle("active");
};

// Keyboard support for FAQ items
document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFaq(item);
    }
  });
});



console.log("home.js loaded");

if (typeof loadPageContent === "function") {
  console.log("Calling loadPageContent()");
  loadPageContent();
} else {
  console.error("loadPageContent is NOT available");
}
