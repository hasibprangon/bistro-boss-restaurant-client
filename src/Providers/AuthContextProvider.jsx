import React, { createContext, useState } from 'react';
export const AuthContext = createContext(null);

const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const info = {
        user,
        setUser,
        loading,
        setLoading
    }
    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;