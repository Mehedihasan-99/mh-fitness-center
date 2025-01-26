import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Login from "../Pages/LoginPage/Login";
import SignUp from "../Pages/SignUpPage/SignUp";
import Home from "../Pages/HomePage/Home/Home";
import AllTrainer from "../Pages/AllTrainersPage/AllTrainer";
import TrainerDetails from "../Pages/TrainerDetailsPage/TrainerDetails";
import DashboardLayout from "../Layout/DashboardLayout";
import Loading from "../components/Loading/Loading";
import Newsletter from "../Pages/DashboardPage/Newsletter/Newsletter";
import AllTrainers from "../components/AllTrainers/AllTrainers";
import UserProfile from "../Pages/DashboardPage/UserDashboard/UserProfile/UserProfile";
import AddClass from "../Pages/DashboardPage/AdminDashboard/AddClass/AddClass";
import Allclass from "../Pages/ClassPage/AllClass/AllClass";
import ActivityLog from "../Pages/DashboardPage/UserDashboard/ActivityLog/ActivityLog";
import BeATrainer from "../Pages/DashboardPage/UserDashboard/BeATrainer/BeATrainer";


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
                element: <Allclass />
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
                element: <Newsletter/>
            },
            {
                path: 'admin/all-trainers',
                element: <AllTrainers />
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
                element: <AddClass />
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
                element: <ActivityLog />
            },
            {
                path: 'be-a-trainer',
                element: <BeATrainer />
            },
            {
                path: 'booked-trainer',
                element: <h2>booked-trainer</h2>
            }
        ]
    }
])

export default Routes