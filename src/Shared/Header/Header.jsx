import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthContextProvider';
import Swal from 'sweetalert2';
import { FaOpencart } from "react-icons/fa";
import useCart from '../../hooks/useCart';


const Header = () => {
    const { handleSignOut, user } = useContext(AuthContext);
    const [cart] = useCart();
    const handleLogOut = () => {
        handleSignOut()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Log Out Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(err => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${err.message}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            })

    }
    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/menu'>Our Menu</NavLink></li>
        <li><NavLink to='/order/Salad'>Order</NavLink></li>
        <li><NavLink to='/secret'>Secret</NavLink></li>
        <li><NavLink to='/dashboard/cart' className="btn btn-outline text-black">
            <FaOpencart className='mr-4 text-2xl' />
            <span className="badge badge-primary">+{cart.length}</span>
        </NavLink></li>
    </>
    return (
        <div>
            <div className="navbar fixed z-10 bg-opacity-30 bg-base-300 max-w-7xl ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content  rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Bistro Boss</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user && user?.email ?
                            <button className='btn' onClick={handleLogOut}>Log Out</button>
                            :
                            <Link to='/login' className="btn">Login</Link>
                    }

                </div>
            </div>
        </div>
    );
};

export default Header;