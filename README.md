# RentalAI - MERN Stack SaaS Platform

A comprehensive multi-tenant SaaS platform for short-term rental management with AI-powered features.

## 🚀 Features

- **Multi-tenant Architecture** - Each user gets their own isolated workspace
- **AI-Powered Dynamic Pricing** - Google Gemini AI optimizes pricing based on market trends
- **Property Management** - Complete CRUD operations for rental properties
- **Booking Management** - Handle reservations with calendar integration
- **Airbnb API Integration** - Sync bookings and availability automatically
- **Stripe Billing** - Subscription management with multiple tiers
- **Role-based Access Control** - Admin, Manager, and Member roles
- **Responsive Design** - Modern UI with Tailwind CSS
- **Real-time Analytics** - Revenue tracking and occupancy insights

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Zustand** for state management
- **React Query** for data fetching
- **Recharts** for data visualization
- **Vite** for build tooling

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** authentication
- **Google OAuth** integration
- **Helmet** for security
- **Express Rate Limit** for API protection

### AI & Integrations
- **Google Gemini AI** for pricing optimization
- **Stripe API** for payments and subscriptions
- **Cloudinary** for image uploads
- **Airbnb API** for booking synchronization

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- MongoDB database
- API keys for:
  - Google Gemini AI
  - Stripe
  - Cloudinary
  - Google OAuth (optional)

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd rental-saas-platform

# Install all dependencies
npm run install-all
```

### 2. Environment Configuration

Copy `.env.example` to `.env` and configure your environment variables:

```bash
cp .env.example .env
```

Required environment variables:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/rental-saas

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Google Gemini AI
GOOGLE_GEMINI_API_KEY=your-google-gemini-api-key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 3. Start Development Servers

```bash
# Start both frontend and backend
npm run dev

# Or start individually:
npm run server  # Backend only (http://localhost:5000)
npm run client  # Frontend only (http://localhost:3000)
```

## 🎯 Getting Started

### 1. Create Your Account
- Visit `http://localhost:3000`
- Click "Get Started" to register
- Your account comes with a 14-day free trial

### 2. Add Your First Property
- Navigate to Properties → Add Property
- Fill in property details and upload images
- Configure pricing and availability

### 3. Enable AI Features
- Go to Settings and add your Google Gemini API key
- Enable dynamic pricing for your properties
- AI will start optimizing rates based on market data

### 4. Set Up Integrations
- Configure Stripe for subscription billing
- Connect Airbnb API for booking synchronization
- Set up Cloudinary for image management

## 🔧 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user
- `PUT /api/v1/auth/profile` - Update profile

### Properties
- `GET /api/v1/properties` - List properties
- `POST /api/v1/properties` - Create property
- `GET /api/v1/properties/:id` - Get property details
- `PUT /api/v1/properties/:id` - Update property
- `DELETE /api/v1/properties/:id` - Delete property

### Bookings
- `GET /api/v1/bookings` - List bookings
- `POST /api/v1/bookings` - Create booking
- `PUT /api/v1/bookings/:id` - Update booking
- `DELETE /api/v1/bookings/:id` - Cancel booking

### AI Services
- `POST /api/v1/ai/pricing` - Get dynamic pricing
- `POST /api/v1/ai/message` - Generate guest messages
- `POST /api/v1/ai/market-analysis` - Market insights

### Billing
- `GET /api/v1/billing/subscription` - Get subscription
- `POST /api/v1/billing/create-subscription` - Create subscription
- `POST /api/v1/billing/cancel-subscription` - Cancel subscription

## 🔐 Security Features

- **JWT Authentication** with secure token handling
- **Password Hashing** using bcrypt
- **Rate Limiting** to prevent API abuse
- **Input Validation** with express-validator
- **Helmet.js** for security headers
- **CORS** configuration for cross-origin requests
- **Multi-tenant Data Isolation** ensures user data privacy

## 📊 Subscription Tiers

### Trial (14 days free)
- Up to 3 properties
- Basic analytics
- Email support

### Starter ($29/month)
- Up to 3 properties
- Basic analytics
- Airbnb sync
- Email support

### Professional ($79/month)
- Up to 15 properties
- AI pricing optimization
- Advanced analytics
- Team collaboration
- Priority support

### Enterprise ($199/month)
- Unlimited properties
- Custom AI models
- White-label solution
- Dedicated support
- API access

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
# Deploy to Vercel
```

### Backend (Railway/Render)
```bash
cd server
# Deploy to Railway or Render
# Make sure to set all environment variables
```

### Database (MongoDB Atlas)
- Create a MongoDB Atlas cluster
- Update `MONGODB_URI` in your environment variables
- Whitelist your server IP addresses

## 🧪 Testing

```bash
# Run backend tests
cd server
npm test

# Run frontend tests
cd client
npm test
```

## 📈 Performance Monitoring

The application includes built-in monitoring:
- API response times
- Database query performance
- Error tracking and logging
- Usage analytics for billing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- 📧 Email: support@rentalai.com
- 📚 Documentation: [docs.rentalai.com](https://docs.rentalai.com)
- 💬 Discord: [Join our community](https://discord.gg/rentalai)

## 🎉 Changelog

### v1.0.0 (Current)
- Initial release with core features
- Multi-tenant architecture
- AI-powered pricing
- Stripe integration
- Basic property and booking management

### Roadmap
- [ ] Mobile app (React Native)
- [ ] Advanced reporting dashboard
- [ ] Multi-language support
- [ ] Booking.com integration
- [ ] Advanced AI features (guest sentiment analysis)
- [ ] White-label customization