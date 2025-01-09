import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const handleSignOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    // update user profile
    const updateUserProfile = (profileData) => {
        setLoading(true);
        return updateProfile(auth.currentUser, profileData);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log("Current user: ", currentUser);
            setLoading(false)
        })
        return () => {
            unsubscribe();
        }
    }, [])

    const info = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        signIn,
        handleSignOut,
        updateUserProfile

    }
    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;