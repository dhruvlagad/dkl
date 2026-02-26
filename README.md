# DKL Portfolio with Admin Panel

A modern portfolio website with GitHub OAuth authentication and image upload functionality.

## Features

- ✨ Clean, responsive portfolio design
- 🔐 GitHub OAuth authentication for admin access
- 📸 Image upload interface with drag-and-drop
- 🖼️ Dynamic image gallery
- 🗑️ Delete images from admin panel
- 📊 Upload progress tracking
- 🎨 Beautiful UI with modern design

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Create GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: DKL Portfolio Admin
   - **Homepage URL**: `http://localhost:3000` (or your domain)
   - **Authorization callback URL**: `http://localhost:3000/auth/github/callback`
4. Click "Register application"
5. Copy the **Client ID** and generate a **Client Secret**

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```env
   GITHUB_CLIENT_ID=your_actual_client_id
   GITHUB_CLIENT_SECRET=your_actual_client_secret
   GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback
   AUTHORIZED_GITHUB_USERS=your-github-username
   SESSION_SECRET=generate-a-long-random-string-here
   ```

### 4. Create Required Directories

The server will automatically create the `artwork` folder, but you can create it manually:

```bash
mkdir artwork
```

### 5. Run the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run at `http://localhost:3000`

## Usage

### Public Access
- Visit `http://localhost:3000` to view the portfolio
- Images are displayed dynamically from the `/artwork` folder

### Admin Access
1. Click the "Admin Login" button in the top-right corner
2. Login with your authorized GitHub account
3. Upload images using drag-and-drop or click to browse
4. Delete images by hovering over them and clicking the × button
5. Logout when done

## File Structure

```
.
├── server.js              # Express server with GitHub OAuth
├── package.json           # Node.js dependencies
├── .env                   # Environment variables (DO NOT COMMIT)
├── .env.example           # Environment variables template
├── index.html             # Main portfolio page
├── admin.html             # Admin panel for uploads
├── artwork/               # Uploaded images directory
├── css/
│   └── style.css         # Your existing styles
├── about.html            # About page (your existing)
└── contact.html          # Contact page (your existing)
```

## Security Features

- ✅ GitHub OAuth authentication
- ✅ Session-based authorization
- ✅ Whitelist of authorized users
- ✅ File type validation (images only)
- ✅ File size limits (10MB per file)
- ✅ Path traversal protection
- ✅ Protected API endpoints

## API Endpoints

### Public Endpoints
- `GET /` - Main portfolio page
- `GET /api/images` - List all images
- `GET /artwork/:filename` - Serve image files

### Protected Endpoints (require authentication)
- `GET /admin.html` - Admin panel
- `POST /api/upload` - Upload images
- `DELETE /api/images/:filename` - Delete an image

### Authentication Endpoints
- `GET /auth/github` - Initiate GitHub OAuth
- `GET /auth/github/callback` - OAuth callback
- `GET /auth/logout` - Logout
- `GET /api/check-auth` - Check authentication status

## Deployment

### Deploy to Production

1. Update `.env` with production URLs:
   ```env
   GITHUB_CALLBACK_URL=https://yourdomain.com/auth/github/callback
   NODE_ENV=production
   ```

2. Update your GitHub OAuth App callback URL to match

3. Deploy to your hosting platform (Heroku, DigitalOcean, AWS, etc.)

### Recommended Hosting Platforms
- **Heroku**: Easy deployment with Git
- **DigitalOcean**: Full control with droplets
- **Railway**: Modern deployment platform
- **Render**: Free tier available
- **AWS EC2**: Scalable cloud hosting

## Customization

### Add More Authorized Users
Edit the `AUTHORIZED_GITHUB_USERS` in `.env`:
```env
AUTHORIZED_GITHUB_USERS=username1,username2,username3
```

### Change Upload Limits
Edit `server.js` and modify the multer configuration:
```javascript
limits: {
    fileSize: 10 * 1024 * 1024 // Change this value
}
```

### Customize Styling
- Main site: Edit `css/style.css`
- Admin panel: Edit styles in `admin.html`

## Troubleshooting

### "Unauthorized user" error
- Make sure your GitHub username is in the `AUTHORIZED_GITHUB_USERS` list
- Check that there are no spaces in the comma-separated list

### Images not loading
- Check that the `artwork` folder exists
- Verify file permissions
- Check browser console for errors

### OAuth not working
- Verify GitHub OAuth app credentials
- Check callback URL matches exactly
- Ensure `.env` file is in the root directory

### Upload failing
- Check file size (must be < 10MB)
- Verify file type (JPG, PNG, GIF, WEBP only)
- Check server logs for errors

## Support

For issues or questions, please:
1. Check the troubleshooting section above
2. Review server logs in the console
3. Verify all environment variables are set correctly

## License

MIT License - feel free to use this for your own portfolio!
