import { useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import ReactStars from "react-rating-stars-component";


const Testimonials = () => {

    const testimonials = [
        {
            id: 1,
            name: "John Doe",
            image: "https://via.placeholder.com/150",
            review: "This class was amazing! Highly recommended!",
            rating: 5,
        },
        {
            id: 2,
            name: "Jane Smith",
            image: "https://via.placeholder.com/150",
            review: "Great trainers and a positive environment!",
            rating: 4,
        },
        {
            id: 3,
            name: "Michael Brown",
            image: "https://via.placeholder.com/150",
            review: "Learned so much while having fun. Loved it!",
            rating: 5,
        },
        {
            id: 4,
            name: "Emily Johnson",
            image: "https://via.placeholder.com/150",
            review: "Fantastic experience, will definitely come back!",
            rating: 4.5,
        },
        {
            id: 5,
            name: "Chris Williams",
            image: "https://via.placeholder.com/150",
            review: "A life-changing experience. Thank you so much!",
            rating: 5,
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
        );
    };


    return (
        <div className="flex flex-col items-center bg-gray-100 py-16 mb-4 md:mb-10 lg:mb-20">
            <div className="min-w-80 border-4 mx-auto">
                <SectionTitle
                    secondTitle='testimonials'
                />
            </div>
            <div className="w-full flex flex-col md:flex-row items-center gap-5">
                <div className="px-4 py-12 ">
                    <h2 className="text-3xl font-bold text-center mb-8">What Members Say</h2>
                    <div className="relative">
                        {/* Testimonial Cards */}
                        <div className="flex items-center justify-center gap-6 overflow-hidden">
                            {testimonials
                                .slice(currentIndex, currentIndex + 3)
                                .concat(testimonials.slice(0, Math.max(0, currentIndex + 3 - testimonials.length)))
                                .map((testimonial) => (
                                    <div
                                        key={testimonial.id}
                                        className="bg-white w-1/3 shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
                                    >
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-20 h-20 mx-auto rounded-full mb-4"
                                        />
                                        <h3 className="text-lg font-semibold">{testimonial.name}</h3>
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