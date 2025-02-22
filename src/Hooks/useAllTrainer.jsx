import useAxiosClient from "./useAxiosClient";
import { useQuery } from "@tanstack/react-query";

const useAllTrainer = () => {
    const axiosClient = useAxiosClient();

    const { data: trainers = [], isLoading, error, refetch } = useQuery({
        queryKey: ["appliedTrainer"],
        queryFn: async () => {
            const res = await axiosClient.get("/users/admin/all-trainer");
            return res.data || [];
        },
    });

    return [trainers, isLoading, error, refetch];
};

export default useAllTrainer;
