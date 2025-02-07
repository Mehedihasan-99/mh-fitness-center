import useAxiosClient from './useAxiosClient';
import { useQuery } from '@tanstack/react-query';

const useAllTrainer = () => {

    const axiosClient = useAxiosClient()
    const { data: trainers = [],isLoading, refetch } = useQuery({
        queryKey: ['appliedTrainer'],
        queryFn: async () => {
            const res = await axiosClient.get(`users/admin/all-trainer`);
            console.log(res.data)
            return res.data;
        }
    });
    return [trainers, isLoading, refetch]
};

export default useAllTrainer;