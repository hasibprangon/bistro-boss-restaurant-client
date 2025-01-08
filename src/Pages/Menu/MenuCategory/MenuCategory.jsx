import React from 'react';
import MenuItem from '../../../Shared/MenuItem/MenuItem';
import Cover from '../../../Shared/Cover/Cover';

const MenuCategory = ({items, title, coverImg}) => {
    return (
        <div className='my-10 pt-8'>
            {title &&  <Cover img={coverImg} title={title} ></Cover>}
              <div className='grid md:grid-cols-2 gap-10 mt-16'>
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
        </div>
    );
};

export default MenuCategory;