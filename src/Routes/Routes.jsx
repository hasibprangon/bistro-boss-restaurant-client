import { createBrowserRouter } from "react-router-dom";
import Default from "../Layout/Default";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRouts from "./PrivateRouts";
import Secret from "../Shared/Secret";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUsers from "../Pages/Dashboard/AllUsers";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import Payment from "../Pages/Dashboard/Payment/Payment";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Default></Default>,
        children:[
            {
               path:'/',
               element:<Home></Home> 
            },
            {
                path:'/menu',
                element:<Menu></Menu>
            },
            {
                path:'/order/:category',
                element:<Order></Order>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/signup',
                element:<SignUp></SignUp>
            },
            {
                path:'/secret',
                element:<PrivateRouts><Secret></Secret></PrivateRouts>
            }
        ]
    },
    {
        path:'dashboard',
        element:<PrivateRouts><Dashboard></Dashboard></PrivateRouts>,
        children: [
            {
                path:'cart',
                element:<Cart></Cart>
            },
            {
                path:'payment',
                element:<Payment></Payment>
            },

            // admin routes
            {
                path:'allUsers',
                element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path:'addItems',
                element: <AdminRoute><AddItems></AddItems></AdminRoute>
            },
            {
                path:'manageItems',
                element:<AdminRoute><ManageItems></ManageItems></AdminRoute>
            }
        ]
    }
])