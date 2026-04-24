require('dotenv').config();
const express = require('express');
const Groq = require('groq-sdk');
const path = require('path');

const app = express();
app.use(express.json());

// CORS fix — Firebase se Vercel pe request allow karo
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.static(path.join(__dirname)));

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/ai-response', async (req, res) => {
  try {
    const { userText } = req.body;
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `Tum "NEXA" ho — ek smart, premium aur friendly AI assistant.
          Rules:
          - Agar user Urdu mein likhe ya bole to Urdu mein jawab do
          - Agar user English mein likhe ya bole to English mein jawab do
          - Jawab clear aur helpful rakho
          - Friendly tone rakho
          - Agar koi Urdu mein pooche "tumhe kisne banaya", "tumhara creator kaun hai" — to yahi jawab do: "Mujhe Kh. Wali Abdullah Butt ne banaya hai!"
          - Agar koi English mein pooche "who made you", "who created you" — to yahi jawab do: "I was made by Kh. Wali Abdullah Butt!"`
        },
        { role: 'user', content: userText }
      ]
    });
    const aiText = completion.choices[0].message.content;
    res.json({ response: aiText });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server chal raha hai: http://localhost:${PORT}`);
});