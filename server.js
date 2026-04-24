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

// IMAGE GENERATION
app.post('/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt required' });

    const HF_TOKEN = process.env.HF_TOKEN || '';
    const response = await fetch(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${HF_TOKEN}`
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: { num_inference_steps: 20, width: 512, height: 512, guidance_scale: 7.5 }
        })
      }
    );

    if (!response.ok) {
      if (response.status === 503) return res.status(503).json({ error: 'Model load ho raha hai, 20 second baad retry karo', retry: true });
      const errText = await response.text();
      return res.status(500).json({ error: errText });
    }

    const imageBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(imageBuffer).toString('base64');
    res.json({ image: `data:image/jpeg;base64,${base64}` });

  } catch (error) {
    console.error('Image Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server chal raha hai: http://localhost:${PORT}`);
});