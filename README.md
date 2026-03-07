<div align="center">

<img src="./logo.png" alt="NammaCraft Logo" width="150" />

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Lato&size=18&duration=3000&pause=800&color=6B7280&center=true&vCenter=true&width=700&height=40&lines=Empowering+Indian+artisans+with+a+premium+digital+marketplace;Where+tradition+meets+technology" alt="Tagline" />

<br/><br/>

[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[![Firebase](https://img.shields.io/badge/Firebase_12-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express_4-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Google Gemini](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-In_Development-orange?style=for-the-badge)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)](CONTRIBUTING.md)

<br/>

> **NammaCraft** is a full-stack, AI-powered artisan marketplace that bridges India's centuries-old craft traditions with the modern digital economy. Buyers discover authentic handmade goods; artisans gain a voice, a storefront, and fair pricing — powered by Gemini AI.

<br/>

---

</div>

## 📸 Platform Preview

> *A premium artisan goods marketplace with cultural discovery, live auctions, AI-assisted pricing, and regional craft maps — built for India's 7 million+ craft artisans.*

---

## ✨ Feature Highlights

### 🏛️ Cultural Discovery Engine
Explore crafts by region using an **interactive D3.js cultural map** of India. Filter by state, craft type, and artisan story. Every product is tied to its origin — not just a SKU.

### 🔨 Live Auction System
Real-time bidding interface with countdown timers, watcher counts, outbid alerts, and an animated bid stream. Supports auction creation, management, and winner resolution.

### 🤖 AI-Powered Features
- **Voice Listing (Gemini AI)** — Artisans describe their product by voice in any language; Gemini extracts structured product data automatically.
- **AI Pricing Intelligence** — Market-aware price range suggestions with demand scoring.
- **Human-style AI Assistant** — A conversational Gemini-powered chat assistant embedded sitewide.

### 🛍️ Complete Buyer Experience
Full cart → checkout → order tracking flow. Personalized product recommendations, wishlist/favorites, cultural gift bundles, and handwritten notes on orders.

### 🎨 Multi-Role Dashboard System
| Role | Dashboard | Capabilities |
|------|-----------|--------------|
| **Buyer** | Home + Marketplace | Browse, cart, wishlist, checkout |
| **Artisan/Creator** | Creator Dashboard | List products, manage auctions, track sales |
| **Admin** | Admin Dashboard | Monitor bids, manage users, revenue analytics |

### 🎪 Festival & Cultural Commerce
Seasonal festival homepages (Diwali, etc.), authenticity certificates, traditional food marketplace, and artisan story spotlights.

---

## 🏗️ Architecture Overview

```
namma_craft/
├── 📁 src/
│   ├── App.tsx                  # Route definitions (React Router v7)
│   ├── AuthContext.tsx          # Firebase Auth + MongoDB user sync
│   ├── db.ts                   # Frontend API service (REST → Express)
│   ├── firebase.ts             # Firebase app init (Auth + Firestore)
│   ├── index.css               # Global styles + Tailwind v4 theme
│   └── components/
│       ├── AdminDashboard.tsx   # Analytics, user/auction management
│       ├── CreatorDashboard.tsx # Artisan storefront & earnings
│       ├── LiveAuction.tsx      # Real-time bidding UI
│       ├── AuctionListing.tsx   # Auction browse/filter
│       ├── CreateAuction.tsx    # Auction creation wizard
│       ├── Marketplace.tsx      # Product browse + filters
│       ├── ProductDetail.tsx    # PDP with authenticity cert
│       ├── ArtisanProfile.tsx   # Public artisan page
│       ├── Checkout.tsx         # Shipping + payment + tracking
│       ├── CulturalMap.tsx      # D3.js India regional map
│       ├── CulturalDiscovery.tsx # Cultural exploration page
│       ├── TraditionalFoods.tsx # Traditional food section
│       ├── FestivalHome.tsx     # Seasonal festival pages
│       ├── VoiceAssistant.tsx   # Gemini voice → product form
│       ├── AIPricingPanel.tsx   # AI price suggestion widget
│       ├── HumanAssistant.tsx   # Sitewide Gemini chat widget
│       ├── GiftBundles.tsx      # Curated gift sets
│       ├── SellProduct.tsx      # Artisan product listing form
│       ├── CartSidebar.tsx      # Slide-out cart
│       └── ...                  # 35+ components total
│
├── 📁 server/
│   ├── index.ts                 # Express app + all API routes
│   └── models/
│       ├── User.ts              # Mongoose User schema
│       ├── Product.ts           # Mongoose Product schema
│       ├── Order.ts             # Mongoose Order schema
│       ├── Cart.ts              # Mongoose Cart schema
│       └── Favorite.ts          # Mongoose Favorites schema
│
├── 📁 public/images/            # Static craft photography assets
├── vite.config.ts               # Vite + Tailwind v4 config
├── firebase.json                # Firebase Hosting config
├── netlify.toml                 # Netlify deploy config
└── package.json
```

---

## 🧰 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.0 | UI framework |
| **TypeScript** | 5.8 | Type safety |
| **Vite** | 6.2 | Build tool & dev server |
| **Tailwind CSS** | v4.1 | Utility-first styling |
| **React Router** | v7 | Client-side routing |
| **Framer Motion** | 12 | Animations & transitions |
| **Recharts** | 3.7 | Dashboard charts |
| **D3.js** | 7.9 | Cultural map visualization |
| **Lucide React** | 0.546 | Icon system |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Express** | 4.21 | REST API server |
| **Mongoose** | 9.2 | MongoDB ODM |
| **MongoDB Atlas** | — | Primary database |
| **tsx** | 4.21 | TypeScript execution |

### Auth & Cloud
| Technology | Purpose |
|------------|---------|
| **Firebase Auth** | Google OAuth sign-in |
| **Firebase Firestore** | Realtime data (supplemental) |
| **Firebase Hosting** | Static hosting option |
| **Google Gemini AI** | Voice listing, pricing AI, chat assistant |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Firebase project
- Google Gemini API key

### 1. Clone & Install
```bash
git clone https://github.com/mahi-2-ron/namma_craft.git
cd namma_craft
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root:
```env
# Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# MongoDB
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/nammacraft

# Server
PORT=5000
```

> ⚠️ **Never commit `.env` to version control.** See [Security Notes](#-security-notes) below.

### 3. Firebase Setup
Update `src/firebase.ts` with your own Firebase project credentials from the [Firebase Console](https://console.firebase.google.com/).

### 4. Run Development Servers

**Option A — Run both together (Windows)**
```bash
start_all.bat
```

**Option B — Run separately**
```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend API
npm run server
```

Frontend runs on → `http://localhost:3000`  
Backend API runs on → `http://localhost:5000`

### 5. Build for Production
```bash
npm run build
```
Deploy the `dist/` folder to Firebase Hosting or Netlify (configs included).

---

## 📡 API Reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Server + DB status |
| `POST` | `/users` | Create/update user after sign-in |
| `GET` | `/users/:uid` | Get user profile |
| `GET` | `/products` | List all products |
| `GET` | `/products/:id` | Get single product |
| `POST` | `/products` | Add a new product |
| `PUT` | `/products/:id` | Update product |
| `DELETE` | `/products/:id` | Delete product |
| `POST` | `/orders` | Place an order |
| `GET` | `/orders/user/:userId` | Get user's orders |
| `PATCH` | `/orders/:id/status` | Update order status |
| `POST` | `/cart` | Add/update cart item |
| `GET` | `/cart/:userId` | Get cart items |
| `DELETE` | `/cart/:userId/:productId` | Remove cart item |
| `DELETE` | `/cart/:userId` | Clear cart |
| `POST` | `/favorites` | Add to favorites |
| `DELETE` | `/favorites/:userId/:productId` | Remove favorite |
| `GET` | `/favorites/:userId` | Get user favorites |

---

## 🗺️ Application Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Home` | Landing page with all sections |
| `/marketplace` | `Marketplace` | Product browse + filters |
| `/artisan` | `ArtisanProfile` | Artisan public profile |
| `/product/:id` | `ProductDetail` | Product detail page |
| `/auction` | `LiveAuction` | Live bidding room |
| `/auction-listing` | `AuctionListing` | Browse auctions |
| `/create-auction` | `CreateAuction` | Create new auction |
| `/creator` | `CreatorDashboard` | Artisan seller dashboard |
| `/sell-product` | `SellProduct` | New product listing form |
| `/admin` | `AdminDashboard` | Admin analytics |
| `/checkout` | `Checkout` | Order & payment flow |
| `/discovery` | `CulturalDiscovery` | Cultural exploration |
| `/festival-home` | `FestivalHome` | Festival landing page |
| `/food-detail` | `FoodDetail` | Traditional food detail |
| `/add-food` | `AddFoodItem` | Add traditional food |
| `/login` | `Login` | Sign in |
| `/signup` | `Login` | Sign up |

---

## 🔒 Security Notes

> These are important considerations for production deployment.

- **Environment Variables**: Firebase config and Gemini API key must be stored in `.env` — never hardcoded in source files.
- **CORS**: The backend should be configured with an explicit allowed-origin list rather than a wildcard in production.
- **Route Protection**: Admin and Creator routes should be wrapped with role-based authentication guards before going live.
- **API Security**: All write endpoints (`POST`, `PUT`, `DELETE`) should validate Firebase JWT tokens server-side before processing requests.
- **Input Validation**: Server routes should validate and sanitize incoming request bodies before database operations.

---

## 🔮 Roadmap

- [ ] Real-time WebSocket auction bidding (Socket.io)
- [ ] Payment gateway integration (Razorpay)
- [ ] Mobile app (React Native)
- [ ] Artisan video stories
- [ ] Multi-language support (Hindi, Kannada, Tamil, Bengali)
- [ ] Blockchain-backed authenticity certificates
- [ ] AR product preview
- [ ] Artisan co-operative group stores
- [ ] International shipping integrations

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

<br/>

**Built with ❤️ to preserve India's artisan heritage by TeamSUPRA**

<br/>

[![GitHub stars](https://img.shields.io/github/stars/mahi-2-ron/namma_craft?style=social)](https://github.com/mahi-2-ron/namma_craft)
[![GitHub forks](https://img.shields.io/github/forks/mahi-2-ron/namma_craft?style=social)](https://github.com/mahi-2-ron/namma_craft/fork)

<br/>

*"Every craft tells a story. NammaCraft makes sure it's heard."*

</div>
