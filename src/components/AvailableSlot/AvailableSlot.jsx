import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxiosClient from "../../Hooks/useAxiosClient";
import Loading from "../Loading/Loading";

const AvailableSlot = ({ email, name, details }) => {
    const axiosClient = useAxiosClient();
    const navigate = useNavigate();

    const { data: slots = [], isLoading, error } = useQuery({
        queryKey: ['slots', email],
        queryFn: async () => {
            const res = await axiosClient.get(`/slots/${email}`);
            return res.data;
        }
    });

    if (isLoading) return <Loading />;
    if (error) return <p className="text-red-500">Error fetching slots</p>;

    const handleBookSlot = (slot) => {
        navigate(`/${name}/booked-slot/${slot._id}`, {
            state: { trainer: { name, email }, selectedSlot: { slotName: slot.slotName, slotId: slot._id }, classes: slot.class }
        });
    };

    return (
        <div className="w-full">
            {slots.some(slot => slot.trainer === email) ? (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-blue-400 text-white">
                            <th className="p-2 border">Slot Name</th>
                            <th className="p-2 border">Class Name</th>
                            <th className="p-2 border">Days</th>
                            {
                                details && <th className="p-2 border">Action</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {slots.filter(slot => slot.trainer === email)
                            .flatMap(slot =>
                                <tr key={`${slot._id}`} className="text-center text-xs *:p-1 bg-gray-100 hover:bg-gray-200">
                                    <td className="border">{slot.slotName}</td>
                                    <td className="border">{slot.class}</td>
                                    <td className="border">{slot.slotDays.join(' , ')}</td>
                                    {
                                        details && <td className="border">
                                            <button
                                                onClick={() => handleBookSlot(slot)}
                                                className={`text-white px-3 py-1 rounded ${slot.status === 'booked' ? 'cursor-not-allowed bg-gray-500' : 'bg-green-500 hover:bg-green-700'}`}
                                                disabled={slot.status === 'booked'}
                                            >
                                                {slot.status === 'booked' ? 'Booked' : 'Book Now'}
                                            </button>
                                        </td>
                                    }
                                </tr>
                            )}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-500 text-center">No available slots.</p>
            )}
        </div>
    );
};

export default AvailableSlot;
