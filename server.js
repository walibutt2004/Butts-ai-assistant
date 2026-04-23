require('dotenv').config();
const express = require('express');
const Groq = require('groq-sdk');
const path = require('path');

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname)));

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ── AI RESPONSE (STREAMING) ──────────────────────────────────────────────────
app.post('/ai-response', async (req, res) => {
  try {
    const { userText } = req.body;

    // SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      stream: true,
      messages: [
        {
          role: 'system',
          content: `Tum "NEXA" ho — ek smart, premium aur friendly AI assistant. — ek smart aur friendly AI assistant jo Kh. Wali Abdullah Butt ne banaya hai.
          Rules:
          - Agar user Urdu mein likhe ya bole to Urdu mein jawab do
          - Agar user English mein likhe ya bole to English mein jawab do
          - Jawab clear, helpful aur concise rakho
          - Friendly tone rakho
          - Agar koi Urdu mein pooche "tumhe kisne banaya", "tumhara creator kaun hai", "aapko kisne banaya" — to yahi jawab do: "Mujhe Kh. Wali Abdullah Butt ne banaya hai!"
          - Agar koi English mein pooche "who made you", "who created you", "who built you", "who is your creator" — to yahi jawab do: "I was made by Kh. Wali Abdullah Butt!"`
        },
        { role: 'user', content: userText }
      ]
    });

    let fullResponse = '';
    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || '';
      if (text) {
        fullResponse += text;
        res.write(`data: ${JSON.stringify({ text, done: false })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ text: '', done: true, full: fullResponse })}\n\n`);
    res.end();

  } catch (error) {
    console.error('AI Error:', error.message);
    res.write(`data: ${JSON.stringify({ error: error.message, done: true })}\n\n`);
    res.end();
  }
});

// ── IMAGE GENERATION (Hugging Face — FREE) ───────────────────────────────────
app.post('/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt required' });

    const HF_TOKEN = process.env.HF_TOKEN || '';
    const headers = { 'Content-Type': 'application/json' };
    if (HF_TOKEN) headers['Authorization'] = `Bearer ${HF_TOKEN}`;

    // Using FLUX schnell — fastest free model
    const response = await fetch(
      'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell',
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          inputs: prompt,
          parameters: { num_inference_steps: 4, width: 512, height: 512 }
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      // Model loading — retry after delay
      if (response.status === 503) {
        return res.status(503).json({ error: 'Model load ho raha hai, 20 second baad retry karo', retry: true });
      }
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

// ── IMAGE ANALYSIS (vision via Groq) ─────────────────────────────────────────
app.post('/analyze-image', async (req, res) => {
  try {
    const { imageBase64, userText } = req.body;

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const stream = await groq.chat.completions.create({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      max_tokens: 1024,
      stream: true,
      messages: [
        {
          role: 'system',
          content: `Tum "Butt's AI Assistance" ho. Image ko detail mein describe karo. Agar user Urdu mein pooche to Urdu mein jawab do, warna English mein.`
        },
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: imageBase64 }
            },
            {
              type: 'text',
              text: userText || 'Is image mein kya hai? Detail mein batao.'
            }
          ]
        }
      ]
    });

    let fullResponse = '';
    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || '';
      if (text) {
        fullResponse += text;
        res.write(`data: ${JSON.stringify({ text, done: false })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ text: '', done: true, full: fullResponse })}\n\n`);
    res.end();

  } catch (error) {
    console.error('Vision Error:', error.message);
    res.write(`data: ${JSON.stringify({ error: error.message, done: true })}\n\n`);
    res.end();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server chal raha hai: http://localhost:${PORT}`);
});