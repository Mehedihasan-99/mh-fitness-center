import useAxiosClient from "./useAxiosClient";
import { useQuery } from "@tanstack/react-query";

const useMembers = () => {
    const axiosClient = useAxiosClient();

    const { data: members = [], isLoading: isMembersLoading, error, refetch } = useQuery({
        queryKey: ["appliedTrainer"],
        queryFn: async () => {
            const res = await axiosClient.get("users/admin/all-members");
            return res.data || [];
        },
    });

    return [members, isMembersLoading, error, refetch];
};


export default useMembers;