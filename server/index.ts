import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import rateLimit from 'express-rate-limit';
import admin from 'firebase-admin';

import { UserModel } from './models/User';
import { ProductModel } from './models/Product';
import { OrderModel } from './models/Order';
import { FavoriteModel } from './models/Favorite';
import { CartModel } from './models/Cart';

dotenv.config();

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per IP
});

app.use(limiter);

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'https://nammacraft.netlify.app'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

// ============================================
// FIREBASE ADMIN
// ============================================
if (!admin.apps.length) {
    // Basic init since we are just decoding tokens. In production provide Google Application Credentials
    admin.initializeApp();
}

const authMiddleware = async (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized: No token provided' });
    try {
        req.user = await admin.auth().verifyIdToken(token);
        next();
    } catch {
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

// ============================================
// CONNECT TO MONGODB
// ============================================
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// ============================================
// USER ROUTES
// ============================================

// Save/update user after Google Sign-In
app.post('/api/users', async (req, res) => {
    try {
        const { firebaseUid, displayName, email, photoURL, role, age, location, phone, gender, bio, state } = req.body;

        // Prevent role escalation to admin
        const safeRole = (role === 'seller' || role === 'buyer') ? role : 'buyer';

        let user = await UserModel.findOne({ firebaseUid });
        if (user) {
            user.displayName = displayName;
            user.photoURL = photoURL;
            // Admin role should not be updated from client request
            if (user.role !== 'admin') {
                user.role = safeRole;
            }
            if (age) user.age = age;
            if (location) user.location = location;
            if (phone) user.phone = phone;
            if (gender) user.gender = gender;
            if (bio) user.bio = bio;
            if (state) user.state = state;
            await user.save();
        } else {
            user = await UserModel.create({ firebaseUid, displayName, email, photoURL, role: safeRole, age, location, phone, gender, bio, state });
        }
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get user profile
app.get('/api/users/:uid', async (req, res) => {
    try {
        const user = await UserModel.findOne({ firebaseUid: req.params.uid });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ============================================
// PRODUCT ROUTES
// ============================================

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await ProductModel.find().sort({ createdAt: -1 }).limit(50);
        res.json(products);
    } catch (error: any) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (error: any) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get products by artisan
app.get('/api/products/artisan/:artisanId', async (req, res) => {
    try {
        const products = await ProductModel.find({ artisanId: req.params.artisanId });
        res.json(products);
    } catch (error: any) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add a product (seller)
app.post('/api/products', authMiddleware, async (req, res) => {
    try {
        const product = await ProductModel.create(req.body);
        res.status(201).json(product);
    } catch (error: any) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a product
app.put('/api/products/:id', authMiddleware, async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(product);
    } catch (error: any) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a product
app.delete('/api/products/:id', authMiddleware, async (req, res) => {
    try {
        await ProductModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (error: any) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ============================================
// ORDER ROUTES
// ============================================

// Place order
app.post('/api/orders', authMiddleware, async (req, res) => {
    try {
        const order = await OrderModel.create(req.body);
        res.status(201).json(order);
    } catch (error: any) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get orders by user
app.get('/api/orders/user/:userId', authMiddleware, async (req, res) => {
    try {
        const orders = await OrderModel.find({ buyerId: req.params.userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error: any) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update order status
app.patch('/api/orders/:id/status', async (req, res) => {
    try {
        const order = await OrderModel.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(order);
    } catch (error: any) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ============================================
// FAVORITES ROUTES
// ============================================

// Add to favorites
app.post('/api/favorites', async (req, res) => {
    try {
        const fav = await FavoriteModel.create(req.body);
        res.status(201).json(fav);
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(200).json({ message: 'Already in favorites' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Remove from favorites
app.delete('/api/favorites/:userId/:productId', async (req, res) => {
    try {
        await FavoriteModel.findOneAndDelete({
            userId: req.params.userId,
            productId: req.params.productId
        });
        res.json({ message: 'Removed from favorites' });
    } catch (error: any) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get user favorites
app.get('/api/favorites/:userId', async (req, res) => {
    try {
        const favs = await FavoriteModel.find({ userId: req.params.userId });
        res.json(favs);
    } catch (error: any) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ============================================
// CART ROUTES
// ============================================

// Add to cart
app.post('/api/cart', async (req, res) => {
    try {
        const { userId, productId, name, price, quantity, image } = req.body;
        const item = await CartModel.findOneAndUpdate(
            { userId, productId },
            { userId, productId, name, price, quantity, image },
            { upsert: true, new: true }
        );
        res.json(item);
    } catch (error: any) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get cart items
app.get('/api/cart/:userId', async (req, res) => {
    try {
        const items = await CartModel.find({ userId: req.params.userId });
        res.json(items);
    } catch (error: any) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Remove from cart
app.delete('/api/cart/:userId/:productId', async (req, res) => {
    try {
        await CartModel.findOneAndDelete({
            userId: req.params.userId,
            productId: req.params.productId
        });
        res.json({ message: 'Removed from cart' });
    } catch (error: any) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Clear cart
app.delete('/api/cart/:userId', async (req, res) => {
    try {
        await CartModel.deleteMany({ userId: req.params.userId });
        res.json({ message: 'Cart cleared' });
    } catch (error: any) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ============================================
// CHAT ROUTE
// ============================================
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

app.post('/api/chat', async (req, res) => {
    try {
        const { messages, systemInstruction } = req.body;
        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Invalid messages format' });
        }

        // Limit history to last 10 messages
        const recentMessages = messages.slice(-10);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: recentMessages,
            config: {
                systemInstruction: systemInstruction,
            },
        });

        res.json({ text: response.text });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// ============================================
// VOICE PROCESS ROUTE
// ============================================
app.post('/api/voice-process', async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: 'Text is required' });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Extract product details from this voice description: "${text}". 
            Return a JSON object with: name, category (one of: Pottery, Textiles, Woodwork, Jewelry, Paintings), origin, startPrice (number), duration (e.g. "3 days"), craftStory.
            If a field is missing, provide a reasonable default based on the context.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING },
                        category: { type: Type.STRING },
                        origin: { type: Type.STRING },
                        startPrice: { type: Type.NUMBER },
                        duration: { type: Type.STRING },
                        craftStory: { type: Type.STRING },
                        language: { type: Type.STRING, description: "Detected language" }
                    },
                    required: ["name", "category", "origin", "startPrice", "duration", "craftStory"]
                }
            }
        });

        const data = JSON.parse(response.text || '{}');
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// ============================================
// HEALTH CHECK
// ============================================
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
    console.log(`🚀 NammaCraft API running on http://localhost:${PORT}`);
});
