import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Login from "../Pages/LoginPage/Login";
import SignUp from "../Pages/SignUpPage/SignUp";
import Home from "../Pages/HomePage/Home/Home";


const Routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/trainers',
                element: <h2>All Trainer</h2>
            },
            {
                path: '/classes',
                element: <h2>All Class</h2>
            },
            {
                path: '/community',
                element: <h2>Community</h2>
            },
            {
                path: '/dashboard',
                element: <h2>Dashboard</h2>
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/sign-up',
                element: <SignUp />
            }
        ]
    }
])

export default Routes