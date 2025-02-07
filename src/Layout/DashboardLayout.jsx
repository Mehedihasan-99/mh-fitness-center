import { useState } from "react";
import useAuth from "../Hooks/UseAuth";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBackward, FaCalendarCheck, FaHome, FaUser } from "react-icons/fa";
import { FaA, FaLeaf } from "react-icons/fa6";
import Loading from "../components/Loading/Loading";
import useAdmin from "../Hooks/useAdmin";
import useTrainer from "../Hooks/useTrainer";

const DashboardLayout = () => {
    const { logout, loading } = useAuth();
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const navigate = useNavigate();
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isTrainer, isTrainerLoading] = useTrainer();

    const handleLogout = () => {
        logout();
        navigate("/")
    }

    if (loading && isAdminLoading, isTrainerLoading) return <Loading />

    return (
        <div className="lg:flex bg-blue-100">
            <div className="w-72">
                {/*  <!-- Mobile trigger --> */}
                <button
                    title="Side navigation"
                    type="button"
                    className={`visible fixed right-6 top-6 z-40 order-10 block h-10 w-10 self-center rounded bg-slate-400 opacity-100 lg:hidden ${isSideNavOpen
                        ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
                        : ""
                        }`}
                    aria-haspopup="menu"
                    aria-label="Side navigation"
                    aria-expanded={isSideNavOpen ? " true" : "false"}
                    aria-controls="nav-menu-2"
                    onClick={() => setIsSideNavOpen(!isSideNavOpen)}
                >
                    <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                        <span
                            aria-hidden="true"
                            className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-700 transition-all duration-300"
                        ></span>
                        <span
                            aria-hidden="true"
                            className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
                        ></span>
                        <span
                            aria-hidden="true"
                            className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
                        ></span>
                    </div>
                </button>


                <aside
                    id="nav-menu-2"
                    aria-label="Side navigation"
                    className={`max-w-7xl fixed top-0 bottom-0 z-30 flex w-72 flex-col border-r border-r-slate-200 bg-slate-300 transition-transform lg:translate-x-0 ${isSideNavOpen ? "translate-x-0" : " -translate-x-full"
                        }`}
                >
                    <Link to="/" className="p-4" >
                        <div className="flex items-end gap-2">
                            <h2 className="text-4xl md:text-4xl font-bold">MH</h2>
                            <div>
                                <p className="text-xs -mb-2">FitNess</p>
                                <span >center</span>
                            </div>
                        </div>
                    </Link>
                    <nav
                        aria-label="side navigation"
                        className="flex-1 divide-y divide-slate-100 overflow-auto"
                    >
                        <div>
                            <ul className="flex flex-1 flex-col gap-1 py-3">
                                {
                                    isAdmin ? <>
                                        <li className="px-3">
                                            <NavLink
                                                to="admin/newsletters"
                                                className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                            >
                                                <FaCalendarCheck />
                                                <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                    All Newsletter Section
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="px-3">
                                            <NavLink
                                                to="admin/all-trainers"
                                                className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                            >
                                                <FaCalendarCheck />
                                                <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                    All Trainers
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="px-3">
                                            <NavLink
                                                to="admin/applied-trainer"
                                                className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                            >
                                                <FaCalendarCheck />
                                                <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                    Applied Trainer
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="px-3">
                                            <NavLink
                                                to="admin/balance"
                                                className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                            >
                                                <FaCalendarCheck />
                                                <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                    Balance
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="px-3">
                                            <NavLink
                                                to="admin/add-class"
                                                className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                            >
                                                <FaCalendarCheck />
                                                <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                    Add Class
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="px-3">
                                            <NavLink
                                                to="admin/add-forum"
                                                className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                            >
                                                <FaCalendarCheck />
                                                <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                    Add Forum
                                                </div>
                                            </NavLink>
                                        </li>
                                    </> :
                                        isTrainer ? <>
                                            <li className="px-3">
                                                <NavLink
                                                    to="trainer/manage-slots"
                                                    className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                                >
                                                    <FaCalendarCheck />
                                                    <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                        Manage Slots
                                                    </div>
                                                </NavLink>
                                            </li>
                                            <li className="px-3">
                                                <NavLink
                                                    to="trainer/add-slots"
                                                    className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                                >
                                                    <FaCalendarCheck />
                                                    <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                        Add New Slots
                                                    </div>
                                                </NavLink>
                                            </li>
                                            <li className="px-3">
                                                <NavLink
                                                    to="trainer/add-forum"
                                                    className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                                >
                                                    <FaCalendarCheck />
                                                    <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                        Add New Forum
                                                    </div>
                                                </NavLink>
                                            </li>
                                        </> : <>
                                            <li className="px-3">
                                                <NavLink
                                                    to="profile"
                                                    className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                                >
                                                    <FaUser />
                                                    <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                        User Profile
                                                    </div>
                                                </NavLink>
                                            </li>
                                            <li className="px-3">
                                                <NavLink
                                                    to="activity-log"
                                                    className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                                >
                                                    <FaA />
                                                    <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                        Activity Log
                                                    </div>
                                                </NavLink>
                                            </li>
                                            <li className="px-3">
                                                <NavLink
                                                    to="be-a-trainer"
                                                    className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                                >
                                                    <FaLeaf />
                                                    <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                        Be A Trainer
                                                    </div>
                                                </NavLink>
                                            </li>
                                            <li className="px-3">
                                                <NavLink
                                                    to="booked-trainer"
                                                    className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                                >
                                                    <FaCalendarCheck />
                                                    <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                                        Booked Trainer
                                                    </div>
                                                </NavLink>
                                            </li>
                                        </>
                                }
                            </ul >
                        </div >
                    </nav >
                    <footer className="border-t border-slate-200 p-3">
                        <ul>
                            {
                                (isAdmin || isTrainer) &&
                                <li className="px-3">
                                    <NavLink
                                        to="profile"
                                        className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                    >
                                        <FaUser />
                                        <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                            User Profile
                                        </div>
                                    </NavLink>
                                </li>
                            }
                            <li className="px-3">
                                <Link
                                    to="/"
                                    className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                >
                                    <FaHome />
                                    <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                                        Home
                                    </div>
                                </Link>
                            </li>
                            <li className="px-3">
                                <div
                                    className="flex items-center gap-3 w-full rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "
                                >
                                    <FaBackward />
                                    <button className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm"
                                        onClick={handleLogout}>
                                        logout
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </footer>
                </aside >
                < div
                    className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors sm:hidden ${isSideNavOpen ? "block" : "hidden"
                        }`}
                    onClick={() => setIsSideNavOpen(false)}
                ></div >
            </div >

            <div className="min-h-screen bg-gray-100 p-4 md:p-10 lg:py-20 flex-1"
                onClick={() => setIsSideNavOpen(false)}>
                <div className="p-4 ">
                    <Outlet />
                </div>
            </div>
        </div >
    );
};

export default DashboardLayout;