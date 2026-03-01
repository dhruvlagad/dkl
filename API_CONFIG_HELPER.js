/**
 * API Configuration Helper
 * 
 * This file shows you how to configure your frontend to work with the production backend.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your HTML files (index.html, admin.html)
 * 2. At the TOP of the <script> tag, add an API_BASE variable
 * 3. Replace all fetch '/api/...' with fetch `${API_BASE}/api/...`
 * 
 * EXAMPLE:
 * 
 * BEFORE (localhost only):
 *   fetch('/api/check-auth')
 * 
 * AFTER (works on both localhost and production):
 *   fetch(`${API_BASE}/api/check-auth`)
 */

// ============================================
// You have 2 options for configuring API_BASE
// ============================================

// OPTION 1: Separate URLs for local vs production
// ============================================
const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : 'https://dkl-portfolio-admin.onrender.com';  // ← Change to your Render URL

// OPTION 2: Always use production URL (recommended for GitHub Pages)
// ============================================
// const API_BASE = 'https://dkl-portfolio-admin.onrender.com';  // ← Change to your Render URL

// ============================================
// API CALLS TO UPDATE IN YOUR FILES
// ============================================

/**
 * ADMIN.HTML - Current fetch calls to update:
 * 
 * 1. Check authentication:
 *    OLD: fetch('/api/check-auth')
 *    NEW: fetch(`${API_BASE}/api/check-auth`)
 * 
 * 2. Load gallery images:
 *    OLD: fetch('/api/images')
 *    NEW: fetch(`${API_BASE}/api/images`)
 * 
 * 3. Delete image:
 *    OLD: fetch(`/api/images/${filename}`, { method: 'DELETE' })
 *    NEW: fetch(`${API_BASE}/api/images/${filename}`, { method: 'DELETE' })
 * 
 * 4. Upload images:
 *    OLD: fetch('/api/upload', { method: 'POST', ... })
 *    NEW: fetch(`${API_BASE}/api/upload`, { method: 'POST', ... })
 * 
 * 5. Image sources:
 *    OLD: <img src="/artwork/${img}">
 *    NEW: <img src="${API_BASE}/artwork/${img}">
 */

/**
 * INDEX.HTML - Current fetch calls to update:
 * 
 * 1. Check authentication:
 *    OLD: fetch('/api/check-auth')
 *    NEW: fetch(`${API_BASE}/api/check-auth`)
 * 
 * 2. Load images for homepage:
 *    OLD: fetch('/api/images')
 *    NEW: fetch(`${API_BASE}/api/images`)
 * 
 * 3. Image sources:
 *    OLD: <img src="/artwork/${image}">
 *    NEW: <img src="${API_BASE}/artwork/${image}">
 */

// ============================================
// COMPLETE EXAMPLE UPDATE FOR ADMIN.HTML
// ============================================

/*
At the top of your <script> tag in admin.html, add:

    <script>
        // API Configuration
        const API_BASE = window.location.hostname === 'localhost'
          ? 'http://localhost:3000'
          : 'https://dkl-portfolio-admin.onrender.com';

        let selectedFiles = [];
        const uploadArea = document.getElementById('uploadArea');
        // ... rest of your code ...

        // THEN update all fetch calls:
        
        // Load gallery
        async function loadGallery() {
            try {
                const response = await fetch(`${API_BASE}/api/images`);  // ← UPDATED
                const images = await response.json();
                // ... rest of code ...
            }
        }

        // Delete image
        window.deleteImage = async function(filename) {
            try {
                const response = await fetch(`${API_BASE}/api/images/${filename}`, {  // ← UPDATED
                    method: 'DELETE'
                });
                // ... rest of code ...
            }
        }
*/

// ============================================
// TESTING YOUR CONFIGURATION
// ============================================

/*
After making changes:

1. Open your HTML file (index.html or admin.html)
2. Press F12 to open Developer Console
3. Try clicking a feature that calls the API
4. Check the Network tab - requests should go to your Render URL
   - Should see: https://dkl-portfolio-admin.onrender.com/api/...
   - NOT: http://localhost:3000/api/...

5. If you see CORS errors in Console:
   - Verify GITHUB_CALLBACK_URL in Render matches OAuth app
   - Restart Render deployment
   - Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)
*/

console.log(`API Base URL: ${API_BASE}`);
