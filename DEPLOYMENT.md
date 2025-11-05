# 🚀 Deployment Guide

## GitHub Repository Setup

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository (e.g., `gms-frontend`)
3. **DO NOT** initialize with README, .gitignore, or license (we already have these)

### 2. Push to GitHub

```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/gms-frontend.git

# Push all branches
git push -u origin main
git push -u origin develop
git push origin --all
```

### 3. Branch Protection Rules

Set up in GitHub Settings → Branches:

**Main Branch:**
- ✅ Require pull request reviews
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ Do not allow force pushes

**Develop Branch:**
- ✅ Require pull request reviews (1 reviewer)
- ✅ Allow force pushes (for rebasing)

## Branch Structure

```
main (production)
  │
  └── develop (integration)
        │
        ├── feature/core-infrastructure
        ├── feature/authentication
        ├── feature/google-oauth
        ├── feature/members-module
        ├── feature/trainers-module
        ├── feature/classes-module
        ├── feature/billing-module
        ├── feature/dashboard-charts
        ├── feature/utilities-hooks
        └── fix/tailwind-config
```

## Deployment Workflow

### Development
- **Branch**: `develop`
- **Trigger**: Push to `develop`
- **Deploy**: Staging environment

### Production
- **Branch**: `main`
- **Trigger**: Merge to `main`
- **Deploy**: Production environment (Netlify)

## CI/CD Pipeline

GitHub Actions automatically:
1. ✅ Run linter on PR
2. ✅ Run type checking
3. ✅ Run tests
4. ✅ Build application
5. ✅ Deploy on merge to `main`

## Environment Variables

Set in GitHub Secrets (Settings → Secrets):

- `NETLIFY_AUTH_TOKEN` - Netlify authentication token
- `NETLIFY_SITE_ID` - Netlify site ID
- `API_BASE_URL` - Production API URL
- `GOOGLE_CLIENT_ID` - Google OAuth Client ID

## Netlify Deployment

1. **Connect GitHub** to Netlify
2. **Select Repository**: `gms-frontend`
3. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. **Environment Variables**: Add all `VITE_*` variables
5. **Deploy**: Auto-deploys on push to `main`

