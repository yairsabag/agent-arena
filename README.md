# ⚔️ Agent Arena

**Three Minds. One Task. You Decide.**

An interactive web app where 3 AI agents (Creative, Logical, Realist) debate any task you give them — then you vote for the winner and a Judge delivers the verdict.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and add your OpenAI key
cp .env.example .env.local
# Edit .env.local and add your OPENAI_API_KEY

# 3. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🌐 Deploy to Vercel

1. Push to GitHub
2. Import in [vercel.com](https://vercel.com)
3. Add environment variable: `OPENAI_API_KEY`
4. Deploy!

## 📁 Project Structure

```
agent-arena/
├── app/
│   ├── api/arena/route.ts    # POST /api/arena — LLM call
│   ├── share/page.tsx        # Share result page
│   ├── page.tsx              # Main app (client component)
│   ├── layout.tsx            # Root layout + metadata
│   └── globals.css           # Animations + base styles
├── components/
│   ├── HomeScreen.tsx        # Task input + chips
│   ├── ArenaScreen.tsx       # Animated chat bubbles
│   ├── VoteScreen.tsx        # Vote cards
│   ├── ResultScreen.tsx      # Judge deliberation
│   ├── JudgeVerdict.tsx      # Winner + verdict + share
│   ├── SharePanel.tsx        # Share modal (WhatsApp/Twitter/Copy)
│   ├── ChatBubble.tsx        # Single chat message
│   ├── TypingIndicator.tsx   # "Agent is thinking..." 
│   ├── VoteCard.tsx          # Clickable vote card
│   ├── ArenaBg.tsx           # Floating background blobs
│   ├── LoadingScreen.tsx     # Loading animation
│   └── ErrorScreen.tsx       # Error state
├── lib/
│   ├── constants.ts          # Agents, types, config
│   ├── i18n.ts               # EN/HE translations
│   ├── prompt.ts             # System prompt for LLM
│   └── api.ts                # Client-side API helper
└── .env.example              # Environment variables template
```

## ✨ Features

- **3 AI Agents** with distinct personalities debate any task
- **Real-time chat animation** with typing indicators
- **Vote system** with animated cards
- **Judge verdict** with dramatic reveal
- **Share results** via WhatsApp, Twitter, or link
- **RTL + Hebrew** support with auto-detection
- **Mobile-first** responsive design
- **Rate limiting** per IP (configurable)
- **No database, no login** — pure MVP simplicity

## 🔧 Configuration

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `OPENAI_API_KEY` | ✅ | — | OpenAI API key |
| `ARENA_RATE_LIMIT_PER_IP` | ❌ | 10 | Requests per IP per hour |
| `NEXT_PUBLIC_APP_URL` | ❌ | auto | Base URL for share links |

## 📄 License

MIT
