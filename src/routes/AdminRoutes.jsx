import useAuth from '../Hooks/UseAuth';
import useAdmin from '../Hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading/Loading';

const AdminRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const [ isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation()

    if(loading || isAdminLoading) {
        return <Loading />
    }

    if (user && isAdmin) {
        return children
    }


    return <Navigate to="/login" state={{ form: location}} replace ></Navigate>
};

export default AdminRoutes;