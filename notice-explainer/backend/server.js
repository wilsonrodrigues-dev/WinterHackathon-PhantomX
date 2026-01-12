import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/list-models", async (req, res) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyBh4Nwnen5D2zh2OTIymElfXj6U_lV-fo4`
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/explain", async (req, res) => {
  const { text, language } = req.body;

  if (!text || text.trim().length === 0) {
    return res.json({ result: "No text received by AI." });
  }

  const prompt = `
Explain the following government notice in very simple ${
    language === "kn" ? "Kannada" : "English"
  }.

Also provide a short summary.

Format strictly as:
EXPLANATION:
<explanation>

SUMMARY:
<summary>

Notice:
${text}
`;

  try {const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    }),
  }
);
    const data = await response.json();

    console.log("GEMINI RESPONSE:", JSON.stringify(data, null, 2));

    const output =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!output) {
      return res.json({
        result: "AI responded but no text was generated.",
      });
    }

    res.json({ result: output });
  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({ result: "Server error while calling AI." });
  }
});


app.listen(3000, () =>
  console.log("Server running at http://localhost:3000")
);
