// Frontend API service — calls the Express + MongoDB backend
const API_URL = 'http://localhost:5000/api';

// ============================================
// USER
// ============================================

export const saveUserProfile = async (firebaseUid: string, displayName: string, email: string, photoURL: string, role: string) => {
    const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firebaseUid, displayName, email, photoURL, role }),
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

export const getProduct = async (id: string) => {
    const res = await fetch(`${API_URL}/products/${id}`);
    return res.json();
};

export const addProduct = async (product: any) => {
    const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
    return res.json();
};

export const deleteProduct = async (id: string) => {
    const res = await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
    return res.json();
};

// ============================================
// ORDERS
// ============================================

export const placeOrder = async (order: any) => {
    const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
    });
    return res.json();
};

export const getOrdersByUser = async (userId: string) => {
    const res = await fetch(`${API_URL}/orders/user/${userId}`);
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

export const addToCart = async (userId: string, item: any) => {
    const res = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...item }),
    });
    return res.json();
};

export const getCartItems = async (userId: string) => {
    const res = await fetch(`${API_URL}/cart/${userId}`);
    return res.json();
};

export const removeFromCart = async (userId: string, productId: string) => {
    const res = await fetch(`${API_URL}/cart/${userId}/${productId}`, { method: 'DELETE' });
    return res.json();
};

export const clearCart = async (userId: string) => {
    const res = await fetch(`${API_URL}/cart/${userId}`, { method: 'DELETE' });
    return res.json();
};

// Health check
export const checkHealth = async () => {
    const res = await fetch(`${API_URL}/health`);
    return res.json();
};
