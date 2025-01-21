import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useMenu from '../../../hooks/useMenu';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageItems = () => {
    const [menu,,refetch] = useMenu();
    const AxiosSecure = useAxiosSecure();

    const handleDeleteItems = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await AxiosSecure.delete(`/menu/${item?._id}`);
                if (res?.data?.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: `${item?.name} has been deleted`,
                        icon: "success"
                    });
                }

            }
        });
    };


    return (
        <div>
            <SectionTitle subHeading={'Hurry Up'} heading={'Manage All Items'}></SectionTitle>

            <div>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th className='text-base'>Image</th>
                                <th className='text-base'>Item Name</th>
                                <th className='text-base'>Item Category</th>
                                <th className='text-base'>Price</th>
                                <th className='text-base'>Update</th>
                                <th className='text-base'>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((item, index) =>
                                    <tr>
                                        <th>
                                            {index + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={item?.image}
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {item?.name}
                                        </td>
                                        <td>
                                            {item?.category}
                                        </td>
                                        <td>${item?.price}</td>
                                        <th>
                                            <button className="btn bg-green-500 text-white text-lg"><FaRegEdit></FaRegEdit></button>
                                        </th>
                                        <th>
                                            <button onClick={() => handleDeleteItems(item)} className="btn  bg-red-500 text-lg text-white"><FaRegTrashAlt></FaRegTrashAlt></button>
                                        </th>
                                    </tr>)
                            }

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default ManageItems;