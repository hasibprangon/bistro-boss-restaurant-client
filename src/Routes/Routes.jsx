import { createBrowserRouter } from "react-router-dom";
import Default from "../Layout/Default";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";

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
            }
        ]
    }
])