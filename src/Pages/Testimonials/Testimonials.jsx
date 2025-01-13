import React, { useEffect, useState } from 'react';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
import useAxiosSecure from '../../hooks/useAxiosSecure';


const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    const AxiosSecure = useAxiosSecure();

    useEffect(() => {
        AxiosSecure.get(`http://localhost:5000/reviews`)
            .then(res => {
                setReviews(res.data);
            })
    }, []);


    return (
        <section className='my-20'>
            <SectionTitle
                subHeading={'What Our Client Say'}
                heading={'Testimonials'}
            ></SectionTitle>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >

                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}
                    >
                        <div className='flex flex-col items-center mx-24 my-16'>
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p className='py-8'>{review.details}</p>
                            <h3 className="text-3xl text-orange-400">{review.name}</h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>

        </section>
    );
};

export default Testimonials;