# Chatr 💬

Chatr is a **real-time chat application** built with **React Native (Expo)**.  
It works across **Web, Android, and iOS**, enabling users to chat instantly while automatically translating messages into their preferred language.  

## 🚀 Features
- Real-time messaging (WebSockets via Socket.IO)
- Automatic translation (AI/Translation API)
- Cross-platform (Web + Mobile with React Native)
- Clean and responsive UI
- Persistent message storage
- Multi-user chat rooms

## 🛠️ Tech Stack
**Frontend (Cross-platform)**
- React Native (Expo) + TypeScript
- React Native Web
- Tailwind RN / Styled Components

**Backend**
- Node.js + Express + TypeScript
- WebSockets (Socket.IO)
- PostgreSQL (database)

**Integration**
- Translation API (Google Translate / DeepL / OpenAI)

## 📦 Getting Started

### Prerequisites
- Node.js (>=18)
- PostgreSQL database
- API key for translation service
- Expo CLI

### Installation
```bash
# Clone the repository
git clone https://github.com/<your-username>/chatr.git
cd chatr

# Install dependencies
cd server && npm install
cd ../app && npm install
