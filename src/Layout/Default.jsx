import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';

const Default = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes(`login`) || location.pathname.includes(`signup`);

    return (
        <div className='max-w-7xl mx-auto font-prata'>
            {noHeaderFooter || <Header></Header>}
            <Outlet></Outlet>
            {noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Default;