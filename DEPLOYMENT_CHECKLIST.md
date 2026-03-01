# ✅ Complete Deployment Checklist

Follow these steps to deploy your DKL Portfolio to production.

## Phase 1: Local Testing ✓

- [x] Added CORS support to `server.js`
- [x] Updated `package.json` with `cors` dependency
- [x] Created deployment configuration files
- [x] Verified server.js syntax is valid

**Status**: Ready for production setup

---

## Phase 2: GitHub OAuth App Setup

### Step 1: Create/Update OAuth App

- [ ] Go to https://github.com/settings/developers
- [ ] Click "OAuth Apps" → "New OAuth App"
- [ ] Fill in these details:
  - **Application name**: `DKL Portfolio Admin`
  - **Homepage URL**: `https://dhruvlagad.github.io/dkl/`
  - **Application description**: (optional)
  - **Authorization callback URL**: ⚠️ **DON'T FILL YET** - You'll update this after creating the Render app
- [ ] Click "Register application"
- [ ] Copy your **Client ID** (save it)
- [ ] Generate a new **Client Secret** (save it safely)

---

## Phase 3: Deploy Backend to Render

### Step 1: Create Render Account
- [ ] Go to https://render.com
- [ ] Sign up with GitHub (easier integration)

### Step 2: Create Web Service
- [ ] Click "New" → "Web Service"
- [ ] "Connect repository" → Select `dhruvlagad/dkl`
- [ ] Fill in the form:
  - **Name**: `dkl-portfolio-admin`
  - **Runtime**: `Node`
  - **Build Command**: `npm install`
  - **Start Command**: `npm start`
  - **Plan**: Free (or upgrade if needed)

### Step 3: Add Environment Variables

Before deploying, click "Add Environment Variable" for each:

```
PORT = 3000

NODE_ENV = production

GITHUB_CLIENT_ID = (paste your Client ID from GitHub)

GITHUB_CLIENT_SECRET = (paste your Client Secret from GitHub)

GITHUB_CALLBACK_URL = https://dkl-portfolio-admin.onrender.com/auth/github/callback
(Note: Change "dkl-portfolio-admin" to your actual Render service name)

AUTHORIZED_GITHUB_USERS = dhruvlagad

SESSION_SECRET = (generate with command below)
```

### Generate SESSION_SECRET

In your terminal, run:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste as `SESSION_SECRET` value.

### Step 4: Deploy
- [ ] Click "Create Web Service"
- [ ] Wait for build to complete (watch the logs)
- [ ] Confirm you see: `Server running on http://localhost:3000`

### Step 5: Get Your Render URL
After deployment succeeds:
- [ ] Copy your Render app URL from the dashboard
  - Format: `https://dkl-portfolio-admin.onrender.com`
  - (Your URL will be different)

---

## Phase 4: Update GitHub OAuth App

Now that you have your Render URL, complete OAuth setup:

- [ ] Go back to https://github.com/settings/developers
- [ ] Click your "DKL Portfolio Admin" app
- [ ] Update "Authorization callback URL":
  ```
  https://YOUR_RENDER_URL/auth/github/callback
  ```
  Replace `YOUR_RENDER_URL` with your actual Render URL from Phase 3 Step 5

- [ ] Click "Update application"

---

## Phase 5: Test Authentication Flow

### Test 1: OAuth Callback
- [ ] Open your GitHub OAuth app settings
- [ ] Verify the callback URL is set to your Render URL

### Test 2: Local Test (Optional)
```bash
cd /workspaces/dkl

# Install dependencies
npm install

# Start server
npm start
```
- [ ] Open http://localhost:3000
- [ ] Check the console (should show: "Server running on http://localhost:3000")

