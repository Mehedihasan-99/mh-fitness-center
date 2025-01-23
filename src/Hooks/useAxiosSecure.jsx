import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./UseAuth";

const axiosSecure = axios.create({
    baseURL: "http://localhost:4000"
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem('access-token')
        console.log('request stopped by interceptors', token);
        config.headers.authorization = `Bearer ${token}`;
        return config;
    },
        (error) => {
            return Promise.reject(error);
        })

    axiosSecure.interceptors.response.use((response) => {
        console.log("response ;" , response)
        return response;
    },
        async (error) => {
            const status = error.response.status
            console.log('status error in the interceptors', status);
            if (status === 401 || status === 403) {
                await logout();
                navigate('/login')
            }
            return Promise.reject(error)
        })


    return axiosSecure;
};

export default useAxiosSecure;