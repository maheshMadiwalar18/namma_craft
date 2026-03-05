import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { User } from 'firebase/auth';

// ============================================
// USER PROFILE
// ============================================

export interface UserProfile {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
    role: 'buyer' | 'seller' | 'admin';
    createdAt: any;
    updatedAt: any;
}

// Save or update user profile after Google Sign-In
export const saveUserProfile = async (user: User, role: string = 'buyer') => {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        // New user — create profile
        await setDoc(userRef, {
            uid: user.uid,
            displayName: user.displayName || '',
            email: user.email || '',
            photoURL: user.photoURL || '',
            role: role,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
    } else {
        // Existing user — update last login
        await updateDoc(userRef, {
            displayName: user.displayName || '',
            photoURL: user.photoURL || '',
            updatedAt: serverTimestamp(),
        });
    }

    return (await getDoc(userRef)).data() as UserProfile;
};

// Get user profile
export const getUserProfile = async (uid: string) => {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? (userSnap.data() as UserProfile) : null;
};

// Update user role
export const updateUserRole = async (uid: string, role: string) => {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, { role, updatedAt: serverTimestamp() });
};

// ============================================
// PRODUCTS
// ============================================

export interface Product {
    id?: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    region: string;
    artisan: string;
    artisanId: string;
    rarity: string;
    stock: number;
    isPopularInAuction: boolean;
    createdAt: any;
}

// Add a product
export const addProduct = async (product: Omit<Product, 'id' | 'createdAt'>) => {
    const docRef = await addDoc(collection(db, 'products'), {
        ...product,
        createdAt: serverTimestamp(),
    });
    return docRef.id;
};

// Get all products
export const getProducts = async (limitCount: number = 20) => {
    const q = query(
        collection(db, 'products'),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
};

// Get products by artisan
export const getProductsByArtisan = async (artisanId: string) => {
    const q = query(
        collection(db, 'products'),
        where('artisanId', '==', artisanId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
};

// Get single product
export const getProduct = async (productId: string) => {
    const docSnap = await getDoc(doc(db, 'products', productId));
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Product : null;
};

// ============================================
// ORDERS
// ============================================

export interface Order {
    id?: string;
    buyerId: string;
    buyerName: string;
    buyerEmail: string;
    productId: string;
    productName: string;
    quantity: number;
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: any;
}

// Place an order
export const placeOrder = async (order: Omit<Order, 'id' | 'createdAt'>) => {
    const docRef = await addDoc(collection(db, 'orders'), {
        ...order,
        createdAt: serverTimestamp(),
    });
    return docRef.id;
};

// Get orders by user
export const getOrdersByUser = async (userId: string) => {
    const q = query(
        collection(db, 'orders'),
        where('buyerId', '==', userId),
        orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
};

// ============================================
// FAVORITES / WISHLIST
// ============================================

// Add to favorites
export const addToFavorites = async (userId: string, productId: string) => {
    await setDoc(doc(db, 'users', userId, 'favorites', productId), {
        productId,
        addedAt: serverTimestamp(),
    });
};

// Remove from favorites
export const removeFromFavorites = async (userId: string, productId: string) => {
    await deleteDoc(doc(db, 'users', userId, 'favorites', productId));
};

// Get user favorites
export const getFavorites = async (userId: string) => {
    const snapshot = await getDocs(collection(db, 'users', userId, 'favorites'));
    return snapshot.docs.map(doc => doc.data().productId as string);
};

// Check if product is favorited
export const isFavorited = async (userId: string, productId: string) => {
    const docSnap = await getDoc(doc(db, 'users', userId, 'favorites', productId));
    return docSnap.exists();
};

// ============================================
// CART
// ============================================

export interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    addedAt: any;
}

// Add to cart
export const addToCart = async (userId: string, item: Omit<CartItem, 'addedAt'>) => {
    await setDoc(doc(db, 'users', userId, 'cart', item.productId), {
        ...item,
        addedAt: serverTimestamp(),
    });
};

// Remove from cart
export const removeFromCart = async (userId: string, productId: string) => {
    await deleteDoc(doc(db, 'users', userId, 'cart', productId));
};

// Get cart items
export const getCartItems = async (userId: string) => {
    const snapshot = await getDocs(collection(db, 'users', userId, 'cart'));
    return snapshot.docs.map(doc => doc.data() as CartItem);
};

// Clear cart
export const clearCart = async (userId: string) => {
    const snapshot = await getDocs(collection(db, 'users', userId, 'cart'));
    const deletePromises = snapshot.docs.map(d => deleteDoc(d.ref));
    await Promise.all(deletePromises);
};
