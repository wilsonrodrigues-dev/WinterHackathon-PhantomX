const menuToggle = document.getElementById('menuToggle');
const sideNav = document.getElementById('sideNav');
const navOverlay = document.getElementById('navOverlay');

// Helper to toggle Menu State
const toggleMenu = (isOpen) => {
    menuToggle.classList.toggle('open', isOpen);
    sideNav.classList.toggle('show', isOpen);
    navOverlay.classList.toggle('show', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : ''; // Prevent background scroll
};

menuToggle.addEventListener('click', () => {
    const isOpening = !sideNav.classList.contains('show');
    toggleMenu(isOpening);
});

navOverlay.addEventListener('click', () => toggleMenu(false));

// Close menu when a link is clicked
sideNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
});
let currentTab = 'eligibility';
const schemeData = {
  senior: [
    {
      title: "Pradhan Mantri Vaya Vandana Yojana",
      eligibility:
        "Indian citizen, Age 60 years or above, Must have valid Aadhaar, Should have bank account in own name",
      benefits:
        "Guaranteed pension income, 7.4 percent annual return, Monthly or yearly payout option, Protection against market risk",
      documents:
        "Aadhaar Card, PAN Card, Bank Passbook, Address Proof, Passport size photograph",
      steps:
        "Visit LIC website or office, Fill PMVVY application form, Submit KYC documents, Deposit purchase amount, Receive policy bond",
      link: "https://www.licindia.in"
    },
    {
      title: "Varishtha Pension Bima Yojana",
      eligibility:
        "Senior citizen above 60 years, Indian resident, One policy per person, Must have identity proof",
      benefits:
        "Monthly pension, Guaranteed interest, Life long income, Lump sum on maturity",
      documents:
        "Age proof, Aadhaar card, Bank details, Passport photo",
      steps:
        "Visit LIC branch, Choose pension amount, Submit documents, Pay premium, Receive pension confirmation",
      link: "https://www.licindia.in"
    }
  ],

  farmer: [
    {
      title: "PM Kisan Samman Nidhi",
      eligibility:
        "Small and marginal farmer, Indian citizen, Own cultivable land, Aadhaar linked bank account",
      benefits:
        "₹6000 per year, Direct bank transfer, Three installments yearly, Financial support for farming",
      documents:
        "Aadhaar Card, Land ownership record, Bank passbook, Mobile number",
      steps:
        "Register on PM Kisan portal, Enter Aadhaar and land details, Complete e-KYC, Approval by state, Receive payment",
      link: "https://pmkisan.gov.in"
    }
  ],

  women: [
    {
      title: "Mahila Samman Savings Certificate",
      eligibility:
        "Any woman citizen, Girl child through guardian, Indian resident, One account per person",
      benefits:
        "7.5 percent interest, Two year maturity, Government guaranteed returns, Safe savings option",
      documents:
        "Aadhaar Card, Address proof, Passport photo, Deposit receipt",
      steps:
        "Visit post office or bank, Fill account form, Submit documents, Deposit money, Receive passbook",
      link: "https://www.indiapost.gov.in"
    }
  ],

  pension: [
    {
      title: "Atal Pension Yojana",
      eligibility:
        "Age between 18 to 40 years, Indian citizen, Bank account holder, Aadhaar linked",
      benefits:
        "Monthly pension after 60, Guaranteed pension, Government co contribution, Safe retirement income",
     documents:
        "Aadhaar Card, Bank account details, Mobile number",
      steps:
        "Visit bank branch, Fill APY form, Choose pension amount, Set auto debit, Get confirmation",
      link: "https://www.npscra.nsdl.co.in"
    }
  ]
};


function loadSchemes(category) {
    const display = document.getElementById('dynamic-display');
    const schemes = schemeData[category];
    
    let html = `<h2 class="section-title">Available ${category.replace(/^\w/, c => c.toUpperCase())} Schemes</h2>`;
    html += `<div class="scheme-list-grid">`;
    
    schemes.forEach((s, index) => {
        html += `
            <div class="scheme-simple-card" onclick="showPopup('${category}', ${index})">
    <div class="scheme-card-left">
        <div class="scheme-icon">📜</div>
        <div class="scheme-text">
            <h4>${s.title}</h4>
            <p>Tap to see details & listen</p>
        </div>
    </div>
    <div class="scheme-arrow">➜</div>
</div>
`;
    });
    
    html += `</div>`;
    display.innerHTML = html;
    display.scrollIntoView({ behavior: 'smooth' });
}

function showPopup(cat, index) {
    const s = schemeData[cat][index];
    const display = document.getElementById('dynamic-display');

    display.innerHTML = `
        <div class="scheme-detail-popup">
            <button class="back-link" onclick="window.speechSynthesis.cancel(); loadSchemes('${cat}')">← Back to List</button>
            
            <h2>${s.title}</h2>

            <div class="tab-bar">
                <button class="tab-btn active" onclick="showTab('eligibility', this)">Eligibility</button>
                <button class="tab-btn" onclick="showTab('benefits', this)">Benefits</button>
                <button class="tab-btn" onclick="showTab('documents', this)">Documents</button>
                <button class="tab-btn" onclick="showTab('steps', this)">Steps</button>
            </div>

            <div id="tab-content" class="tab-content"></div>

            <div class="action-buttons">
                <button class="voice-btn" onclick="speakCurrentTab()">🔊 Listen</button>

                <a href="${s.link}" target="_blank" class="apply-btn">official link</a>
                <a href="../form-guidance-page/index.html" class="apply-btn">How To Apply</a>
            </div>

        </div>
        
    `;

    window.currentScheme = s;
showTab("eligibility", document.querySelector(".tab-btn"));

}

function showTab(tab, btn) {
    currentTab = tab;
    const s = window.currentScheme;
    let rawText = "";

    if (tab === "eligibility") rawText = s.eligibility;
    if (tab === "benefits") rawText = s.benefits;
    if (tab === "documents") rawText = s.documents;
    if (tab === "steps") rawText = s.steps;

    const icons = {
        eligibility: "✅",
        benefits: "💰",
        documents: "📄",
        steps: "🛠️"
    };

    let points = [];

    if (tab === "steps") {
        rawText = rawText.replace(/\d+\./g, "");
        points = rawText.split(",").filter(p => p.trim() !== "");
    } else {
        points = rawText.split(",").filter(p => p.trim() !== "");
    }

    let html = `<h4>${icons[tab]} ${tab.toUpperCase()}</h4><ul class="info-list">`;

    points.forEach(p => {
        html += `<li>${p.trim()}</li>`;
    });

    html += "</ul>";

    document.getElementById("tab-content").innerHTML = html;

    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
}

function speakCurrentTab() {
    const s = window.currentScheme;
    let text = "";
    let heading = "";

    if (currentTab === "eligibility") {
        heading = "Eligibility";
        text = s.eligibility;
    }
    if (currentTab === "benefits") {
        heading = "Benefits";
        text = s.benefits;
    }
    if (currentTab === "documents") {
        heading = "Documents required";
        text = s.documents;
    }
    if (currentTab === "steps") {
        heading = "Steps to apply";
        text = s.steps;
    }

    // Clean text for better speech (remove commas being read too fast)
    const cleanText = text.replace(/,/g, ". ");

    const speech = `${heading}. ${cleanText}`;

    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(speech);
    msg.rate = 0.9;
    msg.lang = "en-IN";

    window.speechSynthesis.speak(msg);
}


function speakText(text) {
    window.speechSynthesis.cancel(); // Stop any previous voice
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower for clarity
    window.speechSynthesis.speak(utterance);
}