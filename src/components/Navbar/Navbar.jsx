import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [isToggleOpen, setIsToggleOpen] = useState(false);
    const user = true
    const logout = () => {
        console.log('logout')
    }
    const NavLinks = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/trainers'>Trainers</NavLink></li>
        <li><NavLink to='/classes'>Classes</NavLink></li>
        <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
        <li><NavLink to='/community'>Community</NavLink></li>
    </>


    return (
        <header className="fixed z-20 text-white w-full bg-[#ed002e] after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
            <div className="w-11/12 relative mx-auto lg:max-w-5xl">
                <nav
                    aria-label="main navigation"
                    className="flex h-[5.5rem] items-center justify-between font-medium"
                    role="navigation"
                >
                    {/*      <!-- Brand logo --> */}
                    <div className="flex items-end gap-2">
                        <h2 className="text-4xl md:text-4xl font-bold">MH </h2>
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
                                user ? <button className="rounded-lg px-2 text-xs font-medium bg-blue-200 hover:bg-emerald-100 hover:text-emerald-600 " onClick={logout} >LOGOUT</button> : <button className=" text-xs font-medium bg-blue-200 hover:bg-emerald-100 hover:text-emerald-600 " onClick={logout} ><NavLink to='/login'>LOGIN</NavLink></button>
                            }
                            <div className="ml-auto flex items-center px-2 md:px-6 lg:ml-0 lg:p-0">
                                {/*        <!-- Avatar --> */}
                                <img
                                    src="https://i.pravatar.cc/40?img=35"
                                    alt="user name"
                                    title="user name"
                                    width="40"
                                    height="40"
                                    className="max-w-full rounded-full"
                                />
                                {/*        <!-- End Avatar --> */}
                            </div>
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
        </header>
    );
};

export default Navbar;