import { createBrowserRouter } from "react-router-dom";
import Default from "../Layout/Default";
import Home from "../Pages/Home/Home";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Default></Default>,
        children:[
            {
               path:'/',
               element:<Home></Home> 
            }
        ]
    }
])