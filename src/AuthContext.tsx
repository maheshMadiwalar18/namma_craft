import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { saveUserProfile, getUserProfile } from './db';

// Mock User interface to replace Firebase User
interface MockUser {
    uid: string;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
}

interface AuthContextType {
    user: MockUser | null;
    userProfile: Record<string, any> | null;
    loading: boolean;
    signInWithGoogle: (role?: string, extraData?: any) => Promise<any>;
    updateProfile: (extraData: any) => Promise<any>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userProfile: null,
    loading: true,
    signInWithGoogle: async () => { },
    updateProfile: async () => { },
    logout: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<MockUser | null>(null);
    const [userProfile, setUserProfile] = useState<Record<string, any> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const savedUserJson = localStorage.getItem('nammacraft_user');
            if (savedUserJson) {
                try {
                    const currentUser = JSON.parse(savedUserJson) as MockUser;
                    setUser(currentUser);
                    const profile = await getUserProfile(currentUser.uid);
                    if (profile && !profile.error) {
                        setUserProfile(profile);
                    } else {
                        // If backend fails, use mock profile from user data
                        setUserProfile({
                            firebaseUid: currentUser.uid,
                            displayName: currentUser.displayName,
                            email: currentUser.email,
                            photoURL: currentUser.photoURL,
                            role: 'buyer'
                        });
                    }
                } catch (e) {
                    console.error('Auth restoration failed:', e);
                    localStorage.removeItem('nammacraft_user');
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const signInWithGoogle = async (role: string = 'buyer', extraData: any = {}) => {
        setLoading(true);
        try {
            // Simulated delay
            await new Promise(r => setTimeout(r, 1000));

            // Create mock user data
            const mockUid = 'user_' + Math.random().toString(36).slice(2, 11);
            const mockUser: MockUser = {
                uid: extraData.uid || mockUid,
                displayName: extraData.displayName || 'Demo User',
                email: extraData.email || 'demo@nammacraft.com',
                photoURL: extraData.photoURL || `https://ui-avatars.com/api/?name=${extraData.displayName || 'Demo User'}&background=random`
            };

            // Attempt to save to backend
            let profile;
            try {
                profile = await saveUserProfile({
                    firebaseUid: mockUser.uid,
                    displayName: mockUser.displayName || '',
                    email: mockUser.email || '',
                    photoURL: mockUser.photoURL || '',
                    role,
                    ...extraData
                });
            } catch (e) {
                console.error('Backend sync failed, using mock data:', e);
                profile = {
                    firebaseUid: mockUser.uid,
                    displayName: mockUser.displayName,
                    email: mockUser.email,
                    photoURL: mockUser.photoURL,
                    role: role,
                    ...extraData
                };
            }

            setUser(mockUser);
            setUserProfile(profile);
            localStorage.setItem('nammacraft_user', JSON.stringify(mockUser));
            return profile;
        } catch (error: any) {
            console.error('Login Error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (extraData: any = {}) => {
        if (!user || !userProfile) return null;
        try {
            const profile = await saveUserProfile({
                firebaseUid: user.uid,
                displayName: extraData.displayName || userProfile.displayName || '',
                email: userProfile.email || '',
                photoURL: userProfile.photoURL || '',
                role: userProfile.role,
                ...extraData
            });
            setUserProfile(profile);
            return profile;
        } catch (e) {
            console.error('Update Profile Error:', e);
            throw e;
        }
    };

    const logout = async () => {
        setUser(null);
        setUserProfile(null);
        localStorage.removeItem('nammacraft_user');
    };

    const authValue = React.useMemo(() => ({
        user,
        userProfile,
        loading,
        signInWithGoogle,
        updateProfile,
        logout
    }), [user, userProfile, loading]);

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};
