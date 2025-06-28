# 🗨️ Talking Buddy — AI Support Chatbot

**Talking Buddy** is a modern AI chatbot that provides emotional and moral support when someone feels lonely or in stress but has no one to share it.  
It uses **Firebase** for Google Login & Signup, keeps user-specific chat history,  
and integrates with Google’s **Gemini** API for AI replies.

---

# Deployment Link: https://talkingbuddy.netlify.app/

## 🚀 Features

- ✅ Beautiful landing page with **Get Started** button  
- ✅ Login & Signup with Google (Firebase Auth)  
- ✅ Personalized greeting: **Hello {username}**  
- ✅ Stores each user’s chat history separately  
- ✅ AI replies adjust tone based on sentiment  
- ✅ Clean **dark theme** UI with **Tailwind CSS**

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/Talking-Buddy-AI-ChatBot.git
cd Talking-Buddy-AI-ChatBot
```

## 2️⃣ Install backend

```cd backend
npm install
```

# Create a .env file inside backend/:

```GEMINI_API_KEY=YOUR_GEMINI_API_KEY```

#Run backend:

```npm start```

## 3️⃣ Install frontend

```cd frontend
npm install
```
# Create a .env file inside frontend/

```VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
VITE_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
```
# Run frontend:

```npm run dev
```

### 🗝️ Environment Variables
Backend: GEMINI_API_KEY for Google Gemini API

Frontend: Firebase keys for Auth

## 📌 How it works
1️⃣ User lands on Landing Page → clicks Get Started
2️⃣ User logs in or signs up with Google
3️⃣ Chat screen greets user: Hello {username}
4️⃣ Messages & sentiment sent to backend → Gemini AI generates reply
5️⃣ Replies saved per user in conversations.json

## ❤️ Tech Stack
React + Vite

Firebase Auth

Tailwind CSS

Node.js Express

Google Gemini API