### Test 3: Production Test
- [ ] Open https://dhruvlagad.github.io/dkl/
- [ ] Click "Admin Login"
- [ ] Click "Login with GitHub"
- [ ] You should be redirected to GitHub OAuth
- [ ] After approving, you should go to admin panel
- [ ] If it fails, check [Troubleshooting](#troubleshooting) below

---

## Phase 6: Update Frontend API Calls

Check your HTML/JavaScript files and update API calls to use your Render backend.

**Example in JavaScript:**
```javascript
// Define your API endpoint
const API_BASE = 'https://dkl-portfolio-admin.onrender.com'; // Change to your Render URL

// Update your fetch calls
fetch(`${API_BASE}/api/images`)
fetch(`${API_BASE}/api/upload`, { method: 'POST', ... })
fetch(`${API_BASE}/api/images/${filename}`, { method: 'DELETE' })
```

Or use environment-based URL:
```javascript
const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : 'https://dkl-portfolio-admin.onrender.com';
```

- [ ] Update all API endpoints in HTML/JS files
- [ ] Test image upload/delete features

---

## Phase 7: Deploy Frontend to GitHub Pages

Your frontend files (HTML/CSS/JS) live in the `main` branch:

- [ ] Verify files are in root: `index.html`, `admin.html`, `contact.html`, etc.
- [ ] Go to your repository → Settings → Pages
- [ ] Source: `Deploy from a branch`
- [ ] Branch: `main`
- [ ] Folder: `/ (root)`
- [ ] Click "Save"
- [ ] Your site is live at: https://dhruvlagad.github.io/dkl/

---

## Troubleshooting

### OAuth Redirects to Wrong URL
**Problem**: Clicking "Login with GitHub" redirects to `https://dhruvlagad.github.io/auth/github` instead of your Render URL

**Solution**:
1. Check `server.js` lines 21-24 - CORS whitelist includes GitHub Pages domain ✓
2. Check your HTML links use relative paths:
   - In `index.html`: `<a href="auth/github">`  (no leading slash) ✓
3. Verify `GITHUB_CALLBACK_URL` in Render environment variables matches GitHub OAuth app settings

### CORS Errors in Console
**Problem**: `Access to XMLHttpRequest at 'https://your-render-url' from origin 'https://dhruvlagad.github.io' blocked by CORS`

**Solution**:
1. Render environment variable `NODE_ENV` must be `production`
2. `CORS` middleware in `server.js` includes `https://dhruvlagad.github.io` ✓
3. Restart Render deployment after changing env vars

### Free Tier Spin-Down (Render)
**Problem**: First request after 15+ minutes of inactivity takes 30-60 seconds

**Solution**:
- Upgrade to Paid plan for instant responses
- Or accept the delay (normal for free tier)

### Session/Authentication Issues
**Problem**: Logging in works but session doesn't persist

**Solution**:
1. Generate a new `SESSION_SECRET` with the command above
2. Set `NODE_ENV=production` in Render
3. Verify `secure: true` cookies in production (line 29 of server.js) ✓

### Port Already in Use
**Problem**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

---

## File Reference

- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Detailed deployment architecture & steps
- **[.env.example](.env.example)** - Environment variables template
- **[render.yaml](render.yaml)** - Render deployment configuration
- **[server.js](server.js)** - Backend server with OAuth & API endpoints

---

## Final Checklist

- [ ] GitHub OAuth app created with your credentials
- [ ] Render app deployed with environment variables
- [ ] GitHub OAuth app callback URL points to Render URL
- [ ] CORS configured in server.js
- [ ] Frontend HTML links use relative paths (auth/github)
- [ ] Frontend API calls use Render backend URL
- [ ] GitHub Pages publishing enabled
- [ ] Authentication flow tested end-to-end

---

## Need Help?

**CORS Issues?**
- Check browser console for exact error message
- Verify `FRONTEND_URL` environment variable if using custom domain

**OAuth Loops?**
- Compare GitHub OAuth app callback URL with Render `GITHUB_CALLBACK_URL`
- They must match exactly

**Upload Not Working?**
- Verify frontend JavaScript uses correct API base URL
- Check Render logs for server errors

**Can't Access Admin Panel?**
- Verify your GitHub username is in `AUTHORIZED_GITHUB_USERS`
- Check Render logs for authentication errors

---

✅ You're ready to deploy!

Once complete, your architecture will be:
- Frontend: `https://dhruvlagad.github.io/dkl/` (GitHub Pages)
- Backend: `https://dkl-portfolio-admin.onrender.com` (Render)
- OAuth: Synchronized across both
