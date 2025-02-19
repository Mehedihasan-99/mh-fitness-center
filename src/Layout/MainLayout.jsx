import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/navbar';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
    const location = useLocation();

    const noHeaderFooter = location.pathname.includes('/login') || location.pathname.includes('/sign-up')
    return (
        <div>
            {noHeaderFooter || <Navbar />}
            <div className='flex flex-col justify-center min-h-[calc(100vh-405px)]'>
                <Outlet />
            </div>
            {noHeaderFooter || <Footer />}
        </div>
    );
};

export default MainLayout;