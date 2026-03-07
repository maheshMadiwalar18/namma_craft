import React, { useState } from 'react';
import { Search, ChevronDown, Filter, X, ShoppingBag, Heart, ChevronRight, Utensils, Leaf } from 'lucide-react';
import { ProductCard } from './FeaturedProducts';
import { motion, AnimatePresence } from 'motion/react';
import { useToast } from '../ToastContext';

const craftCategories = ['All', 'Pottery', 'Textiles', 'Woodwork', 'Jewelry', 'Paintings'];
const foodCategories = ['All', 'Sweets', 'Savories', 'Spices', 'Pickles', 'Beverages'];
const regions = ['All India', 'Jaipur, Rajasthan', 'Varanasi, UP', 'Kutch, Gujarat', 'Bhubaneswar, Odisha', 'Mysore, Karnataka'];
const foodSpecialties = ['All', 'Homemade', 'Festival Special', 'Organic', 'Vegan'];

const FoodCard = ({ image, name, creator, price, region, tag, onNavigate }: any) => {
  const { showToast } = useToast();
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onNavigate && onNavigate('food-detail')}
      className="group cursor-pointer relative bg-white rounded-[20px] sm:rounded-[32px] p-2 sm:p-4 shadow-sm hover:shadow-premium transition-all duration-500 border border-highlight/10"
    >
      <div className="relative aspect-[4/5] rounded-[16px] sm:rounded-[24px] overflow-hidden mb-3 sm:mb-6">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          <span className="badge-indian shadow-lg backdrop-blur-md bg-white/80 border-white/50 text-[10px]">
            {region}
          </span>
          <span className="badge-indian !bg-accent/90 !text-white border-none text-[9px] shadow-lg flex items-center gap-1">
            <Utensils className="w-2 h-2" /> {tag}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
            showToast(isLiked ? 'Removed from favorites' : 'Added to favorites');
          }}
          className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-full hover:bg-white transition-all z-10 shadow-lg hover:scale-110"
        >
          <Heart className={`w-4 h-4 transition-colors ${isLiked ? 'fill-accent text-accent' : 'text-primary'}`} />
        </button>

        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <button
            onClick={(e) => {
              e.stopPropagation();
              showToast('Added to your cart!');
            }}
            className="w-full btn-primary !py-3 text-xs flex items-center justify-center gap-2 shadow-xl"
          >
            <ShoppingBag className="w-4 h-4" /> Add to Cart
          </button>
        </div>
      </div>

      <div className="px-2 pb-2 space-y-2">
        <div className="flex justify-between items-start gap-1 sm:gap-2">
          <h3 className="text-sm sm:text-xl font-display font-bold text-primary leading-tight group-hover:text-accent transition-colors truncate">{name}</h3>
        </div>
        <p className="text-[10px] sm:text-sm text-text-soft font-medium flex items-center gap-1 sm:gap-2 italic">
          <span className="w-3 sm:w-4 h-[1px] bg-accent/30" />
          By {creator}
        </p>
        <div className="flex justify-between items-center pt-2">
          <span className="text-base sm:text-2xl font-display font-bold text-primary">₹{price.toLocaleString()}</span>
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-highlight/20 flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-all">
            <ChevronRight className="w-3 h-3 sm:w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Marketplace = ({ onNavigate }: any) => {
  const [activeTab, setActiveTab] = useState<'crafts' | 'foods'>('crafts');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(5000);

  const craftProducts = [
    // Pottery
    { id: 101, name: 'Hand-Painted Blue Pottery Vase', artisan: 'Ananya Sharma', price: 2450, region: 'Jaipur, Rajasthan', image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800', rarity: 'Rare', stock: 5, category: 'Pottery', material: 'Clay' },
    { id: 102, name: 'Terracotta Clay Handi', artisan: 'Kavita Devi', price: 850, region: 'Gorakhpur, UP', image: 'https://images.unsplash.com/photo-1594911776231-97063cc73841?auto=format&fit=crop&q=80&w=800', rarity: 'Common', stock: 20, category: 'Pottery', material: 'Clay' },
    { id: 103, name: 'Nizamabad Black Pottery', artisan: 'Rajesh Prajapati', price: 1800, region: 'Azamgarh, UP', image: 'https://images.unsplash.com/photo-1605153864431-a2795a1b2f95?auto=format&fit=crop&q=80&w=800', rarity: 'Rare', stock: 3, category: 'Pottery', material: 'Clay' },
    { id: 104, name: 'Studio Pottery Dinner Set', artisan: 'Sujata Singh', price: 4200, region: 'Auroville, TN', image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800', rarity: 'Limited Edition', stock: 2, category: 'Pottery', material: 'Clay' },
    { id: 105, name: 'Khurja Flower Pot', artisan: 'Om Prakash', price: 1200, region: 'Khurja, UP', image: 'https://images.unsplash.com/photo-1520408222757-6f9f95d87d5d?auto=format&fit=crop&q=80&w=800', rarity: 'Common', stock: 15, category: 'Pottery', material: 'Clay' },

    // Textiles
    { id: 106, name: 'Banarasi Silk Stole', artisan: 'Rajesh Kumar', price: 4500, region: 'Varanasi, UP', image: 'https://images.unsplash.com/photo-1610030469668-384358896f60?auto=format&fit=crop&q=80&w=800', rarity: 'Limited Edition', stock: 2, category: 'Textiles', material: 'Silk' },
    { id: 107, name: 'Sanganeri Block Print Cushion', artisan: 'Suresh Meena', price: 850, region: 'Jaipur, Rajasthan', image: 'https://images.unsplash.com/photo-1584101015761-07520791551c?auto=format&fit=crop&q=80&w=800', rarity: 'Common', stock: 25, category: 'Textiles', material: 'Cotton' },
    { id: 108, name: 'Lucknowi Chikankari Kurta', artisan: 'Fatima Begum', price: 3200, region: 'Lucknow, UP', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800', rarity: 'Rare', stock: 5, category: 'Textiles', material: 'Cotton' },
    { id: 109, name: 'Phulkari Embroidered Dupatta', artisan: 'Gurpreet Kaur', price: 2100, region: 'Amritsar, PB', image: 'https://images.unsplash.com/photo-1621640422137-9755f7c32b5d?auto=format&fit=crop&q=80&w=800', rarity: 'Common', stock: 10, category: 'Textiles', material: 'Cotton' },
    { id: 110, name: 'Hand-Knotted Woolen Carpet', artisan: 'Mohammad Aziz', price: 12500, region: 'Bhadohi, UP', image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800', rarity: 'One-of-a-kind', stock: 1, category: 'Textiles', material: 'Silk' },

    // Woodwork
    { id: 111, name: 'Teak Wood Wall Carving', artisan: 'Vikram Singh', price: 3200, region: 'Saharanpur, UP', image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=800', rarity: 'One-of-a-kind', stock: 1, category: 'Woodwork', material: 'Teak Wood' },
    { id: 112, name: 'Channapatna Wooden Toys', artisan: 'Lokesh Gowda', price: 450, region: 'Karnataka', image: 'https://images.unsplash.com/photo-1510257321685-1d6367f0f631?auto=format&fit=crop&q=80&w=800', rarity: 'Common', stock: 50, category: 'Woodwork', material: 'Teak Wood' },
    { id: 113, name: 'Kashmiri Walnut Wood Box', artisan: 'Bashir Ahmed', price: 1650, region: 'Srinagar, J&K', image: 'https://images.unsplash.com/photo-1606103920295-9a091573f160?auto=format&fit=crop&q=80&w=800', rarity: 'Rare', stock: 8, category: 'Woodwork', material: 'Teak Wood' },
    { id: 114, name: 'Sheesham Wood Inlay Table', artisan: 'Irshad Khan', price: 8500, region: 'Hoshiarpur, PB', image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=800', rarity: 'Limited Edition', stock: 3, category: 'Woodwork', material: 'Teak Wood' },
    { id: 115, name: 'Traditional Masala Box', artisan: 'Ram Singh', price: 1200, region: 'Jodhpur, Rajasthan', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd05ed?auto=format&fit=crop&q=80&w=800', rarity: 'Common', stock: 12, category: 'Woodwork', material: 'Teak Wood' },

    // Jewelry
    { id: 116, name: 'Meenakari Enamel Jhumkas', artisan: 'Priya Das', price: 1800, region: 'Bikaner, Rajasthan', image: 'https://images.unsplash.com/photo-1595303526913-c7037797ebe7?auto=format&fit=crop&q=80&w=800', rarity: 'Common', stock: 12, category: 'Jewelry', material: 'Brass' },
    { id: 117, name: 'Silver Filigree Necklace', artisan: 'Subir Das', price: 4500, region: 'Cuttack, Odisha', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800', rarity: 'Rare', stock: 4, category: 'Jewelry', material: 'Brass' },
    { id: 118, name: 'Dokra Brass Bangles', artisan: 'Sunita Murmu', price: 1200, region: 'Bastar, Chhattisgarh', image: 'https://images.unsplash.com/photo-1611085583191-a3b13b24424a?auto=format&fit=crop&q=80&w=800', rarity: 'Limited Edition', stock: 6, category: 'Jewelry', material: 'Brass' },
    { id: 119, name: 'Temple Jewelry Set', artisan: 'Muthu Kumar', price: 7500, region: 'Madurai, TN', image: 'https://images.unsplash.com/photo-1602143307185-84e6ca2a9b44?auto=format&fit=crop&q=80&w=800', rarity: 'Rare', stock: 3, category: 'Jewelry', material: 'Brass' },
    { id: 120, name: 'Kundan Bride Bangle', artisan: 'Sanjay Jain', price: 3800, region: 'Jaipur, Rajasthan', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800', rarity: 'Limited Edition', stock: 5, category: 'Jewelry', material: 'Brass' },

    // Paintings
    { id: 121, name: 'Madhubani Tree of Life', artisan: 'Sita Devi', price: 2800, region: 'Mithila, Bihar', image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800', rarity: 'Rare', stock: 4, category: 'Paintings', material: 'Cotton' },
    { id: 122, name: 'Tanjore Gold Leaf Art', artisan: 'Venkatesh S.', price: 9500, region: 'Tanjore, TN', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800', rarity: 'One-of-a-kind', stock: 1, category: 'Paintings', material: 'Silk' },
    { id: 123, name: 'Pattachitra Scroll Painting', artisan: 'Bijay Das', price: 3500, region: 'Raghurajpur, Odisha', image: 'https://images.unsplash.com/photo-1574914629385-46448b767aec?auto=format&fit=crop&q=80&w=800', rarity: 'Limited Edition', stock: 3, category: 'Paintings', material: 'Silk' },
    { id: 124, name: 'Warli Tribal Wall Art', artisan: 'Sakharam Jhopra', price: 1500, region: 'Palghar, Maharashtra', image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=800', rarity: 'Common', stock: 10, category: 'Paintings', material: 'Cotton' },
    { id: 125, name: 'Pichwai Lotus Serenity', artisan: 'Gopal Joshi', price: 5500, region: 'Nathdwara, Rajasthan', image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800', rarity: 'Rare', stock: 2, category: 'Paintings', material: 'Cotton' },
  ];

  const foodProducts = [
    // Sweets
    { id: 1, name: 'Authentic Mysore Pak', creator: 'Lakshmi Devi', price: 450, region: 'Mysore, Karnataka', tag: 'Homemade', image: '/images/food/mysore-pak.png', category: 'Sweets' },
    { id: 2, name: 'Rajasthani Ghevar', creator: 'Shanti Devi', price: 650, region: 'Jaipur, Rajasthan', tag: 'Festival Special', image: '/images/food/ghevar.png', category: 'Sweets' },
    { id: 3, name: 'Premium Kaju Katli', creator: 'Brijwasi Sweets', price: 850, region: 'Mathura, UP', tag: 'Specialty', image: '/images/food/kaju-katli.png', category: 'Sweets' },
    { id: 4, name: 'Spongy Bengali Rasgulla', creator: 'Das & Sons', price: 350, region: 'Kolkata, WB', tag: 'Homemade', image: '/images/food/rasgulla.png', category: 'Sweets' },
    { id: 5, name: 'Warm Gulab Jamun (1kg)', creator: 'Annapurna', price: 420, region: 'Banaras, UP', tag: 'Festival Special', image: '/images/food/gulab-jamun.png', category: 'Sweets' },

    // Savories
    { id: 6, name: 'Malabar Parotta (Pack of 5)', creator: 'Mariam Beevi', price: 180, region: 'Kozhikode, Kerala', tag: 'Homemade', image: '/images/food/parotta.png', category: 'Savories' },
    { id: 7, name: 'Hand-Pounded Red Rice', creator: 'Suresh Gowda', price: 240, region: 'Coorg, Karnataka', tag: 'Organic', image: '/images/food/redrice.png', category: 'Savories' },
    { id: 8, name: 'Crunchy Rice Murukku', creator: 'Meenakshi Amma', price: 220, region: 'Madurai, TN', tag: 'Homemade', image: '/images/food/murukku.png', category: 'Savories' },
    { id: 9, name: 'Kerala Banana Chips', creator: 'Kuttanad Store', price: 150, region: 'Thrissur, Kerala', tag: 'Homemade', image: '/images/food/banana-chips.png', category: 'Savories' },
    { id: 10, name: 'Traditional Indori Poha', creator: 'Mama Ka Poha', price: 120, region: 'Indore, MP', tag: 'Specialty', image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80&w=800', category: 'Savories' },

    // Spices
    { id: 11, name: 'Organic Lakadong Turmeric', creator: 'Kong Mary', price: 320, region: 'Jaintia Hills, Meghalaya', tag: 'Organic', image: '/images/food/turmeric.png', category: 'Spices' },
    { id: 12, name: 'Kashmiri Saffron (1g)', creator: 'Bilal Ahmad', price: 450, region: 'Pampore, J&K', tag: 'Specialty', image: '/images/food/saffron.png', category: 'Spices' },
    { id: 13, name: 'Tellicherry Black Pepper', creator: 'Thomas Chacko', price: 380, region: 'Wayanad, Kerala', tag: 'Organic', image: '/images/food/pepper.png', category: 'Spices' },
    { id: 14, name: 'Grade A Green Cardamom', creator: 'Idukki Farmers', price: 550, region: 'Idukki, Kerala', tag: 'Organic', image: '/images/food/cardamom.png', category: 'Spices' },
    { id: 15, name: 'Whole Organic Cloves', creator: 'Hill Spices', price: 290, region: 'Kanyakumari, TN', tag: 'Organic', image: '/images/food/clove.png', category: 'Spices' },

    // Pickles
    { id: 16, name: 'Spicy Mango Pickle', creator: 'Amma\'s Kitchen', price: 150, region: 'Guntur, AP', tag: 'Homemade', image: '/images/food/pickle.png', category: 'Pickles' },
    { id: 17, name: 'Grandma’s Lemon Pickle', creator: 'Usha Rani', price: 140, region: 'Nagpur, MH', tag: 'Homemade', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800', category: 'Pickles' },
    { id: 18, name: 'Andhra Garlic Pickle', creator: 'Guntur Spice', price: 180, region: 'Vijayawada, AP', tag: 'Homemade', image: 'https://images.unsplash.com/photo-1601050633647-8f8f17a940f3?auto=format&fit=crop&q=80&w=800', category: 'Pickles' },
    { id: 19, name: 'North Indian Mixed Veg', creator: 'Dadi Maa', price: 165, region: 'Amritsar, PB', tag: 'Homemade', image: 'https://images.unsplash.com/photo-1544782707-170c6bc229c1?auto=format&fit=crop&q=80&w=800', category: 'Pickles' },
    { id: 20, name: 'Sweet & Sour Ginger Pickle', creator: 'Priya Foods', price: 155, region: 'Hyderabad, TS', tag: 'Homemade', image: 'https://images.unsplash.com/photo-1599940859674-a76ce63aa40c?auto=format&fit=crop&q=80&w=800', category: 'Pickles' },

    // Beverages
    { id: 21, name: 'Darjeeling First Flush Tea', creator: 'Tenzing Norgay', price: 850, region: 'Darjeeling, WB', tag: 'Specialty', image: '/images/food/tea.png', category: 'Beverages' },
    { id: 22, name: 'Kumbakonam Degree Coffee', creator: 'Ranganathan', price: 340, region: 'Thanjavur, TN', tag: 'Specialty', image: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&q=80&w=800', category: 'Beverages' },
    { id: 23, name: 'Royal Masala Chai Blend', creator: 'Varanasi Tea', price: 280, region: 'Varanasi, UP', tag: ' स्पेशल', image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&q=80&w=800', category: 'Beverages' },
    { id: 24, name: 'Traditional Kokum Sharbat', creator: 'Konkan Coast', price: 190, region: 'Ratnagiri, MH', tag: 'specialty', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800', category: 'Beverages' },
    { id: 25, name: 'Banaras Thandai Mix', creator: 'Kashi Flavors', price: 320, region: 'Varanasi, UP', tag: 'Festival Special', image: 'https://images.unsplash.com/photo-1567129937968-cdad8f0d5a3a?auto=format&fit=crop&q=80&w=800', category: 'Beverages' },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const toggleMaterial = (material: string) => {
    setCurrentPage(1); // Reset to first page when filtering
    setSelectedMaterials(prev =>
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  const activeProducts = (activeTab === 'crafts' ? craftProducts : foodProducts).filter((p: any) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.artisan?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.creator?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.region?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;

    const matchesMaterial = selectedMaterials.length === 0 ||
      (activeTab === 'crafts'
        ? selectedMaterials.some(m => p.material?.includes(m) || p.name.includes(m))
        : selectedMaterials.some(m => p.tag === m));

    return matchesSearch && matchesCategory && matchesMaterial && p.price <= priceRange;
  });

  const totalPages = Math.ceil(activeProducts.length / itemsPerPage);
  const paginatedProducts = activeProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const activeCategories = activeTab === 'crafts' ? craftCategories : foodCategories;

  return (
    <div className="bg-cream min-h-screen mandala-bg">
      <div className="container-custom py-20">
        <div className="mb-16 text-center">
          <h1 className="text-primary mb-4">The Marketplace</h1>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-accent/30" />
            <div className="text-accent">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C12 22 16 18 16 12C16 6 12 4 12 4C12 4 8 6 8 12C8 18 12 22 12 22Z" />
              </svg>
            </div>
            <div className="h-[1px] w-12 bg-accent/30" />
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/50 backdrop-blur-md p-1.5 rounded-[24px] border border-primary/5 flex gap-2">
              <button
                onClick={() => { setActiveTab('crafts'); setSelectedCategory('All'); setCurrentPage(1); }}
                className={`px-10 py-3 rounded-[20px] text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'crafts' ? 'bg-primary text-white shadow-lg' : 'text-text-soft hover:text-primary'
                  }`}
              >
                Handmade Crafts
              </button>
              <button
                onClick={() => { setActiveTab('foods'); setSelectedCategory('All'); setCurrentPage(1); }}
                className={`px-10 py-3 rounded-[20px] text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'foods' ? 'bg-primary text-white shadow-lg' : 'text-text-soft hover:text-primary'
                  }`}
              >
                Traditional Foods
              </button>
            </div>
          </div>

          <p className="text-text-soft max-w-2xl mx-auto text-lg">
            {activeTab === 'crafts'
              ? 'Browse our curated collection of authentic Indian crafts, direct from the hands of master artisans.'
              : 'Discover homemade delicacies and regional specialties crafted using traditional recipes.'}
          </p>
        </div>

        {/* Top Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12 bg-white/40 backdrop-blur-sm p-4 rounded-3xl border border-primary/5">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder={`Search by ${activeTab === 'crafts' ? 'craft' : 'food'}, region or creator...`}
              className="search-bar w-full pl-12 pr-6 !h-[50px] !bg-white/60"
            />
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden flex items-center gap-2 btn-secondary !py-2.5 !px-6 text-sm"
            >
              <Filter className="w-4 h-4" /> Filters
            </button>

            <div className="relative flex-1 lg:flex-none">
              <select className="w-full appearance-none input-field !py-3 pl-6 pr-12 text-sm font-bold text-primary cursor-pointer !bg-white/60">
                <option>Sort by: Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-12">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-28 space-y-12">
              {/* Category */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Category</h4>
                <div className="space-y-3">
                  {activeCategories.map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === cat}
                          onChange={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                          className="peer appearance-none w-5 h-5 rounded-full border-2 border-primary/10 checked:border-accent transition-all"
                        />
                        <div className="absolute w-2 h-2 rounded-full bg-accent opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-[15px] text-text-soft group-hover:text-primary transition-colors font-medium">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Price Range</h4>
                <input
                  type="range"
                  min="0"
                  max={activeTab === 'crafts' ? 10000 : 2000}
                  value={priceRange}
                  onChange={(e) => { setPriceRange(parseInt(e.target.value)); setCurrentPage(1); }}
                  className="w-full accent-accent h-1.5 bg-primary/5 rounded-full appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-4 text-sm font-bold text-primary">
                  <span>₹0</span>
                  <span className="text-accent">₹{priceRange}</span>
                </div>
              </div>

              {/* Region */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Region</h4>
                <div className="relative">
                  <select className="w-full appearance-none input-field !py-3 pl-5 pr-12 text-sm font-bold text-primary cursor-pointer !bg-white/60">
                    {regions.map(region => (
                      <option key={region}>{region}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft pointer-events-none" />
                </div>
              </div>

              {/* Specialty / Materials */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">
                  {activeTab === 'crafts' ? 'Material' : 'Specialty'}
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {(activeTab === 'crafts' ? ['Clay', 'Teak Wood', 'Silk', 'Brass', 'Cotton'] : foodSpecialties).map(tag => (
                    <label key={tag} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(tag)}
                        onChange={() => toggleMaterial(tag)}
                        className="w-5 h-5 rounded border-2 border-primary/10 text-accent focus:ring-accent/20 transition-all cursor-pointer"
                      />
                      <span className="text-[15px] text-text-soft group-hover:text-primary transition-colors font-medium">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sell CTA */}
              <div className="bg-primary p-8 rounded-[32px] text-cream relative overflow-hidden">
                <div className="absolute inset-0 mandala-bg opacity-[0.05] pointer-events-none" />
                <div className="relative z-10">
                  <h4 className="font-display font-bold text-lg mb-4">Are you an Artisan?</h4>
                  <p className="text-xs text-cream/60 mb-6 leading-relaxed">
                    Join our community of master creators and share your heritage with the world.
                  </p>
                  <button
                    onClick={() => onNavigate('sell-product')}
                    className="w-full btn-accent !py-2.5 !px-4 text-[10px] uppercase tracking-widest"
                  >
                    Start Selling
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
              {paginatedProducts.map(product => (
                activeTab === 'crafts'
                  ? <ProductCard key={product.id} {...product} onNavigate={onNavigate} />
                  : <FoodCard key={product.id} {...product} onNavigate={onNavigate} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-20 flex justify-center items-center gap-4">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-12 h-12 rounded-full flex items-center justify-center border border-primary/10 text-primary hover:bg-primary hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ←
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                    <button
                      key={n}
                      onClick={() => setCurrentPage(n)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all ${n === currentPage ? 'bg-primary text-white shadow-lg' : 'bg-white text-primary border border-primary/5 hover:border-accent'}`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-12 h-12 rounded-full flex items-center justify-center border border-primary/10 text-primary hover:bg-primary hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="pt-16 pb-0 bg-primary text-cream mandala-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-primary pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-white mb-8">Can't find what you're looking for?</h2>
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-[1px] w-12 bg-accent/40" />
            <div className="text-accent">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C12 22 16 18 16 12C16 6 12 4 12 4C12 4 8 6 8 12C8 18 12 22 12 22Z" />
              </svg>
            </div>
            <div className="h-[1px] w-12 bg-accent/40" />
          </div>
          <p className="text-cream/70 mb-12 max-w-2xl mx-auto text-lg font-light">
            Our artisans are always crafting new masterpieces. Join our inner circle to get notified about exclusive drops and custom commission opportunities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
            <input type="email" placeholder="Enter your email address" className="input-field !bg-white/5 !border-white/10 !text-white placeholder:text-white/30 !rounded-full !px-8" />
            <button className="btn-accent whitespace-nowrap !px-10">Join Now</button>
          </div>
        </div>
      </section>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-primary/40 backdrop-blur-md z-[60]"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-cream z-[70] p-10 shadow-2xl overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-primary">Filters</h3>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-primary/5 rounded-full transition-colors">
                  <X className="w-6 h-6 text-primary" />
                </button>
              </div>

              <div className="space-y-12">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">Category</h4>
                  <div className="space-y-3">
                    {activeCategories.map(cat => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer">
                        <input type="radio" name="m-category" className="accent-accent w-5 h-5" defaultChecked={cat === 'All'} />
                        <span className="text-text-soft font-medium">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-full btn-primary"
                >
                  Apply Filters
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
