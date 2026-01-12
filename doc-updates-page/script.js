
function toggleCard(card) {
    const grid = card.closest(".updates-grid");
    let expandedSection = grid.nextElementSibling;

    if (!expandedSection || !expandedSection.classList.contains("expanded-detail-section")) {
        expandedSection = document.createElement("div");
        expandedSection.className = "expanded-detail-section";
        grid.insertAdjacentElement("afterend", expandedSection);
    }

    const allCards = grid.querySelectorAll(".update-card");
    const detail = card.querySelector(".detail-content");
    const icon = card.querySelector(".expand-icon");

    if (card.classList.contains("active")) {
        card.classList.remove("active");
        icon.classList.remove("rotate");
        expandedSection.innerHTML = "";
        expandedSection.classList.remove("active");
        return;
    }

    allCards.forEach(c => {
        c.classList.remove("active");
        const i = c.querySelector(".expand-icon");
        if (i) i.classList.remove("rotate");
    });

    expandedSection.innerHTML = "";
    expandedSection.appendChild(detail.cloneNode(true));
    expandedSection.classList.add("active");

    card.classList.add("active");
    icon.classList.add("rotate");

    expandedSection.scrollIntoView({ behavior: "smooth", block: "start" });
}
