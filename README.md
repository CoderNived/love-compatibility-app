# 💘 Love Compatibility Analyzer

A production-quality MERN stack application that calculates love compatibility percentages between two people with a beautiful Valentine-themed glassmorphism UI.

## 🎯 Features

- **Love Calculation**: Algorithmic compatibility scoring based on names
- **Animated Results**: Beautiful animations and confetti for high scores
- **Admin Dashboard**: View all submissions with analytics
- **Data Visualization**: Chart.js powered distribution charts
- **Responsive Design**: Mobile-first glassmorphism design
- **Production Ready**: Error handling, validation, rate limiting

## 🧱 Tech Stack

### Frontend
- React 18 (Vite)
- React Router DOM
- Chart.js
- Modern CSS (Glassmorphism)

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- CORS, Helmet, Rate Limiting

## 📁 Project Structure

```
love-compatibility-app/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # React Components
│   │   ├── pages/         # Page Components
│   │   ├── App.jsx        # Main App
│   │   ├── main.jsx       # Entry Point
│   │   └── styles.css     # Global Styles
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Node.js Backend
│   ├── models/           # Mongoose Models
│   ├── routes/           # API Routes
│   ├── controllers/      # Business Logic
│   ├── config/           # Database Config
│   ├── middleware/       # Custom Middleware
│   ├── server.js         # Entry Point
│   └── package.json
│
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone Repository
```bash
git clone <repository-url>
cd love-compatibility-app
```

### 2. Backend Setup
```bash
cd server
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB URI
# MONGODB_URI=mongodb://localhost:27017/love-compatibility
# or
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/love-compatibility

# Start server
npm run dev
```

Server runs on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd client
npm install

# Create .env file
cp .env.example .env

# Edit .env
# VITE_API_URL=http://localhost:5000

# Start development server
npm run dev
```

Frontend runs on `http://localhost:5173`

## 🎮 Usage

### User Flow
1. Navigate to home page
2. Enter two names
3. Click "Calculate Love"
4. View animated compatibility result
5. Copy result or try again

### Admin Flow
1. Navigate to `/admin`
2. View all submissions
3. See statistics and charts
4. Delete entries if needed

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/love` | Calculate & save compatibility |
| GET | `/api/love` | Get all submissions |
| GET | `/api/love/stats` | Get analytics data |
| DELETE | `/api/love/:id` | Delete a submission |

### Example API Request
```javascript
POST /api/love
Content-Type: application/json

{
  "name1": "Alice",
  "name2": "Bob"
}

// Response
{
  "success": true,
  "data": {
    "_id": "...",
    "name1": "Alice",
    "name2": "Bob",
    "percentage": 87,
    "createdAt": "2025-02-01T..."
  }
}
```

## 🚢 Deployment

### Deploy Backend to Render

1. Create account on [Render](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: love-compatibility-api
   - **Environment**: Node
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Environment Variables**:
     - `NODE_ENV=production`
     - `MONGODB_URI=<your-mongodb-atlas-uri>`
     - `CLIENT_URL=<your-vercel-frontend-url>`
5. Click "Create Web Service"

### Deploy Frontend to Vercel

1. Create account on [Vercel](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variables**:
     - `VITE_API_URL=<your-render-backend-url>`
5. Click "Deploy"

### MongoDB Atlas Setup

1. Create account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create database user
4. Whitelist IP (0.0.0.0/0 for all IPs)
5. Get connection string
6. Update in Render environment variables

## 🧪 Testing

### Manual Testing Checklist

**Frontend:**
- [ ] Form validation works
- [ ] Results display correctly
- [ ] Confetti triggers for >80%
- [ ] Copy to clipboard works
- [ ] Mobile responsive
- [ ] Admin dashboard loads
- [ ] Charts render properly

**Backend:**
- [ ] POST /api/love saves to DB
- [ ] GET /api/love returns entries
- [ ] GET /api/love/stats returns analytics
- [ ] DELETE /api/love/:id removes entry
- [ ] Rate limiting prevents spam
- [ ] Error handling catches issues

## 🎨 Customization

### Change Color Theme
Edit `client/src/styles.css`:
```css
:root {
  --gradient-valentine: linear-gradient(135deg, #your-colors);
}
```

### Modify Algorithm
Edit `server/controllers/loveController.js`:
```javascript
const calculateLovePercentage = (name1, name2) => {
  // Your custom algorithm
};
```

### Add Authentication
1. Install `jsonwebtoken` and `bcryptjs`
2. Create auth middleware
3. Protect admin routes
4. Add login page

## 📝 Environment Variables

### Server (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/love-compatibility
CLIENT_URL=http://localhost:5173
```

### Client (.env)
```env
VITE_API_URL=http://localhost:5000
```

## 🐛 Troubleshooting

### CORS Errors
- Check `CLIENT_URL` in server .env
- Verify CORS configuration in `server.js`

### Database Connection Failed
- Check MongoDB URI
- Verify MongoDB is running (local) or accessible (Atlas)
- Check network access in Atlas

### Frontend Can't Connect to Backend
- Verify `VITE_API_URL` in client .env
- Check backend is running on correct port
- Test API endpoint directly (Postman/browser)

## 📄 License

MIT License - Feel free to use for personal or commercial projects

## 👨‍💻 Author

Created with ❤️ for learning MERN stack development

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check existing issues first

---

**Happy Coding! 💘**
