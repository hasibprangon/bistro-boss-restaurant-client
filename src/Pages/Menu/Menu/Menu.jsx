import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../../Shared/Cover/Cover';
import img from '../../../assets/menu/banner3.jpg';
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import soupImg from '../../../assets/menu/soup-bg.jpg';
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {
    const [menu] = useMenu();
    const soup = menu.filter(item => item.category === 'soup')
    const dessert = menu.filter(item => item.category === 'dessert')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const offered = menu.filter(item => item.category === 'offered')

    return (
        <div>
            <Helmet>
                <title>Menu || Bistro Boss Restaurant</title>
            </Helmet>
            <Cover img={img} title={'Our Menu'} ></Cover>
            <SectionTitle subHeading={"Don't Miss"} heading={"Today's Offer"}></SectionTitle>
            {/* offered */}
            <MenuCategory items={offered}></MenuCategory>

            {/* dessert */}
            <MenuCategory items={dessert} title={"Dessert"} coverImg={dessertImg}></MenuCategory>

            {/* pizza */}
            <MenuCategory items={pizza} title={"Pizza"} coverImg={pizzaImg}></MenuCategory>

            {/* salad */}
            <MenuCategory items={salad} title={"Salad"} coverImg={saladImg}></MenuCategory>

            {/* soup */}
            <MenuCategory items={soup} title={"Soup"} coverImg={soupImg}></MenuCategory>

        </div>
    );
};

export default Menu;