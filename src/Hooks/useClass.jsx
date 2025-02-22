import { useQuery } from "@tanstack/react-query";
import useAxiosClient from "./useAxiosClient";

const useClass = (searchQuery) => {
    const axiosClient = useAxiosClient();

    const { data: classes = [], isPending: isLoading, error, refetch } = useQuery({
        queryKey: ["classes", searchQuery],
        queryFn: async () => {
            const res = await axiosClient.get(`/classes?search=${searchQuery || ''}`);
            return res.data || [];
        },
    });

    return [classes, isLoading, error, refetch];
};

export default useClass;
