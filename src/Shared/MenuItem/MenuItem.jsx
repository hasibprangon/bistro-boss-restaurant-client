import React from 'react';

const MenuItem = ({ item }) => {
    const { name, image, price, recipe } = item;
    return (
        <div className='flex space-x-4'>
            <img style={{borderRadius: '0 200px 200px 200px'}} className='w-[100px] border-t-8 border-l-8 border-blue-300 transform transition-transform duration-300 hover:scale-110' src={image} alt="" />
            <div>
                <h3 className='uppercase font-bold text-xl'>{name} -------</h3>
                <p>{recipe}</p>
            </div>
            <p className='text-yellow-500'>${price}</p>
        </div>
    );
};

export default MenuItem;