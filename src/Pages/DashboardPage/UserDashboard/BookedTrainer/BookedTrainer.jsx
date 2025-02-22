import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/UseAuth";
import Loading from "../../../../components/Loading/Loading";
import moment from "moment/moment";
import { useState } from "react";
import ReviewModal from "../../../../components/ReviewModal/ReviewModal";
import { Helmet } from "react-helmet-async";

const BookedTrainer = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isShowing, setIsShowing] = useState(false);
    const [selectedClass, setSelectedClass] = useState({});

    const { data = [], isLoading } = useQuery({
        queryKey: ["payments"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`);
            return res.data || [];
        },
    });

    const handleReviewSubmit = (className) => {
        setSelectedClass(className);
        setIsShowing(true);
    };

    if (isLoading) return <Loading />

    return (
        <div className="flex flex-col items-center">
            <Helmet>
                <title>MH Fitness Center | Booked Trainers</title>
            </Helmet>
            <h2 className="text-2xl font-semibold mb-4"> Booked Trainer Details</h2>
            {
                data.map(item => (
                    <>
                        <div
                            key={item._id}
                            className="bg-white w-full my-1 p-4 rounded-2xl"
                        >
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h2 className="mb-2 font-semibold">Trainer Info :</h2>
                                    <p className="text-xs text-gray-500">Name: {item.trainerInfo.name}</p>
                                    <p className="text-xs text-gray-500">Email: {item.trainerInfo.email} </p>
                                </div>
                                <div>
                                    <h2 className="mb-2 font-semibold">Classes Info :</h2>
                                    <p className="text-xs text-gray-500"> class Name: {item.classInfo}</p>
                                </div>
                                <div>
                                    <h2 className="mb-2 font-semibold">Slot Info :</h2>
                                    <p className="text-xs text-gray-500">Slot Name: {item.slot.slotName}</p>
                                </div>
                                <div>
                                    <h2 className="mb-2 font-semibold">Others Info :</h2>
                                    <p className="text-xs text-gray-500">Package Name: {item.package}</p>
                                    <p className="text-xs text-gray-500">Price: {item.price} $ </p>
                                    <p className="text-xs text-gray-500">Order Date: {moment(item.orderDate).format("MMMM DD, YYYY")} </p>
                                </div>
                            </div>
                            <div className=" flex justify-end pt-5">
                                <button
                                    onClick={() => { handleReviewSubmit(item.classInfo) }}
                                    className="px-3 py-1 rounded-md bg-blue-300">Review</button>
                            </div>
                        </div>
                        <div className="w-full border-b border-gray-300 my-2 border">
                        </div>
                    </>
                ))
            }
            <ReviewModal
                isShowing={isShowing}
                setIsShowing={setIsShowing}
                selectedClass={selectedClass}
            />
        </div>
    );
};

export default BookedTrainer;