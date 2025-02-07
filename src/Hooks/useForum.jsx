import useAxiosClient from './useAxiosClient';
import { useQuery } from '@tanstack/react-query';

const useForum = () => {
    const axiosClient = useAxiosClient()

    const { data: forums = [] } = useQuery({
        queryKey: ['forum'],
        queryFn: async() => {
            const res = await axiosClient.get('forums')
            return res.data;
        }
    })
    return { forums }
};

export default useForum;