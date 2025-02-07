import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { FaDeleteLeft } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAllTrainer from "../../../../Hooks/useAllTrainer";

const Trainers = () => {
    const axiosSecure = useAxiosSecure()
    const [trainers, refetch] = useAllTrainer()

    const handleDelete = async (item) => {
        const res = await axiosSecure.patch(`/users/admin/delete-Trainer/${item._id}`)
        console.log('result: ', item._id, res.data)
        if (res.data.status) {
            Swal.fire({
                icon: "success",
                title: "Reject Trainer application successfully",
                text: "Success !!.",
            });
            refetch()
        };
    }


    return (
        <div className="flex flex-col items-center bg-gray-100 py-16 mb-4 md:mb-10 lg:mb-20">
            <div className="min-w-80 mx-auto">
                <SectionTitle
                    firstTitle="all"
                    secondTitle='trainers'
                />
            </div>
            <div className="w-full p-4 overflow-x-auto">
                {trainers.length > 0 ? (
                    <table className="w-full text-left border-collapse rounded-lg border border-slate-200">
                        <thead>
                            <tr className="bg-slate-200  text-xs ">
                                <th className="px-4 py-3 text-slate-700">#</th>
                                <th className="px-4 py-3 min-w-40 text-slate-700">Trainer Name</th>
                                <th className="px-4 py-3 text-slate-700">Email</th>
                                <th className="px-4 py-3 text-slate-700">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trainers.map((item, index) => (
                                <tr
                                    key={item._id}
                                    className="transition-colors duration-300 text-xs text-slate-800 hover:bg-slate-50"
                                >
                                    <td className="px-4 py-3 border-t">
                                        {index + 1}
                                    </td>
                                    <td className="px-4 py-3 flex items-center gap-2 md:gap-4 border-t">
                                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full" />{item.name}
                                    </td>
                                    <td className="px-4 py-3 border-t">
                                        {item.email}
                                    </td>
                                    <td className="px-4 py-3 text-center border-t">
                                        <button
                                            aria-label="Reject action"
                                            onClick={() => handleDelete(item)}
                                            className="p-2 rounded-full text-red-600 bg-red-200 hover:bg-red-300"
                                        >
                                            <FaDeleteLeft />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-sm text-slate-500">
                        No records found.
                    </p>
                )}
            </div>

        </div>
    );
};

export default Trainers;