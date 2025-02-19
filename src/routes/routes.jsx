import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Login from "../Pages/LoginPage/Login";
import SignUp from "../Pages/SignUpPage/SignUp";
import Home from "../Pages/HomePage/Home/Home";
import DashboardLayout from "../Layout/DashboardLayout";
import UserProfile from "../Pages/DashboardPage/UserDashboard/UserProfile/UserProfile";
import AddClass from "../Pages/DashboardPage/AdminDashboard/AddClass/AddClass";
import AllClass from "../Pages/ClassPage/AllClass/AllClass";
import ActivityLog from "../Pages/DashboardPage/UserDashboard/ActivityLog/ActivityLog";
import BeATrainer from "../Pages/DashboardPage/UserDashboard/BeATrainer/BeATrainer";
import AppliedTrainer from "../Pages/DashboardPage/AdminDashboard/AppliedTrainer/AppliedTrainer";
import Trainers from "../Pages/DashboardPage/AdminDashboard/Trainers/Trainers";
import AllTrainer from "../Pages/AllTrainersPage/AllTrainer";
import AddForum from "../Pages/DashboardPage/AdminDashboard/AddForum/AddForum";
import Newsletter from "../Pages/DashboardPage/AdminDashboard/NewsLetter/NewsLetter";
import CommunityForumPage from "../Pages/CommunityForumPage/CommunityForumPage";
import TrainersDetails from "../Pages/AllTrainersPage/TrainersDetails";
import AddNewSlot from "../Pages/DashboardPage/TrainerDashboard/AddNewSlot/AddNewSlot";
import TrainerRoutes from "./Trainerroutes";
import AdminRoutes from "./AdminRoutes"
import ManageSlot from "../Pages/DashboardPage/TrainerDashboard/ManageSlot/ManageSlot";
import TrainerBookedPage from "../Pages/TrainerBookedPage/TrainerBookedPage";
import Payment from "../Pages/PaymentPage/Payment";
import PrivateRoutes from "./Privateroutes";
import BookedTrainer from "../Pages/DashboardPage/UserDashboard/BookedTrainer/BookedTrainer";
import Balance from "../Pages/DashboardPage/AdminDashboard/Balance/Balance";


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
                element: < TrainersDetails />,
            },
            {
                path: '/classes',
                element: <AllClass />
            },
            {
                path: '/community',
                element: <CommunityForumPage />
            },
            {
                path: '/:name/booked-slot/:id',
                element: <PrivateRoutes>
                    <TrainerBookedPage />
                </PrivateRoutes>
            },
            {
                path: 'payment',
                element: <PrivateRoutes>
                    <Payment />
                </PrivateRoutes>
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
        element: <PrivateRoutes>
            <DashboardLayout />
        </PrivateRoutes>,
        children: [
            {
                path: 'admin/newsletters',
                element: <Newsletter />
            },
            {
                path: 'admin/all-trainers',
                element: <Trainers />
            },
            {
                path: 'admin/applied-trainer',
                element: <AppliedTrainer />
            },
            {
                path: 'admin/balance',
                element: <AdminRoutes>
                    <Balance/>
                </AdminRoutes>
            },
            {
                path: 'admin/add-class',
                element: <AddClass />
            },
            {
                path: 'admin/add-forum',
                element: <AddForum />
            },
            // Trainer Routes Start
            {
                path: 'trainer/manage-slots',
                element: <TrainerRoutes>
                    <ManageSlot />
                </TrainerRoutes>
            },
            {
                path: 'trainer/add-slots',
                element: <TrainerRoutes>
                    <AddNewSlot />
                </TrainerRoutes>
            },
            {
                path: 'trainer/add-forum',
                element: <TrainerRoutes>
                    <AddForum />
                </TrainerRoutes>
            },
            // Trainer Routes End
            {
                path: 'profile',
                element: <UserProfile />
            },
            {
                path: 'activity-log',
                element: <ActivityLog />
            },
            {
                path: 'be-a-trainer',
                element: <PrivateRoutes>
                    <BeATrainer />
                </PrivateRoutes>
            },
            {
                path: 'booked-trainer',
                element: <BookedTrainer />
            },
        ]
    }
])

export default Routes