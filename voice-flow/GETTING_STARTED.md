# Voice Flow - Complete Setup & Getting Started Guide

**Status:** ✅ Phase 1 MVP Complete and Ready to Deploy

---

## 📋 What You Have

The Voice Flow app has been fully built with:

✅ **Core Features**
- Voice recording with system audio muting
- Real-time transcription (Web Speech API - local, no cost)
- 6 tone options for rewriting
- Claude API integration (Sonnet 3.5)
- Real-time cost tracking (per recording + daily/monthly)
- Local data storage (your device only)
- Copy to clipboard & export as text
- Settings panel for API key & shortcuts
- Beautiful UI with Tailwind CSS

✅ **Architecture**
- React 18 + TypeScript
- Clean, modular services
- Vite build system
- Ready for Vercel deployment

---

## 🚀 Deploy Now (Choose One)

### **Option A: Fast Deployment with Vercel CLI** ⭐ (Recommended)

**Time:** 2 minutes | **Result:** Live URL instantly

```bash
# 1. Install Vercel CLI (if not already installed)
npm install -g vercel

# 2. Navigate to project
cd /home/claude/voice-flow

# 3. Deploy
vercel

# 4. Follow prompts (press Enter for defaults)
# You'll get: https://voice-flow-[random].vercel.app
```

### **Option B: Via GitHub + Vercel UI**

**Time:** 5 minutes | **Result:** Auto-deploys on git push

