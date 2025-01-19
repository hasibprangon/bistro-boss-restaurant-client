import React from 'react';
import { FaList, FaOpencart, FaUtensils } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import { FcHome } from "react-icons/fc";
import { FaCalendarDays, FaPeopleGroup } from "react-icons/fa6";
import { FaStarHalfStroke } from "react-icons/fa6";
import { LuNotebookPen } from "react-icons/lu";
import { TiThMenuOutline } from 'react-icons/ti';
import useCart from '../hooks/useCart';


const Dashboard = () => {
    const [cart] = useCart();

    // todo: get admin value from the database
    const isAdmin = true;

    return (
        <div className="flex min-h-screen font-dancing">
            {/* Aside Section */}
            <aside className="w-64 bg-orange-400">
                <ul className="menu p-4">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to="/dashboard/adminHome">
                                    <FcHome className='text-xl'>
                                    </FcHome>
                                    <span className='text-xl'>Admin Home</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addItems">
                                    <FaUtensils className='text-xl'>
                                    </FaUtensils>
                                    <span className='text-xl'>Add Items</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageItems">
                                    <FaList className='text-xl'>
                                    </FaList>
                                    <span className='text-xl'>Manage Items</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addReview">
                                    <FaStarHalfStroke className='text-xl'>
                                    </FaStarHalfStroke>
                                    <span className='text-xl'>Add Review</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageBooking">
                                    <LuNotebookPen className='text-xl'>
                                    </LuNotebookPen>
                                    <span className='text-xl'>Manage Bookings</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allUsers">
                                    <FaPeopleGroup className='text-xl'>
                                    </FaPeopleGroup>
                                    <span className='text-xl'>All Users</span>
                                </NavLink>
                            </li>
                        </>
                            : <>
                                <li>
                                    <NavLink to="/dashboard/userHome">
                                        <FcHome className='text-xl'>
                                        </FcHome>
                                        <span className='text-xl'>User Home</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reservation">
                                        <FaCalendarDays className='text-xl'>
                                        </FaCalendarDays>
                                        <span className='text-xl'>Reservation</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/cart">
                                        <FaOpencart className='text-xl'>
                                        </FaOpencart>
                                        <span className='text-xl'>My Cart({cart?.length})</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/review">
                                        <FaStarHalfStroke className='text-xl'>
                                        </FaStarHalfStroke>
                                        <span className='text-xl'>Add Review</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/booking">
                                        <LuNotebookPen className='text-xl'>
                                        </LuNotebookPen>
                                        <span className='text-xl'>My Bookings</span>
                                    </NavLink>
                                </li>
                            </>
                    }

                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FcHome className='text-xl'>
                            </FcHome>
                            <span className='text-xl'>Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/menu">
                            <TiThMenuOutline className='text-xl'>
                            </TiThMenuOutline>
                            <span className='text-xl'>Menu</span>
                        </NavLink>
                    </li>
                </ul>
            </aside>

            {/* Main Section */}
            <main className="flex-1 bg-gray-100 p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;