if (!localStorage.getItem("language")) {
  localStorage.setItem("language", "en");
}

function setLanguage(lang) {
  localStorage.setItem("language", lang);

  document.getElementById("enBtn").style.opacity = lang === "en" ? "1" : "0.5";
  document.getElementById("knBtn").style.opacity = lang === "kn" ? "1" : "0.5";
}
const fileInput = document.getElementById("fileInput");
const readBtn = document.getElementById("readBtn");
const statusText = document.getElementById("statusText");
const rawText = document.getElementById("rawText");

let uploadedFile = null;

// default language (simulate earlier language page)
localStorage.setItem("language", "en"); // change to "kn" to test Kannada

fileInput.addEventListener("change", () => {
  uploadedFile = fileInput.files[0];
  if (uploadedFile) {
    statusText.innerText = "File selected: " + uploadedFile.name;
    readBtn.disabled = false;
  }
});

readBtn.addEventListener("click", () => {
  rawText.value = "";
  document.getElementById("explanation").innerText = "";
  document.getElementById("summary").innerText = "";

  if (uploadedFile.type === "application/pdf") {
    extractFromPDF(uploadedFile);
  } else {
    extractFromImage(uploadedFile);
  }
});

async function extractFromPDF(file) {
  statusText.innerText = "Extracting text from PDF...";
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  reader.onload = async () => {
    const pdf = await pdfjsLib.getDocument(new Uint8Array(reader.result))
      .promise;
    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((i) => i.str).join(" ") + "\n\n";
    }

    rawText.value = text;
    sendToAI(text);
  };
}

async function extractFromImage(file) {
  statusText.innerText = "Running OCR...";
  const result = await Tesseract.recognize(file, "eng+kan");
  rawText.value = result.data.text;
  sendToAI(result.data.text);
}

