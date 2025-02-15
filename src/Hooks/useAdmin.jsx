import { useQuery } from "@tanstack/react-query";
import useAuth from "./UseAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const { user } =useAuth();
    const axiosSecure = useAxiosSecure();
    // console.log('user', user?.email)
    

    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [ user?.email, 'isAdmin' ],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            return res.data?.admin;
        },
        enabled: !!user?.email,
    })


    return [ isAdmin, isAdminLoading]
};

export default useAdmin;