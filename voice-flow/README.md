# Voice Flow - Voice to Polished Text App

Transform your voice recordings into professionally rewritten content with AI-powered tone adjustment, real-time cost tracking, and error logging.

## Features

- 🎙️ **Voice Recording** - Hold keyboard shortcut to record (system audio muted automatically)
- 📝 **Real-time Transcription** - Local browser-based speech recognition
- 🎯 **6 Tone Options** - Professional, Casual, Formal, Sales-Focused, Technical, Conversational
- 💰 **Real-time Cost Tracking** - See cost per recording + daily/monthly totals
- 🚀 **Fast Processing** - 2-3 second rewrite via Claude API
- 💾 **Local Storage** - All data stays on your device
- 📤 **Easy Export** - Copy to clipboard or download as text file

## Quick Start

### Prerequisites
- Claude API key from [console.anthropic.com](https://console.anthropic.com)
- Modern browser with Web Speech API support (Chrome, Edge, Safari)

### Setup

1. Visit [voiceflow.vercel.app](https://voiceflow.vercel.app)
2. Click ⚙️ Settings
3. Enter your Claude API key
4. (Optional) Customize keyboard shortcuts
5. Click "Save Settings"

### How to Use

1. **Start Recording**: Press and hold `Cmd+Shift+V` (Mac) or `Ctrl+Shift+V` (Windows)
2. **See Transcript**: Real-time text appears as you speak
3. **Select Tone**: Choose tone for rewrite (Professional, Casual, etc.)
4. **Get Result**: Rewritten text appears in 2-3 seconds
5. **Copy/Export**: Click button to copy or download

## Cost Estimate

| Usage Level | Recordings/Day | Estimated Monthly Cost |
|---|---|---|
| Light | 5 | ~$1.80 |
| Regular | 15 | ~$5.40 |
| Power | 25 | ~$9.00 |

## Keyboard Shortcuts

| Action | Shortcut |
|---|---|
| Record (Hold) | `Cmd+Shift+V` (Mac) / `Ctrl+Shift+V` (Windows) |
| Record (Toggle) | `Cmd+Shift+B` (Mac) / `Ctrl+Shift+B` (Windows) |
| Open Settings | Click ⚙️ button |

## Architecture

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Speech Recognition**: Web Speech API (local, no API cost)
- **AI Rewriting**: Anthropic Claude API
- **Storage**: Browser localStorage (your device only)
- **Hosting**: Vercel (instant deployment)

## Data Privacy

- ✅ Your API key never leaves your device
- ✅ Audio recordings deleted after transcription
- ✅ All data stored in browser localStorage
- ✅ No backend server (except Claude API calls)
- ✅ No analytics or tracking

## Technical Details

- **Model**: Claude 3.5 Sonnet
- **Max tokens per request**: 1024
- **Processing time**: ~2-3 seconds per recording
- **Browser support**: Chrome, Edge, Safari, Firefox

## Troubleshooting

**"Microphone access denied"**
- Check browser permissions for microphone access

**"API key not configured"**
- Click ⚙️ Settings and enter your Claude API key

**"Speech recognition not supported"**
- Use Chrome, Edge, or Safari. Firefox has limited support.

**No transcription appearing**
- Speak clearly and ensure microphone is working
- Check that background noise isn't too high

## Development

### Local Setup

```bash
git clone [repo-url]
cd voice-flow
npm install
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

### Deploy

```bash
vercel
```

## API Costs

- Claude 3.5 Sonnet: $3/M input tokens, $15/M output tokens
- Average recording cost: $0.01-0.02
- No charge for Web Speech API transcription (runs locally)

## Feedback & Roadmap

Phase 2 features in development:
- 📊 Analytics dashboard with usage trends
- ❌ Error logging with full debug info
- 🔀 Multi-model support (GPT-4, Perplexity, Grok)
- 📈 Monthly usage charts
- 🎨 Custom themes

## License

MIT

## Support

For issues or questions, please visit the settings panel or check browser console for errors.

---

**Made with ❤️ by Brian Hong**
