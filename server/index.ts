import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import { UserModel } from './models/User';
import { ProductModel } from './models/Product';
import { OrderModel } from './models/Order';
import { FavoriteModel } from './models/Favorite';
import { CartModel } from './models/Cart';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

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
        const { firebaseUid, displayName, email, photoURL, role } = req.body;

        let user = await UserModel.findOne({ firebaseUid });
        if (user) {
            user.displayName = displayName;
            user.photoURL = photoURL;
            await user.save();
        } else {
            user = await UserModel.create({ firebaseUid, displayName, email, photoURL, role });
        }
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Get user profile
app.get('/api/users/:uid', async (req, res) => {
    try {
        const user = await UserModel.findOne({ firebaseUid: req.params.uid });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
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
        res.status(500).json({ error: error.message });
    }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Get products by artisan
app.get('/api/products/artisan/:artisanId', async (req, res) => {
    try {
        const products = await ProductModel.find({ artisanId: req.params.artisanId });
        res.json(products);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Add a product (seller)
app.post('/api/products', async (req, res) => {
    try {
        const product = await ProductModel.create(req.body);
        res.status(201).json(product);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Update a product
app.put('/api/products/:id', async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(product);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
    try {
        await ProductModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// ============================================
// ORDER ROUTES
// ============================================

// Place order
app.post('/api/orders', async (req, res) => {
    try {
        const order = await OrderModel.create(req.body);
        res.status(201).json(order);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Get orders by user
app.get('/api/orders/user/:userId', async (req, res) => {
    try {
        const orders = await OrderModel.find({ buyerId: req.params.userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
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
        res.status(500).json({ error: error.message });
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
        res.status(500).json({ error: error.message });
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
        res.status(500).json({ error: error.message });
    }
});

// Get user favorites
app.get('/api/favorites/:userId', async (req, res) => {
    try {
        const favs = await FavoriteModel.find({ userId: req.params.userId });
        res.json(favs);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
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
        res.status(500).json({ error: error.message });
    }
});

// Get cart items
app.get('/api/cart/:userId', async (req, res) => {
    try {
        const items = await CartModel.find({ userId: req.params.userId });
        res.json(items);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
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
        res.status(500).json({ error: error.message });
    }
});

// Clear cart
app.delete('/api/cart/:userId', async (req, res) => {
    try {
        await CartModel.deleteMany({ userId: req.params.userId });
        res.json({ message: 'Cart cleared' });
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
