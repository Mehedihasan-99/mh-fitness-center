import { FaFacebook, FaInstagram, FaLinkedin, FaPhoneAlt, FaTwitter } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='bg-slate-300 max-w-7xl mx-auto'>
            <footer className="w-11/12 mx-auto  lg:max-w-5xl">
                <div className="pb-4 lg:pb-12 pt-16 text-sm">
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-8 lg:grid-cols-12">
                        <nav
                            className="col-span-2 md:col-span-4 lg:col-span-3"
                            aria-labelledby="footer-product-light"
                        >
                            <div className="flex items-end text-red-600 gap-2 mb-5">
                                <h2 className="text-4xl font-bold">MH </h2>
                                <div>
                                    <p className="text-xs -mb-2">FitNess</p>
                                    <span >center</span>
                                </div>
                            </div>
                            <div className='flex flex-col w-3/4 items-center gap-6'>
                                <p
                                    className=" text-xs font-medium text-emerald-700"
                                    id="footer-product-light"
                                >
                                    At MH Fitness Center, We provide one of the best gymnasium service where you can fit
                                </p>
                                <div className='flex items-center gap-2 '>
                                    <FaFacebook />
                                    <FaLinkedin />
                                    <FaInstagram />
                                    <FaTwitter />
                                </div>
                            </div>
                        </nav>
                        <nav
                            className="col-span-2 md:col-span-4 lg:col-span-3"
                            aria-labelledby="footer-docs-light"
                        >
                            <h3
                                className="mb-3 text-base font-medium text-emerald-700"
                                id="footer-docs-light"
                            >
                                Quick Links
                            </h3>
                            <ul className='space-y-3'>
                                <li><NavLink to='/'>Home</NavLink></li>
                                <li><NavLink to='/trainers'>Trainers</NavLink></li>
                                <li><NavLink to='/classes'>Classes</NavLink></li>
                                <li><NavLink to='/community'>Community</NavLink></li>
                            </ul>
                        </nav>
                        <nav
                            className="col-span-2 md:col-span-4 lg:col-span-3"
                            aria-labelledby="footer-docs-light"
                        >
                            <h3
                                className="mb-3 text-base font-medium text-emerald-700"
                                id="footer-docs-light"
                            >
                                Quick Links
                            </h3>
                            <ul className='space-y-3'>
                                <li><NavLink to='/'>Home</NavLink></li>
                                <li><NavLink to='/trainers'>Trainers</NavLink></li>
                                <li><NavLink to='/classes'>Classes</NavLink></li>
                                <li><NavLink to='/community'>Community</NavLink></li>
                            </ul>
                        </nav>
                        <nav
                            className="col-span-2 md:col-span-4 lg:col-span-3"
                            aria-labelledby="footer-get-in-touch-light"
                        >
                            <h3
                                className="mb-6 text-base font-medium text-emerald-700"
                                id="footer-get-in-touch-light"
                            >
                                Contact
                            </h3>
                            <div className='space-y-1'>
                                <span className='flex items-center gap-2'><MdEmail /> : mhfitnesscenter@gmail.com</span>
                                <span className='flex items-center gap-2'><FaPhoneAlt /> : +880 1234567890</span>
                                <span className='flex items-center gap-2'><FaLocationDot /> : Zigatola, Dhanmondi, Dhaka-1205.</span>
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="py-4 text-sm">
                        <div className="flex border-t-4 border-gray-200 border-opacity-90 pt-4 justify-between text-[10px] md:text-base">
                            <p>
                                Copyright {new Date().getFullYear()} All right reserved
                            </p>
                            <p>Terms of use | Privacy policy</p>
                        </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;