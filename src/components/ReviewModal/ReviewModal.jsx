import { useState } from "react";
import Rating from "react-rating";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/UseAuth";

const ReviewModal = ({ isShowing, setIsShowing, selectedClass }) => {
    const axiosSecure = useAxiosSecure();
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const { user } = useAuth();

    const handleReviewChange = (e) => {
        setReview(e.target.value);
    };

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleReviewSubmit = async () => {
        if (!review || rating === 0) {
            Swal.fire("Error", "Please provide a review and rating!", "error");
            return;
        }

        const reviewData = {
            className: selectedClass,
            review: review,
            rating: rating,
            userEmail: user.email,
            date: new Date().toISOString(),
        };

        try {
            const res = await axiosSecure.post(`/reviews/${user.email}`, reviewData);

            if (res.data.upsertedCount) {  // Corrected property name
                Swal.fire("Success", "Your review has been submitted!", "success");
            } else if (res.data.matchedCount) {  // Corrected property name
                Swal.fire("Success", "Your review has been updated!", "success");
            }
            setIsShowing(false);
            setRating(0);
            setReview(' ');
        } catch (error) {
            Swal.fire("Error", "Failed to submit review. Try again!", "error");
        }
    };

    return (
        <>
            {isShowing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[50%] lg:w-[40%]">
                        <h3 className="text-xl font-medium text-gray-700 text-center">Submit Review</h3>
                        <p className="text-gray-500 text-center mb-4">Class: {selectedClass}</p>

                        {/* Rating System */}
                        <div className="flex flex-col items-center">
                            <p className="text-gray-600">Rate the class:</p>
                            <Rating
                                initialRating={rating}
                                onChange={handleRatingChange}
                                emptySymbol={<span className="text-gray-300 text-3xl">☆</span>}
                                fullSymbol={<span className="text-yellow-500 text-3xl">★</span>}
                            />
                        </div>

                        {/* Review Input */}
                        <textarea
                            className="border p-2 w-full rounded mt-4"
                            rows="4"
                            placeholder="Write your review..."
                            value={review}
                            onChange={handleReviewChange}
                        ></textarea>

                        {/* Buttons */}
                        <div className="flex gap-2 justify-end mt-4">
                            <button
                                onClick={handleReviewSubmit}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            >
                                Submit
                            </button>
                            <button
                                onClick={() => setIsShowing(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ReviewModal;
