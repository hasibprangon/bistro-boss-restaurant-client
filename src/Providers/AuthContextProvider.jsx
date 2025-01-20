import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';
export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const handleGoogleSignup = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);

    }

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const handleSignIn = (email, password) => {
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
            if(currentUser) {
                // get token and store client
                const userInfo = {email: currentUser?.email}
                axiosPublic.post('/jwt', userInfo)
                .then(res =>{
                    if(res?.data?.token){
                        localStorage.setItem('access-token', res?.data?.token)
                    }
                })
            }
            else{
                // todo: remove token (if token store in client side: local storage, caching, in memory)
                localStorage.removeItem('access-token')
            }
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
        handleSignIn,
        handleSignOut,
        updateUserProfile,
        handleGoogleSignup

    }
    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;