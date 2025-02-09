import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/UseAuth";
import Loading from "../../../../components/Loading/Loading";
import { FaEye } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import useAxiosClient from "../../../../Hooks/useAxiosClient";

const ManageSlot = () => {
    const { user, loading } = useAuth();
    const axiosClient = useAxiosClient();
    console.log("user", user.email)

    const { data: slots = [], isLoading } = useQuery({
        queryKey: ['slots', user?.email],
        queryFn: async () => {
            const res = await axiosClient.get(`/slots/${user.email}`);
            console.log('res', res.data)
            return res.data || [];
        },
        enabled: !!user?.email
    });

    if (loading || isLoading) return <Loading />

    return (
        <div className="w-full">
            <div className="w-full overflow-x-auto">
                <h2 className="text-center font-bold text-4xl mb-4">All Slots</h2>
                {
                    slots.length > 0  ?
                        <table className="w-full text-left border border-separate rounded border-slate-200">
                            <tbody>
                                <tr className="bg-blue-400 *:h-12 text-center">
                                    <th scope="col" className="text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 ">Day</th>
                                    <th scope="col" className="text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 ">Slot Name</th>
                                    <th scope="col" className="text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 ">Class Time</th>
                                    <th scope="col" className="text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 ">Class</th>
                                    <th scope="col" className="text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 ">Status</th>
                                    <th scope="col" className="text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 ">Action</th>
                                </tr>
                                {
                                    slots.map(slot => <tr
                                        key={slot._id}
                                        className="transition-colors duration-300 bg-white hover:bg-slate-300 *:px-2 *:h-12 *:text-sm text-center">
                                        <td className=" transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{slot.slotDays.join(' , ')}</td>
                                        <td className=" transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{slot.slotName}</td>
                                        <td className=" transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{slot.slotTime} hr</td>
                                        <td className=" transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 "><span className="border-2 px-2 py-1 rounded-full">{slot.class}</span></td>
                                        <td className=" transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 "><span className="bg-green-200 p-1 px-2 rounded-lg">{slot.status}</span></td>
                                        <td className=" transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 flex space-x-4 ">
                                            <button className="btn px-4 rounded-full hover:text-blue-400 hover:scale-150"><FaEye /></button>
                                            <button className="btn px-4 rounded-full hover:text-red-400 hover:scale-150"><FaDeleteLeft /></button>
                                        </td>
                                    </tr>)
                                }

                            </tbody>
                        </table> :
                        <div className="text-center text-xl text-gray-500 mt-10">No slots available</div>
                }
            </div>
        </div>
    );
};

export default ManageSlot;