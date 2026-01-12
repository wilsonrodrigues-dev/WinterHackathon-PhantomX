    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", "en");
    }

    function setLanguage(lang) {
      localStorage.setItem("language", lang);

      document.getElementById("enBtn").style.opacity =
        lang === "en" ? "1" : "0.5";
      document.getElementById("knBtn").style.opacity =
        lang === "kn" ? "1" : "0.5";
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
        const pdf = await pdfjsLib.getDocument(new Uint8Array(reader.result)).promise;
        let text = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map(i => i.str).join(" ") + "\n\n";
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

    async function sendToAI(text) {
      statusText.innerText = "AI is explaining the notice...";
      const lang = localStorage.getItem("language") || "en";

      const res = await fetch("http://localhost:3000/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language: lang })
      });

      const data = await res.json();
      displayAIResult(data.result);
    }

    function displayAIResult(text) {
      document.getElementById("explanation").innerText = text;
      document.getElementById("summary").innerText =
        "Summary is included above.";
      statusText.innerText = "AI response received ✅";
    }

    function cleanTextForSpeech(text) {
      return text
        // remove markdown symbols
        .replace(/\*\*/g, "")
        .replace(/[*_#>-]/g, "")
        // remove extra colons and headings
        .replace(/EXPLANATION:/gi, "")
        .replace(/SUMMARY:/gi, "")
        // remove bullet points
        .replace(/•/g, "")
        // collapse extra spaces
        .replace(/\s+/g, " ")
        .trim();
    }


    // 🔊 TEXT TO SPEECH
    function playExplanation() {
      const rawText = document.getElementById("explanation").innerText;
      if (!rawText) return;

      const cleanText = cleanTextForSpeech(rawText);

      speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(cleanText);

      utter.lang =
        localStorage.getItem("language") === "kn" ? "kn-IN" : "en-IN";
      utter.rate = 0.9;
      utter.pitch = 1;

      speechSynthesis.speak(utter);
    }

    function stopSpeech() {
      speechSynthesis.cancel();
    }