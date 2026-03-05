import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    User,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import { saveUserProfile, getUserProfile } from './db';

interface AuthContextType {
    user: User | null;
    userProfile: any | null;
    loading: boolean;
    signInWithGoogle: (role?: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userProfile: null,
    loading: true,
    signInWithGoogle: async () => { },
    logout: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                try {
                    const profile = await getUserProfile(currentUser.uid);
                    setUserProfile(profile);
                } catch (e) {
                    // Backend may not be running — that's ok
                    console.log('Could not fetch profile from backend');
                }
            } else {
                setUserProfile(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async (role: string = 'buyer') => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const u = result.user;
            // Save user to MongoDB via backend API
            try {
                const profile = await saveUserProfile(
                    u.uid,
                    u.displayName || '',
                    u.email || '',
                    u.photoURL || '',
                    role
                );
                setUserProfile(profile);
            } catch (e) {
                console.log('Backend not available, using Firebase auth only');
            }
        } catch (error: any) {
            console.error('Google Sign-In Error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUserProfile(null);
        } catch (error: any) {
            console.error('Logout Error:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, userProfile, loading, signInWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
