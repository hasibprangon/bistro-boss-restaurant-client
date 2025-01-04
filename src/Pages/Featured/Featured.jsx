import React from 'react';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import img from '../../assets/home/featured.jpg'

const Featured = () => {
    return (
        <div
        className=' min-h-screen bg-fixed text-white pt-8 my-10'
        style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>
            <SectionTitle
                subHeading={'Check It Out'}
                heading={'Featured Item'}
            ></SectionTitle>

            <div className='md:flex justify-center items-center py-20 px-36 bg-slate-500 bg-opacity-50'
            >
                <div>
                    <img className='w-[450px] rounded-xl' src={img} alt="" /> 
                </div>
                <div className='md:ml-10 w-[700px] text-white'>
                    <p>Aug 20, 2029</p>
                    <p className='uppercase'>Where can I get some?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quia consequuntur soluta provident. Veritatis est, non earum nobis in cum eos, sed, odio officiis doloremque similique a sequi itaque. Illum.</p>
                    <button className="btn btn-outline text-white border-0 border-b-4 mt-4">Order Now</button>
                </div>
            </div>

        </div>
    );
};

export default Featured;