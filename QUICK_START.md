# 🚀 Quick Start Guide - AI-Fit Frontend

## Running the Application

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will run on `http://localhost:5173` (or the next available port)

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🔐 Authentication Setup

### Option 1: Normal Login (Email/Password)
- **Login Page**: `/login`
- **Signup Page**: `/signup`
- Works out of the box with your backend API

### Option 2: Google OAuth Login
1. Get Google OAuth credentials from [Google Cloud Console](https://console.cloud.google.com/)
2. Add your Client ID to `.env.development`:
   ```env
   VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
   ```
3. Update backend to handle Google OAuth callback

---

## 📝 Environment Variables

Create `.env.development` file:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=AI-Fit
VITE_ENABLE_DEVTOOLS=true
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

---

## 🎯 Default Login (For Testing)

If you don't have a backend yet, you can use mock authentication:
- Email: `test@example.com`
- Password: `password123`

The app will work with mock data until you connect your backend.

---

## 📱 Access the App

1. Open browser: `http://localhost:5173`
2. Click "Sign Up" to create account
3. Or use "Login" if you have credentials
4. After login, you'll see the Dashboard

---

## 🛠 Troubleshooting

### Port Already in Use
Vite will automatically try the next available port (5174, 5175, etc.)

### Tailwind CSS Not Working
- Make sure `postcss.config.js` and `tailwind.config.js` use ES module syntax
- Restart dev server after config changes

### API Errors
- Check that `VITE_API_BASE_URL` is correct
- Ensure backend is running
- Check browser console for errors

---

## ✅ Next Steps

1. Connect your backend API
2. Configure Google OAuth (optional)
3. Customize branding
4. Deploy to production

