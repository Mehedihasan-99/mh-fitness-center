import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";


const Routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <h2>home</h2>
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
        ]
    }
])

export default Routes