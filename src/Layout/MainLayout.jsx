import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/navbar';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <div className='pt-28'>
                <Outlet/>
            </div>
        </div>
    );
};

export default MainLayout;