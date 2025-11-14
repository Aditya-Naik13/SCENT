# 🚀 Deployment Guide

This guide will help you deploy your SCENT app to Vercel for free.

## Prerequisites

- A GitHub account (you already have this!)
- A Vercel account (free) - Sign up at https://vercel.com

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub** (already done!)
   ```bash
   git push
   ```

2. **Go to Vercel**
   - Visit https://vercel.com
   - Click "Sign Up" or "Log In"
   - Choose "Continue with GitHub"

3. **Import Your Repository**
   - Click "Add New..." → "Project"
   - Find your repository: `Aditya-Naik13/SCENT`
   - Click "Import"

4. **Configure Project**
   - Framework Preset: **Next.js**
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `out` (auto-detected)
   - Install Command: `npm install` (auto-detected)

5. **Deploy!**
   - Click "Deploy"
   - Wait 2-3 minutes for the build
   - Your app will be live at: `https://scent-xxx.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from the project directory
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (Your account)
# - Link to existing project? No
# - What's your project's name? scent
# - In which directory is your code located? ./
# - Want to override the settings? No

# Deploy to production
vercel --prod
```

## Environment Variables (if needed later)

If you add environment variables in the future:

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add your variables
4. Redeploy

## Custom Domain (Optional)

1. Go to your Vercel project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow Vercel's DNS setup instructions

## Automatic Deployments

Vercel automatically deploys when you push to your main branch:

```bash
git add .
git commit -m "Update app"
git push
```

Your app will automatically rebuild and deploy!

## Build Status

Current build configuration:
- ✅ Static export enabled
- ✅ Production build tested
- ✅ Bundle size optimized
- ✅ TypeScript validated
- ✅ All features working

## Troubleshooting

### Build fails on Vercel

Check the build logs in Vercel dashboard. Common fixes:
- Clear build cache in Vercel settings
- Ensure all dependencies are in package.json
- Check Node.js version (should be 18+)

### App shows blank page

- Check browser console for errors
- Verify all assets are loading
- Check Vercel function logs

### Performance issues

- Enable caching in Vercel settings
- Consider using Vercel's Edge Network
- Optimize images (already done)

## Post-Deployment Checklist

- [ ] Visit your deployed URL
- [ ] Test all three features (Search, Dupes, Explorer)
- [ ] Check D3.js visualizations load correctly
- [ ] Test on mobile devices
- [ ] Share your app! 🎉

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- GitHub Issues: Create an issue in your repo

---

**Your app is ready to share with the world!** 🌎
