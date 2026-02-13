# ⚡ Quick Start Guide - Love Compatibility Analyzer

## 🎯 Get Running in 5 Minutes

### Step 1: Install Dependencies (2 min)

**Terminal 1 - Backend:**
```bash
cd server
npm install
```

**Terminal 2 - Frontend:**
```bash
cd client
npm install
```

### Step 2: Setup Environment Variables (1 min)

**Server (.env):**
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/love-compatibility
CLIENT_URL=http://localhost:5173
```

**Client (.env):**
```bash
cd client
cp .env.example .env
```

Edit `client/.env`:
```env
VITE_API_URL=http://localhost:5000
```

### Step 3: Start MongoDB (30 sec)

**Option A - Local MongoDB:**
```bash
mongod
```

**Option B - MongoDB Atlas (Free Cloud):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create free cluster
4. Get connection string
5. Update MONGODB_URI in server/.env

### Step 4: Run the App (1 min)

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```
✅ Server running on http://localhost:5000

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```
✅ App running on http://localhost:5173

### Step 5: Test It Out! (30 sec)

1. Open http://localhost:5173
2. Enter two names
3. Click "Calculate Love"
4. See the magic! ✨

## 🎨 Pages

- **Home**: http://localhost:5173/
- **Admin Dashboard**: http://localhost:5173/admin

## 📡 API Test

Test backend directly:
```bash
curl -X POST http://localhost:5000/api/love \
  -H "Content-Type: application/json" \
  -d '{"name1":"Alice","name2":"Bob"}'
```

## ❌ Common Issues

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### MongoDB Connection Error
- Check MongoDB is running: `mongod`
- Or use MongoDB Atlas connection string

### CORS Error
- Ensure CLIENT_URL in server/.env matches frontend URL
- Default: `CLIENT_URL=http://localhost:5173`

## 🚀 Production Build

**Build Frontend:**
```bash
cd client
npm run build
# Creates dist/ folder
```

**Run Production Server:**
```bash
cd server
NODE_ENV=production npm start
```

## 📦 What's Included

✅ Full MERN stack
✅ Love calculation algorithm
✅ Beautiful glassmorphism UI
✅ Admin dashboard with charts
✅ Mobile responsive
✅ Production ready
✅ Error handling
✅ Rate limiting
✅ Input validation

## 🎓 Next Steps

1. **Customize Colors**: Edit `client/src/styles.css`
2. **Add Auth**: Protect admin routes
3. **Deploy**: Use Vercel + Render (see README.md)
4. **Add Features**: Email results, social sharing, etc.

---

**Need help?** Check README.md for detailed documentation.

**Happy Building! 💘**
