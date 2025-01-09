import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';

const Default = () => {
    const location = useLocation();
    console.log(location);
    const isLogin = location.pathname.includes(`login`);

    return (
        <div className='max-w-7xl mx-auto font-prata'>
            {isLogin || <Header></Header>}
            <Outlet></Outlet>
            {isLogin || <Footer></Footer>}
        </div>
    );
};

export default Default;