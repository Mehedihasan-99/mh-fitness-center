import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useNewsletter = () => {
    const axiosSecure = useAxiosSecure();

    const { data: newsletter = [], isLoading: isNewsLetterLoading } = useQuery({
        queryKey: ['newsletter'],
        queryFn: async () => {
            const res = await axiosSecure.get('/newsletter/admin')
            return res.data
        }
    })

    return [newsletter, isNewsLetterLoading]
};

export default useNewsletter;