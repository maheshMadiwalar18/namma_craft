import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, ChevronRight } from 'lucide-react';
import { Suspense } from 'react';

// Eagerly loaded components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { FeaturedProducts } from './components/FeaturedProducts';
import { ArtisanSpotlight } from './components/ArtisanSpotlight';
import { TraditionalFoods } from './components/TraditionalFoods';
import { Recommendations } from './components/Recommendations';
import { CulturalMap } from './components/CulturalMap';
import { GiftBundles } from './components/GiftBundles';
import { ArtisanStory } from './components/ArtisanStory';
import { FuturePlans } from './components/FuturePlans';
import { LiveStudio } from './components/LiveStudio';
import { HumanAssistant } from './components/HumanAssistant';
import { Footer } from './components/Footer';
import { NotFound } from './components/NotFound';

// Lazy loaded components
const Marketplace = React.lazy(() => import('./components/Marketplace').then(m => ({ default: m.Marketplace })));
const ArtisanProfile = React.lazy(() => import('./components/ArtisanProfile').then(m => ({ default: m.ArtisanProfile })));
const ProductDetail = React.lazy(() => import('./components/ProductDetail').then(m => ({ default: m.ProductDetail })));
const LiveAuction = React.lazy(() => import('./components/LiveAuction').then(m => ({ default: m.LiveAuction })));
const AuctionListing = React.lazy(() => import('./components/AuctionListing').then(m => ({ default: m.AuctionListing })));
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const CreatorDashboard = React.lazy(() => import('./components/CreatorDashboard').then(m => ({ default: m.CreatorDashboard })));
const CreateAuction = React.lazy(() => import('./components/CreateAuction').then(m => ({ default: m.CreateAuction })));
const Login = React.lazy(() => import('./components/Login').then(m => ({ default: m.Login })));
const Checkout = React.lazy(() => import('./components/Checkout').then(m => ({ default: m.Checkout })));
const FoodDetail = React.lazy(() => import('./components/FoodDetail').then(m => ({ default: m.FoodDetail })));
const AddFoodItem = React.lazy(() => import('./components/AddFoodItem').then(m => ({ default: m.AddFoodItem })));
const CulturalDiscovery = React.lazy(() => import('./components/CulturalDiscovery').then(m => ({ default: m.CulturalDiscovery })));
const FestivalHome = React.lazy(() => import('./components/FestivalHome').then(m => ({ default: m.FestivalHome })));
const SellProduct = React.lazy(() => import('./components/SellProduct').then(m => ({ default: m.SellProduct })));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Hero onNavigate={navigate} />
      {/* Festival Banner */}
      <div
        className="bg-primary py-4 relative overflow-hidden group cursor-pointer"
        onClick={() => navigate('/festival-home')}
      >
        <div className="absolute inset-0 mandala-bg opacity-[0.05]" />
        <div className="container-custom relative z-10 flex items-center justify-center gap-6">
          <Sparkles className="w-5 h-5 text-accent animate-pulse" />
          <p className="text-white text-sm font-bold uppercase tracking-[0.3em]">
            Celebrate <span className="text-accent">Diwali</span> with our Exclusive Heritage Collection
          </p>
          <ChevronRight className="w-5 h-5 text-accent group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
      <CategoryGrid onNavigate={navigate} />
      <CulturalMap onNavigate={navigate} />
      <FeaturedProducts onNavigate={navigate} />
      <LiveStudio />
      <GiftBundles onNavigate={navigate} />
      <ArtisanStory onNavigate={navigate} />
      <TraditionalFoods onNavigate={navigate} />
      <ArtisanSpotlight onNavigate={navigate} />
      <FuturePlans />
      <Recommendations onNavigate={navigate} />
    </>
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper for components that still expect 'currentPage' or 'onNavigate'
  const currentPath = location.pathname.slice(1) || 'home';
  const handleNavigate = (path: string) => {
    if (path === 'home') navigate('/');
    else navigate(`/${path}`);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={handleNavigate} currentPage={currentPath} />
      <main className="flex-grow">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace onNavigate={handleNavigate} />} />
            <Route path="/artisan" element={<ArtisanProfile onNavigate={handleNavigate} />} />
            <Route path="/admin" element={<AdminDashboard onNavigate={handleNavigate} />} />
            <Route path="/creator" element={<CreatorDashboard onNavigate={handleNavigate} />} />
            <Route path="/sell-product" element={<SellProduct onNavigate={handleNavigate} />} />
            <Route path="/auction-listing" element={<AuctionListing onNavigate={handleNavigate} />} />
            <Route path="/auction" element={<LiveAuction onNavigate={handleNavigate} />} />
            <Route path="/create-auction" element={<CreateAuction onNavigate={handleNavigate} />} />
            <Route path="/login" element={<Login onNavigate={handleNavigate} initialMode="login" />} />
            <Route path="/signup" element={<Login onNavigate={handleNavigate} initialMode="signup" />} />
            <Route path="/checkout" element={<Checkout onNavigate={handleNavigate} />} />
            <Route path="/food-detail" element={<FoodDetail onNavigate={handleNavigate} />} />
            <Route path="/add-food" element={<AddFoodItem onNavigate={handleNavigate} />} />
            <Route path="/discovery" element={<CulturalDiscovery onNavigate={handleNavigate} />} />
            <Route path="/festival-home" element={<FestivalHome onNavigate={handleNavigate} />} />
            <Route path="/product/:id" element={<ProductDetail onNavigate={handleNavigate} />} />
            {/* Default fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer onNavigate={handleNavigate} />
      <HumanAssistant />
    </div>
  );
}
