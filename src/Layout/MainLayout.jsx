import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/navbar';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
    const location = useLocation();

    const noHeaderFooter = location.pathname.includes('/login') || location.pathname.includes('/sign-up')
    return (
        <div>
            { noHeaderFooter || <Navbar /> }
            <Outlet/>
            { noHeaderFooter || <Footer /> }
        </div>
    );
};

export default MainLayout;