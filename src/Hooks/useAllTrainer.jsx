import useAxiosClient from "./useAxiosClient";
import { useQuery } from "@tanstack/react-query";

const useAllTrainer = () => {
    const axiosClient = useAxiosClient();

    const { data: trainers = [], isLoading, error, refetch } = useQuery({
        queryKey: ["appliedTrainer"],
        queryFn: async () => {
            try {
                const res = await axiosClient.get("users/admin/all-trainer");
                console.log("Fetched Trainers:", res.data);
                return res.data || [];
            } catch (err) {
                console.error("Error fetching trainers:", err);
                throw err;
            }
        },
    });

    return [trainers, isLoading, error, refetch];
};

export default useAllTrainer;
