import { useQuery } from "@tanstack/react-query";
import useAxiosClient from "../../Hooks/useAxiosClient";
import Loading from "../Loading/Loading";

const AvailableSlot = ({ email, details }) => {
    const axiosClient = useAxiosClient();

    console.log(email)
    const { data: slots = [], isLoading, error } = useQuery({
        queryKey: ['slots', email],
        queryFn: async () => {
            const res = await axiosClient.get(`/slots/${email}`)
            console.log(res)
            return res.data;
        }
    })
    console.log(slots)
    if (isLoading) return <Loading />
    if(error) return <p>Error fetching Slots</p>
    
    return (
        <div>
            {slots.some(slot => slot.trainer === email) && (
                <>
                    <h3 className='text-sm text-blue-400'>Available Slots :</h3>
                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-left border-separate border-spacing border rounded">
                            <tbody>
                                {
                                    details && <tr className="transition-colors duration-300 text-center text-black bg-teal-400 hover:bg-teal-500">
                                        <td className="h-8 text-sm border border-slate-200">
                                            Slot Name
                                        </td>
                                        <td className="h-8 text-sm border border-slate-200">
                                            Class Name
                                        </td>
                                        {
                                            details && <>
                                                <td className="h-8 text-sm border border-slate-200">
                                                    Days
                                                </td>
                                            </>
                                        }
                                    </tr>
                                }
                                {slots
                                    .filter(slot => slot.trainer === email)
                                    .map(slot => (
                                        <tr key={slot._id} className="transition-colors duration-300 text-center bg-teal-200 hover:bg-teal-500">
                                            <td className="h-8 text-sm border border-slate-200 text-slate-500">
                                                {slot.slotName || ''}
                                            </td>
                                            <td className="h-8 text-sm border border-slate-200 text-slate-500">
                                                {slot.class}
                                            </td>

                                            {
                                                details && <>
                                                    <td className="h-8 text-sm border border-slate-200 text-slate-500">
                                                        <p>{slot.slotDays.join(", ")}</p>
                                                    </td>
                                                </>
                                            }
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default AvailableSlot;