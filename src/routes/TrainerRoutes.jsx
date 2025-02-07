import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";
import useTrainer from "../Hooks/useTrainer";
import Loading from "../components/Loading/Loading";

const TrainerRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const [isTrainer, isLoading] = useTrainer();
    const location = useLocation();

    if (loading || isLoading) return <Loading />

    if (user && isTrainer) return children

    return <Navigate to="/login" state={{ form: location }} replace ></Navigate>
};

export default TrainerRoutes;