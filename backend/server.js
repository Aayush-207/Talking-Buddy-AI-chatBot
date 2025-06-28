// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const axios = require('axios');
const Sentiment = require('sentiment');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = 5000;
const sentiment = new Sentiment();

app.use(cors());
app.use(bodyParser.json());

const conversationsFile = 'conversations.json';

// ✅ Ensure conversations file exists
if (!fs.existsSync(conversationsFile)) {
  fs.writeFileSync(conversationsFile, JSON.stringify({}));
}

app.post('/api/message', async (req, res) => {
  const { userId, message } = req.body;
  const userSentiment = sentiment.analyze(message).score;

  // ✅ Safely read JSON
  let conversations = {};
  try {
    const fileContent = fs.readFileSync(conversationsFile, 'utf8');
    conversations = fileContent ? JSON.parse(fileContent) : {};
  } catch (error) {
    console.error('Failed to parse conversations.json:', error);
    conversations = {};
  }

  if (!conversations[userId]) {
    conversations[userId] = [];
  }
  conversations[userId].push({ role: 'user', content: message });

  // ✅ Rebuild conversation as plain text
  const conversationText = conversations[userId]
    .map(msg => `${msg.role === 'user' ? 'User' : 'Bot'}: ${msg.content}`)
    .join('\n');

  const prompt = `You are an AI friend providing emotional support.
User sentiment: ${userSentiment}.
Adjust your tone.
Don't repeat yourself.
Correct the user gently if wrong.

Conversation so far:
${conversationText}

Respond in plain, friendly text only.`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    const botMessage = response.data.candidates[0].content.parts[0].text;
    conversations[userId].push({ role: 'bot', content: botMessage });

    fs.writeFileSync(conversationsFile, JSON.stringify(conversations, null, 2));

    res.json({ reply: botMessage });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error communicating with Gemini API' });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
