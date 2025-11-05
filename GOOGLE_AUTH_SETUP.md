# 🔐 Google OAuth Authentication Setup

## Prerequisites

1. Google Cloud Console account
2. A project in Google Cloud Console

## Step-by-Step Setup

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. If prompted, configure the OAuth consent screen:
   - User Type: External (or Internal for Google Workspace)
   - App name: GymPro
   - Support email: your-email@example.com
   - Authorized domains: your-domain.com
   - Save and Continue
6. For OAuth client:
   - Application type: **Web application**
   - Name: GymPro Frontend
   - Authorized JavaScript origins:
     - `http://localhost:5173`
     - `http://localhost:5174`
     - `http://localhost:5175`
     - `http://localhost:5176`
     - Your production URL (e.g., `https://yourdomain.com`)
   - Authorized redirect URIs:
     - `http://localhost:5173` (or your dev port)
     - Your production URL
   - Click **Create**
7. Copy the **Client ID** (looks like: `123456789-abc.apps.googleusercontent.com`)

### 2. Add Client ID to Environment Variables

Update `.env.development`:
```env
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

For production, add to `.env.production`:
```env
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

### 3. Backend Integration

Your backend needs to handle Google OAuth:

**Endpoint**: `POST /auth/google`

**Request Body**:
```json
{
  "accessToken": "google-access-token"
}
```

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@gmail.com",
      "phone": "",
      "role": "member",
      "avatar": "https://lh3.googleusercontent.com/...",
      "emailVerified": true
    },
    "token": "jwt-token",
    "refreshToken": "refresh-token"
  },
  "message": "Login successful"
}
```

### 4. Backend Implementation Example (Node.js/Express)

```javascript
// Backend route handler example
app.post('/api/auth/google', async (req, res) => {
  try {
    const { accessToken } = req.body;
    
    // Verify Google token
    const googleUser = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(res => res.json());
    
    // Find or create user
    let user = await User.findOne({ email: googleUser.email });
    
    if (!user) {
      user = await User.create({
        firstName: googleUser.given_name,
        lastName: googleUser.family_name,
        email: googleUser.email,
        avatar: googleUser.picture,
        emailVerified: true,
        role: 'member',
      });
    }
    
    // Generate JWT tokens
    const token = generateJWT(user);
    const refreshToken = generateRefreshToken(user);
    
    res.json({
      success: true,
      data: {
        user,
        token,
        refreshToken,
      },
      message: 'Login successful',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Google authentication failed',
    });
  }
});
```

## How It Works

1. User clicks "Sign in with Google"
2. Google OAuth popup opens
3. User authorizes the app
4. Google returns access token
5. Frontend sends token to backend (`/auth/google`)
6. Backend verifies token with Google
7. Backend finds/creates user
8. Backend returns JWT tokens
9. Frontend stores tokens and redirects to dashboard

## Testing Without Backend

If you don't have a backend yet, the Google login button will appear but will show an error when clicked. You can:

1. **Mock the backend** - Temporarily mock the API response
2. **Use normal login** - Continue using email/password login
3. **Skip Google Auth** - Remove `VITE_GOOGLE_CLIENT_ID` from env to hide the button

## Troubleshooting

### Button Not Appearing
- Check that `VITE_GOOGLE_CLIENT_ID` is set in `.env.development`
- Restart dev server after adding env variable

### "Invalid Client" Error
- Verify Client ID is correct
- Check that your domain is in Authorized JavaScript origins
- Ensure you're using the correct project in Google Cloud Console

### "Redirect URI Mismatch"
- Add your current URL (e.g., `http://localhost:5176`) to Authorized redirect URIs
- Make sure the URL matches exactly (including port)

### CORS Errors
- Backend needs to allow requests from your frontend origin
- Add CORS headers in backend

## Security Notes

- Never expose your Client Secret in frontend code
- Always validate Google tokens on the backend
- Use HTTPS in production
- Implement proper token refresh mechanism

