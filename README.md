# 🛒 ShopHub E-Commerce Platform

A full-stack e-commerce application built with React, Redux, TypeScript, Node.js, Express, and PostgreSQL.

## ✨ Features

- 🛍️ **50+ Products** across multiple categories
- 🔐 **User Authentication** (Register/Login/Logout)
- 🛒 **Shopping Cart** with real-time updates
- 💳 **Checkout System** with multiple payment options
- 📦 **Order Management** 
- 👨‍💼 **Admin Panel** for product and user management
- 📊 **Analytics Dashboard**
- 🔍 **Search & Filter** by category and price
- 📱 **Responsive Design** - works on all devices
- 🎨 **Modern UI** with gradient themes and smooth animations

## 🚀 Live Demo

**Frontend:** https://ecom-project-6jdjpy27w-yakshith-s-ys-projects.vercel.app/  
**Backend API:** [https://shophub-api.vercel.app](https://shophub-api.vercel.app)



### Frontend
- React 18.2
- TypeScript
- Redux Toolkit
- React Router
- Axios
- Vite

### Backend
- Node.js
- Express
- TypeScript
- PostgreSQL
- Express Session
- Bcrypt

## 💻 Local Development

### Prerequisites
- Node.js 16+
- PostgreSQL
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd "new pro"
```

2. **Install dependencies**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. **Set up database**
```bash
# Create database
psql -U postgres
CREATE DATABASE ecommerce;

# Run schema
psql -U postgres -d ecommerce -f backend/schema.sql
```

4. **Configure environment**
```bash
# Backend .env
cd backend
cp .env.example .env
# Edit .env with your settings
```

5. **Run the app**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

6. **Open browser**
- Frontend: http://localhost:5173
- Backend: http://localhost:4000

### Quick Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy backend
cd backend
vercel

# Deploy frontend
cd ../frontend
vercel
```

## 👤 Admin Access

- **Email:** yakshith@admin.com
- **Password:** yakshith

## 🗂️ Project Structure

```
new pro/
├── backend/
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth middleware
│   │   ├── utils/        # Database & helpers
│   │   ├── app.ts        # Express app
│   │   └── server.ts     # Server entry
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/        # React pages
│   │   ├── redux/        # State management
│   │   ├── components/   # Reusable components
│   │   ├── hooks/        # Custom hooks
│   │   └── App.tsx       # Main app
│   └── package.json
└── README.md
```

## 🔑 Key Features Details

### User Features
- Browse 50+ products across categories
- Search and filter products
- Add to cart and checkout
- Track orders
- User profile management

### Admin Features
- Add/Edit/Delete products
- Manage users and roles
- View analytics and sales data
- Monitor order status

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders

### Admin
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/user/:id` - Update user role
- `DELETE /api/admin/user/:id` - Delete user

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 📧 Contact

**Developer:** Yakshith  
**Email:** yakshith.s.y1232gmail.com

## 🙏 Acknowledgments

- Product images from Unsplash
- Icons and emojis from Unicode
- Inspiration from modern e-commerce platforms

---

Made with ❤️ in India 🇮🇳
