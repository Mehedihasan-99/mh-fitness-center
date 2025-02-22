import { useEffect, useState } from "react";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../../Hooks/UseAuth";
import useAxiosClient from "../../../../Hooks/useAxiosClient";
import { Helmet } from "react-helmet-async";
import { FaEye } from 'react-icons/fa'; // Importing the eye icon

const ActivityLog = () => {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const [rejectionFeedback, setRejectionFeedback] = useState(""); // To store rejection feedback
    const axiosClient = useAxiosClient();

    useEffect(() => {
        axiosClient.get(`/users/${user?.email}`)
            .then(res => {
                setUserInfo(res.data);
            })
    }, [user?.email]);

    const handleEyeClick = (feedback) => {
        setRejectionFeedback(feedback);
        setIsModalOpen(true); // Open modal when eye icon is clicked
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close modal
    };

    return (
        <div className="flex flex-col items-center bg-gray-100 py-16 mb-4 md:mb-10 lg:mb-20">
            <Helmet>
                <title>MH Fitness Center | Activity log</title>
            </Helmet>
            <div className="min-w-80 mx-auto">
                <SectionTitle firstTitle="activity" secondTitle='log' />
            </div>
            <div className="w-full overflow-x-auto">
                <table className="w-full text-center border border-separate rounded border-slate-200" cellspacing="0">
                    <tbody>
                        <tr>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Name</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Email</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Status</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Action</th>
                        </tr>
                        {
                            userInfo.status && (
                                <tr className="transition-colors duration-300 hover:bg-slate-50">
                                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                                        {userInfo.name}
                                    </td>
                                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500">
                                        {userInfo.email}
                                    </td>
                                    <td className={`h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 font-semibold ${userInfo.status === 'pending' && 'bg-yellow-400'} ${userInfo.status === 'confirm' ? 'bg-green-200 text-blue-700 ' : 'bg-red-300 '}`}>
                                        {userInfo.status}
                                    </td>
                                    <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200">
                                        {userInfo.status === 'reject' && (
                                            <FaEye onClick={() => handleEyeClick(userInfo.feedback)} className="cursor-pointer text-blue-500" />
                                        )}
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

            {/* Modal for rejection feedback */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-lg">
                        <h2 className="text-lg font-bold">Rejection Feedback</h2>
                        <p>{rejectionFeedback}</p>
                        <button className="mt-4 p-2 bg-red-500 text-white" onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActivityLog;
