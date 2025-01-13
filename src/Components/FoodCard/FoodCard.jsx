import React from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const FoodCard = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const AxiosSecure = useAxiosSecure();

    const handleAddToCart = food => {
        if (user && user?.email) {
            const cartItem = {
                menuId: _id,
                email: user?.email,
                name: food?.name,
                image: food?.image,
                price: food?.price
            }

            AxiosSecure.post('/carts', cartItem)
            .then(res => {
                if(res?.data?.insertedId) {
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: `${name} added to the cart`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            })
            
        }
        else {
            Swal.fire({
                title: "You are not Logged in",
                text: "Please login to add to cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Please, Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', {state: location?.pathname});
                }
            });
        }
    }
    return (
        <div className="card bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-xl hover:scale-105 transition-transform duration-300 w-96 rounded-lg overflow-hidden">
            <figure className="relative">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-4 py-1 rounded-full shadow-md text-purple-600 font-bold text-lg">
                    ${price}
                </div>
                <figcaption className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-lg font-medium px-4">
                        A perfect choice for your Diet!
                    </p>
                </figcaption>
            </figure>
            <div className="card-body bg-white p-6 text-center rounded-t-3xl -mt-6 shadow-lg">
                <h2 className="card-title text-2xl font-bold text-gray-800 mb-3">
                    {name}
                </h2>
                <p className="text-gray-600 mb-5 leading-relaxed">
                    {recipe}
                </p>
                <div className="card-actions">
                    <button
                        onClick={() => handleAddToCart(item)}
                        className="btn bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300">
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>


    );
};

export default FoodCard;