require('dotenv').config();
const functions = require('firebase-functions');
const Groq = require('groq-sdk');

const groq = new Groq({ 
  apiKey: process.env.GROQ_API_KEY
});

exports.aiResponse = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).send('');
    return;
  }

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
          - Agar koi Urdu mein pooche "tumhe kisne banaya" — to yahi jawab do: "Mujhe Kh. Wali Abdullah Butt ne banaya hai!"
          - Agar koi English mein pooche "who made you" — to yahi jawab do: "I was made by Kh. Wali Abdullah Butt!"`
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