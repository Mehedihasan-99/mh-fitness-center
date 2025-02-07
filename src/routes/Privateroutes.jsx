import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";
import Loading from "../components/Loading/Loading";


const Privateroutes = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading){
        return <Loading />
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{form: location}} replace ></Navigate>
};

export default Privateroutes;