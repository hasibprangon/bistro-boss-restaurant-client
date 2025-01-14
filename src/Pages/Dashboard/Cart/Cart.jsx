import React from 'react';
import useCart from '../../../hooks/useCart';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { MdDeleteForever } from 'react-icons/md';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Cart = () => {
    const [cart,refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item?.price, 0);
    const AxiosSecure = useAxiosSecure();
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                AxiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        console.log(res?.data);
                        if (res?.data?.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }
    return (
        <div>
            <SectionTitle subHeading={"My Cart"} heading={"Wanna Add More"}></SectionTitle>
            <div className='flex justify-between mt-8'>
                <h2 className="text-4xl">Items: {cart.length}</h2>
                <h2 className="text-4xl">Total Price: {totalPrice}</h2>
                <button className='btn btn-outline '>Pay</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Item Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart?.map((item, index) => <tr key={item?._id}>
                                <th>
                                    {index}
                                </th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={item?.image}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div className="font-bold">{item?.name}</div>
                                    </div>
                                </td>
                                <td>
                                    ${item?.price}
                                </td>
                                <th>
                                    <button onClick={() => handleDelete(item?._id)} className="btn btn-outline  text-2xl"><MdDeleteForever className='text-red-500'></MdDeleteForever></button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;