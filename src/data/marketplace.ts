export const craftCategories = ['All', 'Pottery', 'Textiles', 'Woodwork', 'Jewelry', 'Paintings'];
export const foodCategories = ['All', 'Sweets', 'Savories', 'Spices', 'Pickles', 'Beverages'];
export const regions = ['All India', 'Jaipur, Rajasthan', 'Varanasi, UP', 'Kutch, Gujarat', 'Bhubaneswar, Odisha', 'Mysore, Karnataka'];
export const foodSpecialties = ['All', 'Homemade', 'Festival Special', 'Organic', 'Vegan'];

export const craftProducts = [
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

export const foodProducts = [
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
