import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { FeaturedProducts } from './components/FeaturedProducts';
import { ArtisanSpotlight } from './components/ArtisanSpotlight';
import { Recommendations } from './components/Recommendations';
import { Marketplace } from './components/Marketplace';
import { ArtisanProfile } from './components/ArtisanProfile';
import { ProductDetail } from './components/ProductDetail';
import { LiveAuction } from './components/LiveAuction';
import { AuctionListing } from './components/AuctionListing';
import { AdminDashboard } from './components/AdminDashboard';
import { CreatorDashboard } from './components/CreatorDashboard';
import { CreateAuction } from './components/CreateAuction';
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
            <CategoryGrid onNavigate={setCurrentPage} />
            <FeaturedProducts onNavigate={setCurrentPage} />
            <ArtisanSpotlight onNavigate={setCurrentPage} />
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
        ) : (
          <ProductDetail onNavigate={setCurrentPage} />
        )}
      </main>
      <Footer />
    </div>
  );
}
