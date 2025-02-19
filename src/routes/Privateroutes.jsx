import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";
import Loading from "../components/Loading/Loading";


const PrivateRoutes = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading){
        return <Loading />
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{form: location}} replace />
};

export default PrivateRoutes;