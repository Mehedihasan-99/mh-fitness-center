import { useParams } from "react-router-dom";
import AvailableSlot from "../../components/AvailableSlot/AvailableSlot";
import useAxiosClient from "../../Hooks/useAxiosClient";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";

const TrainersDetails = () => {
    const axiosClient = useAxiosClient();
    const { id } = useParams();

    const { data: trainer, isLoading, error } = useQuery({
        queryKey: ['trainerDetails', id],
        queryFn: async () => {
            const res = await axiosClient.get(`users/trainer/${id}`);
            return res.data;
        },
    });

    if (isLoading) return <Loading />;
    if (error) return <div>Error: {error.message}</div>;
    if (!trainer) return <div className="text-red-500 text-center">Trainer not found.</div>;

    return (
        <div className="bg-gray-200 w-10/12 mx-auto my-4 md:my-10 p-6 md:p-10 rounded-lg shadow-lg">
            <h2 className='uppercase font-semibold text-center mb-4 md:mb-10 text-3xl'>Trainer {trainer.name} Details</h2>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className='flex flex-col items-center'>
                    <img
                        src={trainer.image}
                        alt={trainer.name}
                        className="w-40 h-40 rounded-full mb-4"
                    />
                    <div className="w-full pr-5">
                        {trainer.email && <AvailableSlot email={trainer.email} details='details' />}
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl font-bold mb-2">{trainer.name}</h1>
                    <div className='flex justify-between text-gray-500 mb-2'>
                        <p>Age: {trainer.age} years.</p>
                        <p>Experience: {trainer.experience} years</p>
                    </div>
                    <div className='mb-2 text-gray-500'>
                        {trainer.skills?.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </div>
                    <p className='text-gray-500'><strong>Biography:</strong> {trainer.about}</p>
                </div>
            </div>
        </div>
    );
};

export default TrainersDetails;
