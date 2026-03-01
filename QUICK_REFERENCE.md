# 📋 Quick Reference Card

## Essential URLs & Information

### Your GitHub Pages Frontend
- **URL**: https://dhruvlagad.github.io/dkl/
- **Files**: `index.html`, `admin.html`, `contact.html`
- **Deployment**: Automatic when you push to `main` branch

### GitHub OAuth App
- **Setup Page**: https://github.com/settings/developers
- **App Name**: DKL Portfolio Admin
- **Callback URL to Register**: https://YOUR_RENDER_URL/auth/github/callback

### Render Backend
- **Signup**: https://render.com
- **Service Name**: dkl-portfolio-admin
- **Your URL will be**: https://dkl-portfolio-admin.onrender.com (or similar)

---

## Command Reference

### Generate SESSION_SECRET
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Install Dependencies
```bash
npm install
```

### Test Locally
```bash
npm start
# Visit http://localhost:3000
```

### Kill Process on Port 3000
```bash
lsof -ti:3000 | xargs kill -9
```

### Check if Port is Free
```bash
lsof -i :3000
```

---

## Environment Variables Needed in Render

```
PORT                     = 3000
NODE_ENV                 = production
GITHUB_CLIENT_ID         = (from GitHub OAuth app)
GITHUB_CLIENT_SECRET     = (from GitHub OAuth app) 
GITHUB_CALLBACK_URL      = https://YOUR_RENDER_URL/auth/github/callback
AUTHORIZED_GITHUB_USERS  = dhruvlagad
SESSION_SECRET           = (generated with command above)
```

---

## OAuth Flow (What Happens Behind the Scenes)

```
1. User clicks "Login with GitHub" on GitHub Pages
   ↓
2. Forwarded to: https://YOUR_RENDER_URL/auth/github
   ↓
3. Redirected to GitHub login
   ↓
4. User approves app
   ↓
5. GitHub redirects back to: https://YOUR_RENDER_URL/auth/github/callback
   ↓
6. Server validates and creates session
   ↓
7. User redirected to: /admin.html (on Render, then shows local copy from GitHub Pages)
```

⚠️ **The callback URL MUST match exactly in both:**
- GitHub OAuth App settings
- Render `GITHUB_CALLBACK_URL` environment variable

---

## API Endpoints Reference

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/auth/github` | GET | No | Start GitHub OAuth flow |
| `/auth/github/callback` | GET | No | OAuth callback from GitHub |
| `/auth/logout` | GET | No | Logout and clear session |
| `/api/check-auth` | GET | No | Check if user is logged in |
| `/api/images` | GET | No | Get list of image filenames |
| `/api/upload` | POST | ✅ Yes | Upload image files |
| `/api/images/:filename` | DELETE | ✅ Yes | Delete an image |
| `/artwork/:filename` | GET | No | Download image file |

---

## Frontend API Configuration Template

```javascript
// Add this at the top of your JavaScript in HTML files:

// For localhost + production:
const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : 'https://dkl-portfolio-admin.onrender.com';  // ← Update to your Render URL

// OR just use production URL directly:
// const API_BASE = 'https://dkl-portfolio-admin.onrender.com';

// Then use in fetch calls:
fetch(`${API_BASE}/api/images`)
fetch(`${API_BASE}/api/upload`, { method: 'POST', ... })
fetch(`${API_BASE}/api/images/${filename}`, { method: 'DELETE' })
```

---

## Debugging: Check Browser Console

After deployment, open your browser's DevTools (F12) and check:

### Network Tab
- Requests should go to: `https://your-render-url.onrender.com`
- NOT `http://localhost:3000`
- NOT `https://dhruvlagad.github.io`

### Console Tab
- Should see: `API Base URL: https://your-render-url.onrender.com`
- No CORS errors
- No 404 errors for API calls

### If You See CORS Errors:
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**:
1. verify `NODE_ENV=production` in Render
2. Restart Render deployment
3. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
4. Check `GITHUB_CALLBACK_URL` matches GitHub OAuth app

---

## GitHub Pages vs Render Differences

| Feature | GitHub Pages | Render |
|---------|--------------|--------|
| **Hosts** | Static HTML/CSS/JS | Node.js backend |
| **Update** | Push to main branch | Automatic from GitHub |
| **Cost** | Free | Free (with spin-down) |
| **Protocol** | HTTPS only | HTTPS only |
| **URL** | dhruvlagad.github.io/dkl | your-name.onrender.com |
| **Runs** | Browser JavaScript | Server-side Node.js |

---

## Deployment Readiness Checklist

- [ ] Added CORS to server.js ✅
- [ ] Updated package.json with cors dependency ✅
- [ ] Created .env.example ✅
- [ ] Created DEPLOYMENT_CHECKLIST.md ✅
- [ ] Created DEPLOYMENT_GUIDE.md ✅
- [ ] server.js syntax is valid ✅

**Next Actions**:
- [ ] Create Render account
- [ ] Deploy to Render
- [ ] Update GitHub OAuth app
- [ ] Update frontend API calls

---

## One-Minute Troubleshooting

| Problem | Check |
|---------|-------|
| OAuth redirects to wrong URL | GitHub app callback URL == Render GITHUB_CALLBACK_URL |
| CORS errors in console | NODE_ENV=production + restart Render |
| Upload doesn't work | API_BASE in HTML points to Render URL |
| Session not persisting | SESSION_SECRET is set, NODE_ENV=production |
| Port 3000 already in use | Kill with: `lsof -ti:3000 \| xargs kill -9` |
| Slow response (first request) | Free tier Render spins down - upgrade or wait 30s |

---

## Important Links to Save

1. **Render Dashboard**: https://dashboard.render.com
2. **GitHub OAuth Apps**: https://github.com/settings/developers
3. **Your GitHub Pages**: https://github.com/dhruvlagad/dkl/settings/pages
4. **Render Docs**: https://render.com/docs
5. **Your Repo**: https://github.com/dhruvlagad/dkl

---

## Production Goes Live When:

1. ✅ Backend deployed to Render
2. ✅ OAuth app callback URL registered with Render URL
3. ✅ Frontend HTML files have correct API_BASE
4. ✅ GitHub Pages serves from main branch
5. ✅ All API calls point to Render backend

You're ready! 🚀
