import React from 'react';
import { FaOpencart } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import { FcHome } from "react-icons/fc";
import { FaCalendarDays } from "react-icons/fa6";
import { FaStarHalfStroke } from "react-icons/fa6";
import { LuNotebookPen } from "react-icons/lu";


const Dashboard = () => {
    return (
        <div className="flex min-h-screen">
            {/* Aside Section */}
            <aside className="w-64 bg-orange-400">
                <ul className="menu p-4">
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
                            <span className='text-xl'>My Cart</span>
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