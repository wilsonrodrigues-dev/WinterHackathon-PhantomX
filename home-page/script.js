// FAQ Logic
function toggleFaq(element) {
  const allFaqItems = document.querySelectorAll(".faq-item");
  allFaqItems.forEach((item) => {
    if (item !== element) item.classList.remove("active");
  });
  element.classList.toggle("active");
}

// Handle Keyboard (Enter/Space) for FAQs
document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFaq(item);
    }
  });
});