import { useQuery } from "@tanstack/react-query";
import useAxiosClient from "./useAxiosClient";

const useClass = () => {
    const axiosClient = useAxiosClient();


    const { data: classes = [] ,isPending: isLoading, refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosClient.get('/classes');
            return res.data;
        }
    })
    return [ classes, isLoading,refetch ];
};

export default useClass;