import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthContextProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRouts = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>
    };

    if(user && user?.email) {
        return children;
    }
    return <Navigate state={location?.pathname} to='/login'></Navigate>
};

export default PrivateRouts;