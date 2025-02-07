import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { FaCheck, FaDeleteLeft } from "react-icons/fa6";
import Swal from "sweetalert2";
import Loading from "../../../../components/Loading/Loading";

const AppliedTrainer = () => {
    const axiosSecure = useAxiosSecure()
    const { data = [], refetch, isPending } = useQuery({
        queryKey: ['appliedTrainer'],
        queryFn: async () => {
            const res = await axiosSecure.get(`users/admin/applied-trainer`);
            return res.data;
        }
    })

    const handleConfirm = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are make a trainer!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make Trainer !"
        }).then((result) => {
            if (result.isConfirmed) {
                const res = axiosSecure.patch(`/users/admin/make-Trainer/${item._id}`)
                if (res.data.status) {
                    Swal.fire({
                        icon: "success",
                        title: "Create Trainer successfully",
                        text: "Success !!.",
                    });
                };
                refetch()
            }
        });

    }

    const handleReject =  (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const res = axiosSecure.patch(`/users/admin/reject-Trainer/${item._id}`)
                if (res.data.status) {
                    Swal.fire({
                        icon: "success",
                        title: "Reject Trainer application successfully",
                        text: "Success !!.",
                    });
                };
                refetch()
            }
        })

    }

    if (isPending) return <Loading />

    return (
        <div className="flex flex-col items-center bg-gray-100 py-16 mb-4 md:mb-10 lg:mb-20">
            <div className="min-w-80 w-full text-center mx-auto">
                <SectionTitle
                    firstTitle="applied"
                    secondTitle='trainer'
                />
            </div>
            <div className="w-full p-4 overflow-x-auto">
                {data.length > 0 ? (
                    <table className="w-full text-left border-collapse rounded-lg border border-slate-200">
                        <thead>
                            <tr className="bg-slate-100">
                                <th className="px-4 py-3 text-sm font-medium text-slate-700">#</th>
                                <th className="px-4 py-3 text-sm font-medium text-slate-700">Name</th>
                                <th className="px-4 py-3 text-sm font-medium text-slate-700">Email</th>
                                <th className="px-4 py-3 text-sm font-medium text-slate-700">Status</th>
                                <th className="px-4 py-3 text-sm font-medium text-slate-700">Confirm</th>
                                <th className="px-4 py-3 text-sm font-medium text-slate-700">Reject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr
                                    key={item._id}
                                    className="transition-colors duration-300 hover:bg-slate-50"
                                >
                                    <td className="px-4 py-3 text-sm text-slate-500 border-t">
                                        {index + 1}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-slate-500 border-t">
                                        {item.name}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-slate-500 border-t">
                                        {item.email}
                                    </td>
                                    <td
                                        className={`px-4 py-3 text-sm font-semibold text-white border-t ${item.status === "pending"
                                            ? "bg-yellow-400"
                                            : "bg-green-500"
                                            }`}
                                    >
                                        {item.status}
                                    </td>
                                    <td className="px-4 py-3 text-center border-t">
                                        <button
                                            aria-label="Confirm action"
                                            onClick={() => handleConfirm(item)}
                                            className="p-2 rounded-full text-green-600 bg-green-200 hover:bg-green-300"
                                        >
                                            <FaCheck />
                                        </button>
                                    </td>
                                    <td className="px-4 py-3 text-center border-t">
                                        <button
                                            aria-label="Reject action"
                                            onClick={() => handleReject(item)}
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

export default AppliedTrainer;