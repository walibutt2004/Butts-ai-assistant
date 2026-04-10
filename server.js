require('dotenv').config();
const express = require('express');
const Groq = require('groq-sdk');

const app = express();
app.use(express.json());
app.use(express.static('.'));

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/ai-response', async (req, res) => {
  try {
    const { userText } = req.body;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
{ 
  role: 'system', 
  content: 'Tum ek helpful voice assistant ho. Short aur clear jawab do. Agar user Urdu mein bole tو Urdu mein jawab do. Agar user English mein bole to English mein jawab do. Language automatically detect karo.' 
},
        { 
          role: 'user', 
          content: userText 
        }
      ]
    });

    const aiText = completion.choices[0].message.content;
    res.json({ response: aiText });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Kuch ghalat hua' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server chal raha hai: http://localhost:${process.env.PORT}`);
});