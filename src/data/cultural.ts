import { Utensils, Palette, Gift, Star } from 'lucide-react';

export const regions = [
    'Rajasthan', 'Karnataka', 'Kerala', 'West Bengal', 'Odisha', 'Gujarat', 'Uttar Pradesh', 'Tamil Nadu'
];

export const festivals = [
    'Diwali', 'Holi', 'Onam', 'Durga Puja', 'Pongal', 'Ganesh Chaturthi', 'Eid'
];

export const interests = [
    { id: 'decor', label: 'Home Decor', icon: Palette },
    { id: 'collectibles', label: 'Collectibles', icon: Star },
    { id: 'foods', label: 'Traditional Foods', icon: Utensils },
    { id: 'gifts', label: 'Gifts', icon: Gift },
];

export const discoveryData = {
    crafts: [
        { id: 1, name: 'Hand-Painted Blue Pottery Vase', artisan: 'Ananya Sharma', price: 2450, region: 'Jaipur, Rajasthan', image: 'https://picsum.photos/seed/jaipur-pottery/600/800', rarity: 'Rare', stock: 5, isPopularInAuction: true },
        { id: 2, name: 'Hand-Woven Banarasi Silk Stole', artisan: 'Rajesh Kumar', price: 4500, region: 'Varanasi, UP', image: 'https://picsum.photos/seed/silk/600/800', rarity: 'Limited Edition', stock: 2, isPopularInAuction: false },
    ],
    foods: [
        { id: 1, name: 'Authentic Mysore Pak', creator: 'Lakshmi Devi', price: 450, region: 'Mysore, Karnataka', tag: 'Homemade', image: 'https://picsum.photos/seed/mysorepak/600/800' },
        { id: 2, name: 'Rajasthani Ghevar', creator: 'Shanti Devi', price: 650, region: 'Jaipur, Rajasthan', tag: 'Festival Special', image: 'https://picsum.photos/seed/ghevar/600/800' },
    ],
    artisans: [
        {
            id: 1,
            name: 'Suresh Murmu',
            craft: 'Dhokra Art',
            region: 'Bastar, Chhattisgarh',
            image: 'https://picsum.photos/seed/artisan-suresh/400/400',
            story: 'Preserving the 4,000-year-old lost wax casting technique passed down through generations in his tribe.'
        },
        {
            id: 2,
            name: 'Ananya Sharma',
            craft: 'Blue Pottery',
            region: 'Jaipur, Rajasthan',
            image: 'https://picsum.photos/seed/artisan-ananya/400/400',
            story: 'Reviving the Persian-influenced art of blue pottery with contemporary floral motifs.'
        }
    ]
};