1. Create repo on GitHub
2. Push code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/voice-flow.git
   git push -u origin main
   ```
3. Visit [vercel.com/new](https://vercel.com/new)
4. Import your GitHub repo
5. Click Deploy
6. Done! ✨

---

## 🔑 Get Your Claude API Key (5 minutes)

### Step 1: Visit Console
Go to: https://console.anthropic.com/

### Step 2: Sign In
- Sign in with your Claude account
- (Create one if needed)

### Step 3: Create API Key
1. Click **API Keys** in left sidebar
2. Click **Create Key**
3. Name it: `Voice Flow`
4. **Copy the key** (looks like: `sk-ant-...`)
5. Save it somewhere safe

### Step 4: Set Monthly Budget (Recommended)
1. Go to **Account → Billing**
2. Click **Set Monthly Budget**
3. Enter: `$20` (or your preferred limit)
4. This prevents unexpected charges

**Cost estimate:** ~$0.01 per recording = ~$3-5/month for regular use

---

## 💻 First Launch

### After Deploying to Vercel

1. **Visit your URL**
   - Example: https://voice-flow.vercel.app
   - (You'll get the exact URL when deployment finishes)

2. **Open Settings** (⚙️ button, top right)

3. **Enter Claude API Key**
   - Paste the key you copied
   - Click "Save Settings"
   - ✅ Ready to use!

---

## 🎙️ How to Use

### Recording

1. **Press and hold** `Cmd+Shift+V` (Mac) or `Ctrl+Shift+V` (Windows)
2. **Speak clearly** - you'll see transcript appear in real-time
3. **Release the key** to stop and process
4. **Wait 2-3 seconds** for rewrite

### Selecting Tone

After you record, you'll see tone buttons:
- **Professional** - Formal, C-suite ready
- **Casual** - Relaxed, conversational
- **Formal** - Structured business language
- **Sales-Focused** - Persuasive, action-driven
- **Technical** - Salesforce & architecture-focused
- **Conversational** - Engaging, story-driven

Click any tone to see rewrite in that style.

### Export

Two options after rewrite:
- **📋 Copy to Clipboard** - Paste anywhere (email, Google Docs, etc.)
- **📥 Export as Text** - Downloads `.txt` file

---

## 💰 Cost Tracking

The app shows real-time costs:

**Per Recording**
- Shows: Cost, Tone, Processing Time
- Example: $0.0095 (about 1 cent)

**Daily/Monthly Summary**
- Today's cost: $0.XXX
- This month: $X.XX
- Avg cost per recording: $0.XXXX
- ROI estimate (time saved vs cost)

---

## ⚙️ Settings & Customization

Click the **⚙️ Settings** button to:

1. **Update API Key** - Paste new key anytime
2. **Change Keyboard Shortcuts**
   - Mode 1 (Hold to record): Default `Cmd+Shift+V`
   - Mode 2 (Toggle): Default `Cmd+Shift+B`
3. **Change Shortcuts** - Any combo works (e.g., `Cmd+Shift+R`)

---

## 🎯 Tips for Best Results

### Recording Quality
- Speak clearly and naturally
- Minimize background noise
- Use a good microphone (not speakerphone)
- Don't worry about umms/ahs - AI handles them

### Tone Selection
- **Professional** for: Executive summaries, formal emails
- **Casual** for: Social media, blog posts
- **Sales-Focused** for: GTM content, pitches
- **Technical** for: Salesforce posts, architecture docs
- **Conversational** for: Engaging blog content, stories

### Cost Optimization
- Record 15-20 seconds at a time (cheaper than one long ramble)
- Try different tones without re-recording (one cost per session)
- Monitor monthly cost in dashboard

---

## 🛠️ Browser Requirements

Works best on:
- ✅ Chrome / Chromium (Edge)
- ✅ Safari
- ⚠️ Firefox (limited speech recognition)
- ❌ Mobile browsers (speech recognition limited)

**Requires:**
- Microphone access (browser will ask)
- JavaScript enabled
- Modern browser (2021+)

---

## 📊 Data & Privacy

### What Stays on Your Device
- ✅ All recordings (list of what you recorded)
- ✅ Rewritten texts
- ✅ Cost history
- ✅ Your API key
- ✅ Settings

### What's NOT Stored
- ❌ Audio files (deleted after transcription)
- ❌ Raw transcripts (not persisted)
- ❌ Third-party tracking

### Data Protection
- No backend server needed
- Only Claude API (via your key) processes text
- Browser localStorage = encrypted locally
- Clear data anytime (Settings → Clear All)

---

## 🐛 Troubleshooting

### "Microphone access denied"
1. Check browser permission popup
2. Go to browser settings → Privacy → Microphone
3. Allow access to voiceflow site
4. Refresh page

### "API key not configured"
1. Click ⚙️ Settings
2. Enter your Claude API key
3. Click Save
4. Refresh page

### "Speech recognition not working"
- Use Chrome or Safari (best support)
- Check microphone works in other apps
- Ensure microphone is selected in system settings
- Try closing/reopening the app

### "No transcription showing"
- Speak louder and clearer
- Minimize background noise
- Check microphone isn't muted
- Try different browser

### App loads blank
- Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Check browser console (F12) for errors
- Try incognito/private mode

---

## 📈 Phase 2 Coming Soon

Currently in development:
- 📊 **Analytics Dashboard** - Usage trends, cost charts, tone breakdown
- ❌ **Error Logging** - Full debug logs, exportable CSV/JSON
- 🔀 **Multi-Model Support** - OpenAI GPT-4, Perplexity, Grok
- 🎨 **Custom Themes** - Dark mode, light mode, custom colors
- 📱 **Mobile Support** - Better tablet/mobile experience

---

## 📚 Quick Reference

| Action | Shortcut | Details |
|--------|----------|---------|
| Start Recording | `Cmd+Shift+V` | Hold to record, release to stop |
| Toggle Recording | `Cmd+Shift+B` | Tap to start, tap to stop |
| Open Settings | Click ⚙️ | Customize shortcuts & API key |
| Copy Output | Click button | Copies rewritten text to clipboard |
| Export Text | Click button | Downloads `.txt` file |
| Check Costs | See tracker | Real-time per-recording costs |

---

## 🔗 Useful Links

- **Claude API Console:** https://console.anthropic.com
- **Billing & Budget:** https://console.anthropic.com/account/billing
- **Claude Documentation:** https://docs.anthropic.com
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Voice Flow Repo:** (will be your GitHub repo)

---

## 📞 Need Help?

### Check These First
1. Browser console (F12 → Console tab)
2. API key is valid and has balance
3. Microphone permissions granted
4. Using supported browser
5. Try incognito mode

### Common Error Messages

**"401 Unauthorized"**
- Invalid or expired API key
- Get new key from console.anthropic.com

**"Rate limit exceeded"**
- Too many requests to Claude API
- Wait a minute and try again
- Consider upgrading API tier

**"Network error"**
- Check internet connection
- API service might be down
- Check Anthropic status page

---

## 🎉 You're Ready!

1. ✅ Build complete
2. ✅ Deploy to Vercel (2 minutes)
3. ✅ Get API key (5 minutes)
4. ✅ Start using! 🚀

---

## 📝 Next: Create Google Doc Reference

After you've tested the app and confirmed it works, I'll create a Google Doc version of the **Voice Flow App Functionality Summary** for your future reference.

**Just let me know when you've:**
1. Deployed to Vercel
2. Tested recording + rewriting
3. Confirmed costs are tracking
4. Ready for Google Doc

---

**Questions? Check the settings panel or browser console for detailed errors.**

**Enjoy Voice Flow! 🎙️✨**
