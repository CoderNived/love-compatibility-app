# 🚀 Deployment Guide - Love Compatibility Analyzer

Complete guide to deploy your application to production.

## 🎯 Deployment Stack

- **Frontend**: Vercel (Free)
- **Backend**: Render (Free)
- **Database**: MongoDB Atlas (Free)

---

## 📊 Part 1: MongoDB Atlas Setup (5 min)

### 1. Create Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Verify email

### 2. Create Cluster
1. Click "Build a Database"
2. Choose FREE tier (M0 Sandbox)
3. Select cloud provider & region (closest to you)
4. Cluster Name: `love-compatibility`
5. Click "Create"

### 3. Create Database User
1. Security → Database Access
2. Add New Database User
3. Authentication: Password
4. Username: `loveapp`
5. Password: Generate secure password (save it!)
6. Database User Privileges: Read and write to any database
7. Add User

### 4. Allow Network Access
1. Security → Network Access
2. Add IP Address
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
4. Confirm

### 5. Get Connection String
1. Databases → Connect
2. Choose "Connect your application"
3. Driver: Node.js
4. Copy connection string
5. Format: `mongodb+srv://loveapp:<password>@cluster.mongodb.net/love-compatibility`
6. Replace `<password>` with your user password
7. **Save this - you'll need it!**

---

## 🌐 Part 2: Deploy Backend to Render (10 min)

### Prerequisites
- Push code to GitHub repository
- Have MongoDB Atlas connection string ready

### 1. Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render

### 2. Create Web Service
1. Dashboard → New → Web Service
2. Connect your repository
3. Configure:

**Basic Settings:**
- Name: `love-compatibility-api`
- Region: Select closest to you
- Branch: `main` (or your default branch)
- Root Directory: `server`
- Runtime: `Node`

**Build & Deploy:**
- Build Command: `npm install`
- Start Command: `npm start`

**Instance Type:**
- Free

### 3. Add Environment Variables
Click "Advanced" → Add Environment Variables:

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://loveapp:YOUR_PASSWORD@cluster.mongodb.net/love-compatibility
CLIENT_URL=https://your-app.vercel.app
```

⚠️ **Important**: 
- Replace `YOUR_PASSWORD` with your MongoDB password
- We'll update `CLIENT_URL` after deploying frontend

### 4. Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Once deployed, copy your service URL
4. Format: `https://love-compatibility-api.onrender.com`
5. **Save this URL!**

### 5. Test Your API
```bash
curl https://your-render-url.onrender.com/health
# Should return: {"status":"OK","timestamp":"..."}

curl -X POST https://your-render-url.onrender.com/api/love \
  -H "Content-Type: application/json" \
  -d '{"name1":"Test","name2":"User"}'
# Should return compatibility result
```

---

## ⚡ Part 3: Deploy Frontend to Vercel (5 min)

### 1. Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel

### 2. Import Project
1. Dashboard → Add New → Project
2. Import your repository
3. Configure:

**Framework Preset:**
- Vite (auto-detected)

**Root Directory:**
- `client`

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### 3. Add Environment Variable
Add Environment Variables:

```env
VITE_API_URL=https://your-render-backend-url.onrender.com
```

Replace with your actual Render backend URL from Part 2.

### 4. Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. Once deployed, you'll get your live URL
4. Format: `https://love-compatibility.vercel.app`

### 5. Update Backend CORS
1. Go back to Render dashboard
2. Your service → Environment
3. Edit `CLIENT_URL` variable
4. Set to your Vercel URL: `https://your-app.vercel.app`
5. Save changes
6. Render will automatically redeploy

---

## ✅ Part 4: Verification (2 min)

### Test Your Live App

1. **Visit Your Frontend**
   - Open your Vercel URL
   - Should see beautiful landing page
   - Floating hearts animation

2. **Test Love Calculator**
   - Enter two names
   - Click "Calculate Love"
   - Should see result with animation
   - Check confetti for high scores (>80%)

3. **Check Admin Dashboard**
   - Visit `/admin` route
   - Should see your test submission
   - Charts should render
   - Stats should display

4. **Verify Database**
   - MongoDB Atlas → Database → Browse Collections
   - Should see `loves` collection
   - Your test data should be there

---

## 🔧 Post-Deployment Configuration

### Custom Domain (Optional)

**Vercel:**
1. Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration steps

**Render:**
1. Service Settings → Custom Domain
2. Add your domain
3. Configure DNS records

### Environment Variables Update

If you need to update:

**Render:**
1. Service → Environment
2. Edit variables
3. Save (auto-redeploys)

**Vercel:**
1. Project Settings → Environment Variables
2. Edit/Add variables
3. Redeploy

---

## 📈 Monitoring & Logs

### Render Logs
1. Dashboard → Your Service
2. Logs tab
3. Real-time server logs
4. Filter by date/type

### Vercel Logs
1. Project → Deployments
2. Click deployment
3. Functions tab for logs

### MongoDB Metrics
1. Atlas Dashboard
2. Clusters → Metrics
3. View connections, operations, storage

---

## 🚨 Troubleshooting

### "CORS Error"
**Fix**: Update `CLIENT_URL` in Render to match Vercel URL exactly (no trailing slash)

### "Cannot connect to database"
**Check**:
- MongoDB Atlas connection string is correct
- Password in URI is URL-encoded
- Network access allows 0.0.0.0/0
- Cluster is running

### "API calls failing"
**Check**:
- Render service is running (not sleeping)
- `VITE_API_URL` in Vercel matches Render URL
- Test API directly: `https://your-api.onrender.com/health`

### "Blank page on Vercel"
**Check**:
- Build completed successfully
- Check browser console for errors
- Verify environment variables

### Render Free Tier Sleeping
- Free tier spins down after 15 min inactivity
- First request may take 30-60 seconds
- Upgrade to paid plan for always-on

---

## 💰 Cost Breakdown

| Service | Free Tier | Limits |
|---------|-----------|--------|
| MongoDB Atlas | ✅ Free Forever | 512MB storage |
| Render | ✅ Free Forever | Spins down after 15min inactive |
| Vercel | ✅ Free Forever | 100GB bandwidth/month |

**Total Cost**: $0/month for personal projects! 🎉

---

## 🎓 Next Steps

1. **Add Custom Domain**
2. **Enable HTTPS** (automatic on Vercel/Render)
3. **Setup Monitoring** (Render has built-in monitoring)
4. **Add Google Analytics**
5. **SEO Optimization**
6. **Social Media Cards** (og:image, etc.)

---

## 📞 Need Help?

**Render Support**: https://render.com/docs
**Vercel Support**: https://vercel.com/docs
**MongoDB Support**: https://www.mongodb.com/docs/atlas/

---

## ✨ Success!

Your Love Compatibility Analyzer is now live! 

Share it with friends:
- Frontend: `https://your-app.vercel.app`
- Admin: `https://your-app.vercel.app/admin`

**Congratulations! 🎉💘**
