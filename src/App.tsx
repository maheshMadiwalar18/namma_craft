import React from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { FeaturedProducts } from './components/FeaturedProducts';
import { ArtisanSpotlight } from './components/ArtisanSpotlight';
import { TraditionalFoods } from './components/TraditionalFoods';
import { Recommendations } from './components/Recommendations';
import { Marketplace } from './components/Marketplace';
import { ArtisanProfile } from './components/ArtisanProfile';
import { ProductDetail } from './components/ProductDetail';
import { LiveAuction } from './components/LiveAuction';
import { AuctionListing } from './components/AuctionListing';
import { AdminDashboard } from './components/AdminDashboard';
import { CreatorDashboard } from './components/CreatorDashboard';
import { CreateAuction } from './components/CreateAuction';
import { Login } from './components/Login';
import { Checkout } from './components/Checkout';
import { FoodDetail } from './components/FoodDetail';
import { AddFoodItem } from './components/AddFoodItem';
import { CulturalDiscovery } from './components/CulturalDiscovery';
import { FestivalHome } from './components/FestivalHome';
import { ArtisanStory } from './components/ArtisanStory';
import { CulturalMap } from './components/CulturalMap';
import { GiftBundles } from './components/GiftBundles';
import { FuturePlans } from './components/FuturePlans';
import { Footer } from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = React.useState('home');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      <main className="flex-grow">
        {currentPage === 'home' ? (
          <>
            <Hero onNavigate={setCurrentPage} />
            {/* Festival Banner */}
            <div className="bg-primary py-4 relative overflow-hidden group cursor-pointer" onClick={() => setCurrentPage('festival-home')}>
              <div className="absolute inset-0 mandala-bg opacity-[0.05]" />
              <div className="container-custom relative z-10 flex items-center justify-center gap-6">
                <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                <p className="text-white text-sm font-bold uppercase tracking-[0.3em]">
                  Celebrate <span className="text-accent">Diwali</span> with our Exclusive Heritage Collection
                </p>
                <ChevronRight className="w-5 h-5 text-accent group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
            <CategoryGrid onNavigate={setCurrentPage} />
            <CulturalMap onNavigate={setCurrentPage} />
            <FeaturedProducts onNavigate={setCurrentPage} />
            <GiftBundles onNavigate={setCurrentPage} />
            <ArtisanStory onNavigate={setCurrentPage} />
            <TraditionalFoods onNavigate={setCurrentPage} />
            <ArtisanSpotlight onNavigate={setCurrentPage} />
            <FuturePlans />
            <Recommendations onNavigate={setCurrentPage} />
          </>
        ) : currentPage === 'marketplace' ? (
          <Marketplace onNavigate={setCurrentPage} />
        ) : currentPage === 'artisan' ? (
          <ArtisanProfile onNavigate={setCurrentPage} />
        ) : currentPage === 'admin' ? (
          <AdminDashboard onNavigate={setCurrentPage} />
        ) : currentPage === 'creator' ? (
          <CreatorDashboard onNavigate={setCurrentPage} />
        ) : currentPage === 'auction-listing' ? (
          <AuctionListing onNavigate={setCurrentPage} />
        ) : currentPage === 'auction' ? (
          <LiveAuction onNavigate={setCurrentPage} />
        ) : currentPage === 'create-auction' ? (
          <CreateAuction onNavigate={setCurrentPage} />
        ) : currentPage === 'login' ? (
          <Login onNavigate={setCurrentPage} />
        ) : currentPage === 'checkout' ? (
          <Checkout onNavigate={setCurrentPage} />
        ) : currentPage === 'food-detail' ? (
          <FoodDetail onNavigate={setCurrentPage} />
        ) : currentPage === 'add-food' ? (
          <AddFoodItem onNavigate={setCurrentPage} />
        ) : currentPage === 'discovery' ? (
          <CulturalDiscovery onNavigate={setCurrentPage} />
        ) : currentPage === 'festival-home' ? (
          <FestivalHome onNavigate={setCurrentPage} />
        ) : (
          <ProductDetail onNavigate={setCurrentPage} />
        )}
      </main>
      <Footer />
    </div>
  );
}
