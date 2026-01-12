const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Models: primary + fallbacks (all FREE)
const MODELS = [
  "google/gemini-2.0-flash-exp:free",
  "mistral/mistral-7b-instruct:free",
  "qwen/qwen-2.5-7b-instruct:free"
];

// Helper: sleep
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Call OpenRouter with retry + fallback
async function callAI(prompt) {
  for (const model of MODELS) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`🤖 Trying model: ${model} (attempt ${attempt})`);

        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
              "Content-Type": "application/json",
              "HTTP-Referer": "http://localhost:3000",
              "X-Title": "AI Notice Reader"
            },
            body: JSON.stringify({
              model,
              messages: [{ role: "user", content: prompt }],
              temperature: 0.4
            })
          }
        );

        const data = await response.json();

        // Success
        if (data?.choices?.[0]?.message?.content) {
          return data.choices[0].message.content;
        }

        // Rate limit → retry
        if (data?.error?.code === 429) {
          console.log("⏳ Rate limited, retrying...");
          await sleep(2000);
          continue;
        }

        // Other error → break & try next model
        console.error("❌ Model error:", data);
        break;
      } catch (err) {
        console.error("❌ Fetch error:", err.message);
        await sleep(2000);
      }
    }
  }

  throw new Error("All AI models are busy. Please try again later.");
}

// API route
app.post("/api/explain", async (req, res) => {
  const { text, language } = req.body;

  if (!text || !text.trim()) {
    return res.json({ result: "No text received by AI." });
  }

  const prompt = `
You are SevaSaathi AI.

Explain the following government notice in very simple ${
    language === "kn"
      ? "spoken Kannada (India)"
      : "simple English"
  }.

Rules:
- Short sentences
- Very easy words
- No legal language

Then give a short summary in 2–3 lines.

NOTICE:
${text}
`;

  try {
    const output = await callAI(prompt);
    res.json({ result: output });
  } catch (err) {
    console.error(err.message);
    res.json({
      result:
        "AI is currently busy due to free model limits. Please try again in a few seconds."
    });
  }
});

// Start server
app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
