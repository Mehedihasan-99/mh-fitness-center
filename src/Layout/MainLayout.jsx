import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/navbar';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <div className='pt-28 bg-gray-200 max-w-6xl mx-auto'>
                <Outlet/>
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;