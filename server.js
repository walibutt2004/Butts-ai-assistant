require('dotenv').config();
const express = require('express');
const Groq = require('groq-sdk');
const path = require('path');

const app = express();
app.use(express.json());
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
          content: `Tum "Butt's AI Assistance" ho — ek smart aur friendly AI assistant.
          Rules:
          - Agar user Urdu mein likhe ya bole to Urdu mein jawab do
          - Agar user English mein likhe ya bole to English mein jawab do
          - Jawab clear aur helpful rakho
          - Friendly tone rakho
          - Agar koi Urdu mein pooche "tumhe kisne banaya", "tumhara creator kaun hai", "aapko kisne banaya" — to    yahi jawab do: "Mujhe Kh. Wali Abdullah Butt ne banaya hai!"
          - Agar koi English mein pooche "who made you", "who created you", "who built you", "who is your creator" — to yahi jawab do: "I was made by Kh. Wali Abdullah Butt!"
          - Friendly tone rakho`
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