import axios from "axios";


const axiosClient = axios.create({
    // baseURL: "https://mh-fitness-center-server.vercel.app"
    baseURL: "http://localhost:4000"
});

const useAxiosClient = () => {
    return axiosClient
};

export default useAxiosClient;