import useAuth from './UseAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useTrainer = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();


    const { data: isTrainer, isPending: isTrainerLoading } = useQuery({
        queryKey: [user?.email, 'isTrainer'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/trainer/${user?.email}`);
            return res.data?.trainer;
        },
        enabled: !!user?.email,
    })
    return [isTrainer, isTrainerLoading]

};

export default useTrainer;