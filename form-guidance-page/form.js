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


const forms = [
  {
    title: "👴 Old Age Pension",
    eligibility: "Senior citizens above 60 years",
    benefits: "Monthly pension support",
    documents: ["Aadhaar Card", "Bank Passbook", "Age Proof"],
    steps: ["Fill form", "Attach documents", "Submit via official portal"],
    pdf: "https://pensionersportal.gov.in/Forms/Applicationforms/FORM14.pdf",
    link: "https://vikaspedia.in/social-welfare/senior-citizens-welfare"
  },
  {
    title: "📝 Life Certificate",
    eligibility: "Government pensioners",
    benefits: "Ensures pension continuation",
    documents: ["Aadhaar Card", "PPO Number"],
    steps: ["Biometric verification", "Submit online"],
    pdf: "",
    link: "https://jeevanpramaan.gov.in"
  },
  {
    title: "🪪 Aadhaar Update",
    eligibility: "Any Aadhaar holder",
    benefits: "Correct personal details",
    documents: ["Aadhaar Card", "Supporting document"],
    steps: ["Apply online", "Track request"],
    pdf: "",
    link: "https://uidai.gov.in"
  },
  {
    title: "📄 Income Certificate",
    eligibility: "Citizens needing income proof",
    benefits: "Required for schemes",
    documents: ["Aadhaar", "Income proof"],
    steps: ["Apply online", "Collect certificate"],
    pdf: "https://share.google/1W5LqvvSVMlFCrIgh",
    link: "https://services.india.gov.in"
  },
  {
    title: "🍚 Ration Card",
    eligibility: "Eligible households",
    benefits: "Food subsidy",
    documents: ["Aadhaar", "Address proof"],
    steps: ["Apply online", "Collect card"],
    pdf: "",
    link: "https://nfsa.gov.in"
  },
  {
    title: "🏦 Bank KYC",
    eligibility: "Bank account holders",
    benefits: "Prevents account freeze",
    documents: ["Aadhaar", "PAN"],
    steps: ["Visit bank", "Submit documents"],
    pdf: "",
    link: "https://www.rbi.org.in"
  },
  {
    title: "🗳 Voter ID Update",
    eligibility: "Registered voters",
    benefits: "Correct voter details",
    documents: ["Voter ID", "Address proof"],
    steps: ["Apply online", "Track status"],
    pdf: "",
    link: "https://voters.eci.gov.in"
  },
  {
    title: "🏥 Ayushman Bharat",
    eligibility: "Eligible families",
    benefits: "₹5 lakh health insurance",
    documents: ["Aadhaar", "Family ID"],
    steps: ["Check eligibility", "Generate card"],
    pdf: "",
    link: "https://pmjay.gov.in"
  }
];

const grid = document.getElementById("formGrid");
const guidance = document.getElementById("guidance");
const formList = document.getElementById("formList");

/* 🔹 NEW: hint reference */
const categoryHint = document.getElementById("formDetails");

let speech = null;

forms.forEach((f, i) => {
  const wrapper = document.createElement("div");
wrapper.className = "card-wrapper";

const card = document.createElement("div");
card.className = "form-card";

wrapper.appendChild(card);
grid.appendChild(wrapper);

 const icon = f.title.split(" ")[0];
const title = f.title.replace(icon, "").trim();

card.innerHTML = `
  <div class="card-top">
    <div class="card-icon">${icon}</div>
    <div>
      <h3>${title}</h3>
      <p class="subtitle">${f.benefits}</p>
    </div>
  </div>

  <div class="card-tags">
    <span>GOVT</span>
    <span>FREE</span>
  </div>

  <div class="card-footer">
    Tap to view details →
  </div>
`;

  card.onclick = () => openForm(i);
grid.appendChild(wrapper);
});

function openForm(i) {
  const f = forms[i];
// categoryHint.classList.remove("hidden");
  // Put guidance INSIDE category hint
  categoryHint.innerHTML = "";
  categoryHint.appendChild(guidance);
  categoryHint.style.display = "block";

  guidance.classList.remove("hidden");

  gTitle.innerText = f.title;
  gEligibility.innerText = f.eligibility;
  gBenefits.innerText = f.benefits;
  gDocuments.innerText = f.documents.join(", ");
  gSteps.innerText = f.steps.join(" → ");

  if (f.pdf) {
    pdfSection.classList.remove("hidden");
    pdfFrame.src = f.pdf;
    pdfDownload.href = f.pdf;
  } else {
    pdfSection.classList.add("hidden");
  }

  gLink.href = f.link;

  speech = new SpeechSynthesisUtterance(
    `${f.title}. Eligibility: ${f.eligibility}. Benefits: ${f.benefits}.
    Documents required are ${f.documents.join(", ")}.
    Steps are ${f.steps.join(", ")}.`
  );

  categoryHint.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  // Highlight animation
  categoryHint.classList.add("highlight");
  setTimeout(() => categoryHint.classList.remove("highlight"), 1200);
}
function goBack() {
  stopReading();

  guidance.classList.add("hidden");
//  hintText.style.display = "block";
  // Restore default hint message
  categoryHint.innerHTML = `
    Click a form above to view guidance and official details.
  `;

  document.getElementById("formList").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function startReading() {
  if (speech) {
    speechSynthesis.cancel();
    speechSynthesis.speak(speech);
  }
}

function stopReading() {
  speechSynthesis.cancel();
}

// File upload handling
const formUpload = document.getElementById("formUpload");
const fileName = document.getElementById("fileName");

if (formUpload) {
  formUpload.addEventListener("change", () => {
    if (formUpload.files.length > 0) {
      fileName.innerText = formUpload.files[0].name;
    } else {
      fileName.innerText = "No file selected";
    }
  });
}
