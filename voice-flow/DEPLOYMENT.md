# Voice Flow - Deployment Guide

## Option 1: Deploy with Vercel CLI (Fastest - 2 minutes)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy from project directory
```bash
cd /home/claude/voice-flow
vercel
```

### Step 3: Follow prompts
- **"Set up and deploy "voice-flow"?"** → Yes
- **"Which scope?"** → Your Vercel account
- **"Link to existing project?"** → No
- **"What's your project's name?"** → `voice-flow` (or custom)
- **"In which directory is your code located?"** → ./
- **"Want to modify these settings before deploying?"** → No

### Step 4: Get your URL
```
✓ Deployed to https://voice-flow.vercel.app
```

**That's it!** Your app is now live.

---

## Option 2: Deploy via GitHub + Vercel UI (Recommended for Future Updates)

### Step 1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create new repository `voice-flow`
3. Choose "Private" or "Public"
4. Create repository

### Step 2: Push code to GitHub

```bash
cd /home/claude/voice-flow
git remote add origin https://github.com/YOUR_USERNAME/voice-flow.git
git branch -M main
git push -u origin main
```

### Step 3: Connect to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Paste: `https://github.com/YOUR_USERNAME/voice-flow.git`
4. Click "Import"
5. Leave settings as default
6. Click "Deploy"

**Your app deploys automatically!**

---

## Option 3: Deploy to GitHub Pages (Free Alternative)

If you prefer GitHub Pages instead of Vercel:

```bash
# Update vite.config.ts to add base path
# Change: export default defineConfig({
# To: export default defineConfig({ base: '/voice-flow/', ...

npm run build

# Push dist folder to gh-pages branch
git subtree push --prefix dist origin gh-pages
```

**URL:** `https://YOUR_USERNAME.github.io/voice-flow`

---

## After Deployment

### 1. Get Your Claude API Key

1. Visit [console.anthropic.com](https://console.anthropic.com)
2. Sign in with your Claude account
3. Go to **API Keys**
4. Click **Create Key**
5. Copy the key (starts with `sk-ant-`)

### 2. First Use

1. Visit your deployed URL (e.g., `https://voice-flow.vercel.app`)
2. Click ⚙️ **Settings**
3. Paste your Claude API key
4. Click **Save Settings**
5. Start recording!

---

## Set Monthly API Budget (Recommended)

To prevent unexpected charges:

1. Go to [console.anthropic.com/account/billing](https://console.anthropic.com/account/billing)
2. Click **Set Monthly Budget**
3. Enter amount (e.g., $20)
4. Save

**You'll get alerts if you approach the limit.**

---

## Custom Domain (Optional)

If you deployed to Vercel and want to use your domain:

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your `voice-flow` project
3. Go to **Settings → Domains**
4. Add your domain (e.g., `voiceflow.yourdomain.com`)
5. Follow DNS instructions

DNS takes 24-48 hours to propagate.

---

## Troubleshooting

### "npm: command not found"
Install Node.js from [nodejs.org](https://nodejs.org)

### "Vercel: command not found"
```bash
npm install -g vercel
```

### Deployment fails
```bash
cd /home/claude/voice-flow
rm -rf node_modules package-lock.json
npm install
npm run build  # Test build locally first
vercel
```

### App loads blank page
- Check browser console (F12)
- Ensure you're on latest version
- Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)

---

## Environment Variables (Not Needed)

Voice Flow doesn't use environment variables—your API key is stored securely in **browser localStorage** on your device only.

---

## Updates & Maintenance

### Update app code
1. Make changes locally
2. `git add -A && git commit -m "feature: description"`
3. `git push origin main`
4. Vercel auto-deploys!

### Clear browser data
If you want to reset:
- Open DevTools (F12)
- Go to Application → Local Storage
- Delete `vf_*` entries

---

## Support

- **Vercel docs:** https://vercel.com/docs
- **Claude API docs:** https://docs.anthropic.com
- **Vite docs:** https://vitejs.dev

---

**You're all set! 🚀**
