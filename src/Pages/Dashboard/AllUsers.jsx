import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res?.data;
        }
    })
    
    // , {
    //     headers: {
    //         Authorization: `Bearer ${localStorage.getItem('access-token')}`
    //     }
    // }

    const handleDeleteUser = user => {
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

                axiosSecure.delete(`/users/${user?._id}`)
                    .then(res => {
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

    const handleMakeAdmin = user => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/users/${user?._id}`)
                    .then(res => {
                        console.log(res?.data);
                        if (res?.data?.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Success",
                                text: `You have successfully created ${user?.name} to admin`,
                                icon: "success"
                            });
                        }
                    })

            }
        });


    }
    return (
        <div>
            <div className='flex justify-evenly'>
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users?.length}</h2>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>
                                <tr
                                    key={user?._id}
                                >
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={user?.photoUrl}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user?.name}</div>
                                                <div className="text-sm opacity-50">United States</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {user?.email}
                                    </td>
                                    <td>
                                       { user?.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className='text-xl btn'><FaUsers></FaUsers></button>}
                                    </td>
                                    <th>
                                        <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost  text-lg"><FaTrashAlt></FaTrashAlt></button>
                                    </th>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AllUsers;