import { useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import ReactStars from "react-rating-stars-component";
import useAxiosClient from "../../../Hooks/useAxiosClient";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading";


const Testimonials = () => {
    const axiosClient = useAxiosClient();

    const { data: testimonials = [], isLoading} = useQuery({
        queryKey: ['reviews'],
        queryFn: async() => {
            const res = await axiosClient.get('/reviews')
            return res.data
        }
    })

    

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
        );
    };

    if(isLoading) return<Loading/>

    return (
        <div className="flex flex-col items-center bg-gray-100 py-16 mb-4 md:mb-10 lg:mb-20">
            <div className="min-w-80 w-full text-center mx-auto">
                <SectionTitle
                    secondTitle='reviews'
                />
            </div>
            <div className="w-full flex flex-col md:flex-row items-center gap-5">
                <div className="px-4 pb-12 w-full ">
                    <h2 className="text-xl font-bold text-center mb-8">What Members Say</h2>
                    <div className="relative">
                        {/* Testimonial Cards */}
                        <div className="flex items-center justify-center gap-6 overflow-hidden">
                            {testimonials
                                .slice(currentIndex, currentIndex + 3)
                                .concat(testimonials.slice(0, Math.max(0, currentIndex + 3 - testimonials.length)))
                                .map((testimonial) => (
                                    <div
                                        key={testimonial._id}
                                        className="bg-white w-1/3 shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
                                    >
                                        <img
                                            src={testimonial.userImage}
                                            alt={testimonial.userName}
                                            className="w-20 h-20 mx-auto rounded-full mb-4"
                                        />
                                        <h3 className="text-lg font-semibold">{testimonial.userName}</h3>
                                        <ReactStars
                                            count={5}
                                            value={testimonial.rating}
                                            edit={false}
                                            size={24}
                                            activeColor="#ffd700"
                                            isHalf={true}
                                        />
                                        <p className="text-gray-500 mt-2">{testimonial.review}</p>
                                    </div>
                                ))}
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-4xl text-blue-300 btn btn-circle btn-outline"
                            onClick={prevSlide}
                        >
                            <FaCircleArrowLeft />
                        </button>
                        <button
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-4xl text-blue-300 btn btn-circle btn-outline"
                            onClick={nextSlide}
                        >
                            <FaCircleArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;