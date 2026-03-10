import { auth } from './firebase';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

if (typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1' &&
    API_URL.includes('localhost')) {
    console.warn("⚠️ Warning: Your frontend is hosted at " + window.location.hostname + " but is trying to connect to a backend on localhost. This will likely fail in production. Set VITE_API_URL to your deployed backend URL.");
}

const getHeaders = async () => {
    const user = auth.currentUser;
    const token = user ? await user.getIdToken() : '';
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

// ============================================
// USER
// ============================================

export const saveUserProfile = async (firebaseUid: string, displayName: string, email: string, photoURL: string, role: string, age?: number, location?: string, phone?: string, gender?: string, bio?: string, state?: string) => {
    const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firebaseUid, displayName, email, photoURL, role, age, location, phone, gender, bio, state }),
    });
    return res.json();
};

export const getUserProfile = async (uid: string) => {
    const res = await fetch(`${API_URL}/users/${uid}`);
    if (res.status === 404) return null;
    return res.json();
};

// ============================================
// PRODUCTS
// ============================================

export const getProducts = async () => {
    const res = await fetch(`${API_URL}/products`);
    return res.json();
};

export const getProductsByArtisan = async (artisanId: string) => {
    const res = await fetch(`${API_URL}/products/artisan/${artisanId}`);
    return res.json();
};

export const getProduct = async (id: string) => {
    const res = await fetch(`${API_URL}/products/${id}`);
    return res.json();
};

export const addProduct = async (product: any) => {
    const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify(product),
    });
    return res.json();
};

export const updateProduct = async (id: string, product: any) => {
    const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: await getHeaders(),
        body: JSON.stringify(product),
    });
    return res.json();
};

export const deleteProduct = async (id: string) => {
    const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: await getHeaders()
    });
    return res.json();
};

// ============================================
// ORDERS
// ============================================

export const placeOrder = async (order: any) => {
    const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify(order),
    });
    return res.json();
};

export const getOrdersByUser = async (userId: string) => {
    const res = await fetch(`${API_URL}/orders/user/${userId}`, {
        headers: await getHeaders()
    });
    return res.json();
};

export const getOrdersBySeller = async (sellerId: string) => {
    const res = await fetch(`${API_URL}/orders/seller/${sellerId}`, {
        headers: await getHeaders()
    });
    return res.json();
};

// ============================================
// FAVORITES
// ============================================

export const addToFavorites = async (userId: string, productId: string) => {
    const res = await fetch(`${API_URL}/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId }),
    });
    return res.json();
};

export const removeFromFavorites = async (userId: string, productId: string) => {
    const res = await fetch(`${API_URL}/favorites/${userId}/${productId}`, { method: 'DELETE' });
    return res.json();
};

export const getFavorites = async (userId: string) => {
    const res = await fetch(`${API_URL}/favorites/${userId}`);
    return res.json();
};

// ============================================
// CART
// ============================================

export const addToCart = async (item: any) => {
    const res = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify(item),
    });
    return res.json();
};

export const getCartItems = async () => {
    const res = await fetch(`${API_URL}/cart`, {
        headers: await getHeaders()
    });
    return res.json();
};

export const updateCartQuantity = async (productId: string, quantity: number) => {
    const res = await fetch(`${API_URL}/cart/${productId}`, {
        method: 'PATCH',
        headers: await getHeaders(),
        body: JSON.stringify({ quantity }),
    });
    return res.json();
};

export const removeFromCart = async (productId: string) => {
    const res = await fetch(`${API_URL}/cart/${productId}`, {
        method: 'DELETE',
        headers: await getHeaders()
    });
    return res.json();
};

export const clearCart = async () => {
    const res = await fetch(`${API_URL}/cart`, {
        method: 'DELETE',
        headers: await getHeaders()
    });
    return res.json();
};

// Health check
export const checkHealth = async () => {
    const res = await fetch(`${API_URL}/health`);
    return res.json();
};

// ============================================
// CHAT
// ============================================
export const sendChatMessage = async (messages: any[], systemInstruction: string) => {
    const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, systemInstruction }),
    });
    return res.json();
};

export const processVoiceInput = async (text: string) => {
    const res = await fetch(`${API_URL}/voice-process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
    });
    return res.json();
};
