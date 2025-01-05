import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../../Shared/Cover/Cover';
import img from '../../../assets/menu/banner3.jpg'
import PopularMenu from '../../PopularMenu/PopularMenu';

const Menu = () => {
    return (
        <div>
            <Helmet>
                <title>Menu || Bistro Boss Restaurant</title>
            </Helmet>
            <Cover
            img={img}
            title={'Our Menu'}
            ></Cover>
           <PopularMenu></PopularMenu>
            <Cover
            img={img}
            title={'Our Menu'}
            ></Cover>
           <PopularMenu></PopularMenu>
            <Cover
            img={img}
            title={'Our Menu'}
            ></Cover>
           <PopularMenu></PopularMenu>
        </div>
    );
};

export default Menu;