import { useQuery } from "@tanstack/react-query";
import useAxiosClient from "./useAxiosClient";

const useClass = () => {
    const axiosClient = useAxiosClient();

    const { data: classes = [], isPending: isLoading, error, refetch } = useQuery({
        queryKey: ["classes"],
        queryFn: async () => {
            try {
                const res = await axiosClient.get("/classes");
                console.log("Fetched Classes:", res.data);
                return res.data || [];
            } catch (err) {
                console.error("Error fetching classes:", err);
                throw err;
            }
        },
    });

    return [classes, isLoading, error, refetch];
};

export default useClass;
