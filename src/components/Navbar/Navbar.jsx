import { NavLink } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../Hooks/UseAuth";
import Loading from "../Loading/Loading";

const Navbar = () => {
    const [isToggleOpen, setIsToggleOpen] = useState(false);
    const { user, loading, logout } = useAuth();


    const NavLinks = <>
        <li><NavLink
            to='/'
            className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 ">Home</NavLink></li>
        <li><NavLink
            to='/trainers'
            className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 "> Trainers</NavLink></li>
        <li><NavLink
            to='/classes'
            className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 ">Classes</NavLink></li>
        {
            user && <li><NavLink
                to='/dashboard'
                className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 ">Dashboard</NavLink></li>
        }
        <li><NavLink
            to='/community'
            className="flex items-center gap-3 rounded p-3 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-500 ">Community</NavLink></li>
    </>
    if (loading) return <Loading />

    return (
        <div className="sticky top-0 z-50 bg-slate-300">
            <div className="w-11/12 relative mx-auto lg:max-w-5xl">
                <nav
                    aria-label="main navigation"
                    className="flex py-2 items-center justify-between font-medium"
                    role="navigation"
                >
                    <div className="flex items-end gap-2">
                        <h2 className="text-4xl md:text-4xl font-bold">MH</h2>
                        <div>
                            <p className="text-xs -mb-2">FitNess</p>
                            <span >center</span>
                        </div>
                    </div>
                    {/*      <!-- Navigation links --> */}
                    <ul
                        role="menubar"
                        aria-label="Select page"
                        className="hidden lg:flex gap-5">
                        {NavLinks}
                    </ul>
                    <div className="flex">
                        {/*      <!-- Mobile trigger --> */}
                        <button
                            className={`relative order-10 block h-10 w-10 self-center lg:hidden
              ${isToggleOpen
                                    ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
                                    : ""
                                }
            `}
                            onClick={() => setIsToggleOpen(!isToggleOpen)}
                            aria-expanded={isToggleOpen ? "true" : "false"}
                            aria-label="Toggle navigation"
                        >
                            <div className="absolute bg-yellow-500 left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
                                <span
                                    aria-hidden="true"
                                    className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
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
                        <div className="flex md:gap-3">
                            {
                                user ?
                                    <><button className="rounded-lg px-2 text-xs font-medium bg-blue-500 border-none hover:bg-emerald-100 hover:text-emerald-600 " onClick={logout} >LOGOUT</button>
                                        <div className="ml-auto flex items-center px-2 md:px-6 lg:ml-0 lg:p-0">
                                            <img
                                                src={user?.photoURL}
                                                alt="user name"
                                                title="user name"
                                                width="40"
                                                height="40"
                                                className="max-w-full rounded-full"
                                            />
                                        </div> </>
                                    : <NavLink to='/login'><button className="rounded-lg px-5 py-2 text-xs font-medium bg-blue-500 border-none hover:bg-emerald-100 hover:text-emerald-600 " onClick={logout} >LOGIN</button></NavLink>
                            }

                            <ul
                                role="menubar"
                                aria-label="Select page"
                                className={`absolute space-y-2 lg:hidden text-slate-600 right-2 top-24 bg-blue-100 p-4 rounded-xl  ${isToggleOpen
                                    ? "visible opacity-100 backdrop-blur-sm"
                                    : "invisible opacity-0"
                                    }`}
                            >
                                {NavLinks}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;