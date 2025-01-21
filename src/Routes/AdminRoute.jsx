import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();

    if(loading || isAdminLoading) {
        return <span className="loading loading-spinner loading-lg"></span>
    }

    if(user && isAdmin) {
        return children
    }

    return <Navigate state={location?.pathname} to='/login'></Navigate>

};

export default AdminRoute;