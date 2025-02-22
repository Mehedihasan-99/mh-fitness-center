import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { FaCheck, FaDeleteLeft } from "react-icons/fa6";
import Swal from "sweetalert2";
import Loading from "../../../../components/Loading/Loading";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const AppliedTrainer = () => {
    const axiosSecure = useAxiosSecure();
    const { data = [], refetch, isPending } = useQuery({
        queryKey: ['appliedTrainer'],
        queryFn: async () => {
            const res = await axiosSecure.get(`users/admin/applied-trainer`);
            return res.data;
        }
    });

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const [rejectionFeedback, setRejectionFeedback] = useState("");

    const handleConfirm = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are making this person a trainer!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make Trainer!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/make-Trainer/${item._id}`)
                    .then((res) => {
                        if (res.data.status) {
                            Swal.fire({
                                icon: "success",
                                title: "Create Trainer successfully",
                                text: "Success !!.",
                            });
                            refetch();
                        }
                    });
            }
        });
    };

    const handleReject = (item) => {
        setSelectedTrainer(item);
        setIsModalOpen(true);
    };

    const handleSubmitFeedback = () => {
        if (selectedTrainer && rejectionFeedback) {
            axiosSecure.patch(`/users/admin/reject-Trainer/${selectedTrainer._id}`, { rejectionFeedback })
                .then((res) => {
                    if (res.status === 200) {
                        Swal.fire({
                            icon: "success",
                            title: "Trainer application rejected",
                            text: "Rejection feedback has been submitted successfully!",
                        });
                        refetch();
                        setIsModalOpen(false);
                    }
                });
        } else {
            Swal.fire({
                icon: "error",
                title: "Feedback is required",
                text: "Please provide feedback for rejecting the trainer.",
            });
        }
    };

    if (isPending) return <Loading />;

    return (
        <div className="flex flex-col items-center bg-gray-100 py-16 mb-4 md:mb-10 lg:mb-20">
            <Helmet>
                <title>MH Fitness Center | Applied Trainers</title>
            </Helmet>
            <div className="min-w-80 w-full text-center mx-auto">
                <SectionTitle firstTitle="applied" secondTitle="trainer" />
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
                                <tr key={item._id} className="transition-colors duration-300 hover:bg-slate-50">
                                    <td className="px-4 py-3 text-sm text-slate-500 border-t">{index + 1}</td>
                                    <td className="px-4 py-3 text-sm text-slate-500 border-t">{item.name}</td>
                                    <td className="px-4 py-3 text-sm text-slate-500 border-t">{item.email}</td>
                                    <td
                                        className={`px-4 py-3 text-sm font-semibold text-white border-t ${item.status === "pending"
                                            ? "bg-yellow-400"
                                            : "bg-green-500"}`}
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
                    <p className="text-center text-sm text-slate-500">No records found.</p>
                )}
            </div>

            {/* Modal for rejection feedback */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-lg">
                        <h2 className="text-lg font-bold mb-4">Reject Trainer Application</h2>
                        <p><strong>Name:</strong> {selectedTrainer.name}</p>
                        <p><strong>Email:</strong> {selectedTrainer.email}</p>
                        <textarea
                            placeholder="Enter rejection feedback..."
                            className="w-full p-2 mt-4 border border-gray-300 rounded"
                            value={rejectionFeedback}
                            onChange={(e) => setRejectionFeedback(e.target.value)}
                        ></textarea>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={handleSubmitFeedback}
                                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Submit Feedback
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="ml-2 p-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppliedTrainer;
