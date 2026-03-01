# Deployment Guide

This guide explains how to deploy your DKL Portfolio with:
- **Frontend**: GitHub Pages (static HTML/CSS/JS)
- **Backend**: Render or Railway (Node.js server with OAuth)

## Architecture

```
┌─────────────────────────────────────────┐
│   https://dhruvlagad.github.io/dkl/    │
│   GitHub Pages (Static Frontend)        │
│   - Serves HTML, CSS, JavaScript        │
│   - Calls API endpoints →               │
└─────────────────────────────────────────┘
            ↓ (CORS) ↓
┌─────────────────────────────────────────┐
│   https://your-app.onrender.com         │
│   Render (Node.js Backend)              │
│   - Handles OAuth authentication        │
│   - Manages image uploads               │
│   - Provides API endpoints              │
└─────────────────────────────────────────┘
```

## Step 1: Prepare Your Code

### Update package.json dependencies
✅ Already done - `cors` package added

### Keep only API code in server.js
- The server now serves APIs only (not static files for production)
- Frontend lives on GitHub Pages

## Step 2: Deploy Backend to Render

### Create a Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended for easy deployment)

### Deploy via GitHub
1. Go to Render Dashboard → "New" → "Web Service"
2. Click "Connect repository" and select `dhruvlagad/dkl`
3. Fill in settings:
   - **Name**: `dkl-portfolio-admin`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or Paid if you need better performance)

4. Add Environment Variables (click "Add Environment Variable"):
   ```
   PORT = 3000
   NODE_ENV = production
   GITHUB_CLIENT_ID = (paste from GitHub OAuth app)
   GITHUB_CLIENT_SECRET = (paste from GitHub OAuth app)
   GITHUB_CALLBACK_URL = https://YOUR_RENDER_APP_NAME.onrender.com/auth/github/callback
   AUTHORIZED_GITHUB_USERS = dhruvlagad
   SESSION_SECRET = (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
   ```

5. Click "Create Web Service" and wait for deployment

### Your Render URL
After deployment, your app URL will be: `https://your-unique-name.onrender.com`

Check the Render logs to confirm it started successfully:
```
Server running on http://localhost:3000
```

## Step 3: Update GitHub OAuth App

1. Go to [GitHub Settings → Developers → OAuth Apps](https://github.com/settings/developers)
2. Click "DKL Portfolio Admin" (or create new if needed)
3. Update settings:
   - **Application name**: `DKL Portfolio Admin`
   - **Homepage URL**: `https://dhruvlagad.github.io/dkl/`
   - **Authorization callback URL**: `https://YOUR_RENDER_APP_NAME.onrender.com/auth/github/callback`
4. Save and copy:
   - **Client ID** → `GITHUB_CLIENT_ID` in Render
   - **Client Secret** → `GITHUB_CLIENT_SECRET` in Render

## Step 4: Update Frontend (GitHub Pages)

Your frontend (HTML files) are already configured correctly with relative paths:
```html
<a href="auth/github" class="github-login-btn">Login with GitHub</a>
<a href="../auth/logout" class="logout-btn">Logout</a>
```

These will work on both localhost and production.

### Update API calls in JavaScript

Make sure your frontend JavaScript calls the correct backend URL. Update any API calls to use the full backend URL:

**Example** (in your admin.html or JavaScript files):
```javascript
// ❌ OLD (won't work on GitHub Pages)
fetch('/api/images')

// ✅ NEW (works with Render backend)
const API_URL = 'https://YOUR_RENDER_APP_NAME.onrender.com';
fetch(`${API_URL}/api/images`)
```

**Or use dynamic URL:**
```javascript
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : 'https://YOUR_RENDER_APP_NAME.onrender.com';
fetch(`${API_URL}/api/images`)
```

### Configure GitHub Pages

1. Go to your repository → Settings → Pages
2. Source: `Deploy from a branch`
3. Branch: `main` (or your branch)
4. Folder: `/ (root)` or `/docs` (if you move files)

Your site will be published to: `https://dhruvlagad.github.io/dkl/`

## Step 5: Test the Deployment

### Test locally first
```bash
npm install  # Install new cors package
npm start    # Start server on localhost:3000
```

Visit `http://localhost:3000` (it should show API responses or 404 if no static files)

### Test on production
1. Open `https://dhruvlagad.github.io/dkl/`
2. Click "Admin Login"
3. Click "Login with GitHub"
4. You should be redirected to GitHub OAuth → back to admin panel

If OAuth redirects are failing, check:
- ✅ Render URLs in GitHub OAuth app settings
- ✅ GITHUB_CALLBACK_URL in Render environment variables
- ✅ Browser console for CORS errors

## Step 6: Troubleshooting

### CORS Errors in Console
**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**: Make sure your Render backend URL is in the CORS whitelist in `server.js` (lines 21-24):
```javascript
const allowedOrigins = [
    'https://dhruvlagad.github.io',
    'http://localhost:3000',
    ...
]
```

### OAuth Callback URL Mismatch
**Error**: `"Redirect URI does not match"` or endless redirects

**Solution**: 
1. Check Render app is fully deployed and working
2. Copy exact Render URL from dashboard
3. Update GitHub OAuth app with EXACT URL: `https://YOUR_URL/auth/github/callback`
4. Update Render env var: `GITHUB_CALLBACK_URL=https://YOUR_URL/auth/github/callback`
5. Restart deployment in Render dashboard

### Free Tier Limitations
- Render free tier spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds to respond
- Upgrade to paid plan for instant responses

## Alternative Hosting Options

### Railway.app
1. Connect GitHub repo at [railway.app](https://railway.app)
2. Detect Node.js automatically
3. Add same environment variables
4. Deploy with one click

### Heroku (Legacy)
- Heroku free tier was discontinued in 2022
- Use Render or Railway instead

## File Structure (After Deployment)

```
GitHub Pages (Production Frontend):
https://dhruvlagad.github.io/dkl/
├── index.html
├── admin.html
├── contact.html
├── css/style.css
└── artwork/ (served by backend)

Render Backend (Production API):
https://your-app.onrender.com
├── /auth/github (OAuth endpoint)
├── /auth/github/callback (OAuth callback)
├── /api/images (list images)
├── /api/upload (upload images)
└── /api/images/:filename (delete image)
```

## Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `PORT` | Server port (Render assigns automatically) | `3000` |
| `NODE_ENV` | Environment mode | `production` |
| `GITHUB_CLIENT_ID` | OAuth client ID | From GitHub app settings |
| `GITHUB_CLIENT_SECRET` | OAuth client secret | From GitHub app settings |
| `GITHUB_CALLBACK_URL` | OAuth return URL | `https://app.onrender.com/auth/github/callback` |
| `AUTHORIZED_GITHUB_USERS` | Allowed GitHub usernames | `dhruvlagad` |
| `SESSION_SECRET` | Session encryption key | 32+ char random string |
| `FRONTEND_URL` | Frontend domain (optional) | `https://dhruvlagad.github.io` |

## Summary

✅ **Frontend (GitHub Pages)**: Static HTML/CSS/JS  
✅ **Backend (Render)**: Node.js OAuth server  
✅ **Authentication**: GitHub OAuth flow  
✅ **CORS**: Configured for GitHub Pages  
✅ **Environment**: Production-ready configuration  

You're now ready to deploy!
