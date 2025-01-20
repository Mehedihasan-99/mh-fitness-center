import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Login from "../Pages/LoginPage/Login";
import SignUp from "../Pages/SignUpPage/SignUp";
import Home from "../Pages/HomePage/Home/Home";
import AllTrainer from "../Pages/AllTrainersPage/AllTrainer";
import TrainerDetails from "../Pages/TrainerDetailsPage/TrainerDetails";
import DashboardLayout from "../Layout/DashboardLayout";
import UserProfile from "../Pages/DashboardPage/UserProfile/UserProfile";
import Loading from "../components/Loading/Loading";


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
                element: <AllTrainer />
            },
            {
                path: '/trainers/:id',
                element: <TrainerDetails />
            },
            {
                path: '/classes',
                element: <h2>All Class</h2>
            },
            {
                path: '/community',
                element: <Loading />
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
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path: 'admin/newsletters',
                element: <h2>NEwsletter</h2>
            },
            {
                path: 'admin/all-trainers',
                element: <h2>admin/all-trainers</h2>
            },
            {
                path: 'admin/applied-trainer',
                element: <h2>admin/applied-trainer</h2>
            },
            {
                path: 'admin/balance',
                element: <h2>admin/balance</h2>
            },
            {
                path: 'admin/add-class',
                element: <h2>admin/add-class</h2>
            },
            {
                path: 'admin/add-forum',
                element: <h2>admin/add-forum</h2>
            },
            {
                path: '/dashboard',
                element: <UserProfile/>
            },
            {
                path: 'activity-log',
                element: <h2>activity-log</h2>
            },
            {
                path: 'be-a-trainer',
                element: <h2>be-a-trainer</h2>
            },
            {
                path: 'booked-trainer',
                element: <h2>booked-trainer</h2>
            }
        ]
    }
])

export default Routes