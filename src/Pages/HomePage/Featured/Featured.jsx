import { FaDumbbell, FaHeartbeat, FaWeightHanging, FaRunning, FaSpa } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";


const Featured = () => {

    const features = [
        {
            id: 1,
            icon: <FaDumbbell />,
            title: "Basic Fitness",
            description: "Please do not re-distribute this template ZIP file on any template collection website. This is not allowed.",
        },
        {
            id: 2,
            icon: <FaHeartbeat />,
            title: "Basic Muscle Course",
            description: "Credit goes to Pexels website for images and video background used in this HTML template.",
        },
        {
            id: 3,
            icon: <FaWeightHanging />,
            title: "Advanced Muscle Course",
            description: "You may want to browse through Digital Marketing or Corporate HTML CSS templates on our website.",
        },
        {
            id: 4,
            icon: <FaRunning />,
            title: "Total Body WorkoutsBody Building Course",
            description: "Suspendisse fringilla et nisi et mattis. Curabitur sed finibus nisi. Integer nibh sapien, vehicula et auctor.",
        },
        {
            id: 5,
            icon: <FaRunning />,
            title: "Jogging & Running",
            description: "Improve your cardiovascular health and stamina with our running and jogging tracks, available indoors and outdoors.",
        },
        {
            id: 6,
            icon: <FaSpa />,
            title: "Yoga & Meditation",
            description: "Unwind and de-stress with our yoga and meditation sessions, focusing on flexibility and mental well-being.",
        },
    ];

    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
    }, []);

    return (
        <div data-aos="fade-up">
            <section className="mb-4 md:mb-10 lg:mb-20 bg-gray-50 py-16">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <SectionTitle firstTitle='Choose' secondTitle="Program"
                    describetion='Training Studio is free CSS template for gyms and fitness centers. You are allowed to use this layout for your business website.' />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature) => (
                            <div data-aos="fade-down" data-aos-delay="500" key={feature.id} className="bg-white shadow-lg rounded-lg flex flex-col items-center p-6">
                                <div className="text-4xl mb-4 text-indigo-600">{feature.icon}</div>
                                <h3 className="text-xl font-medium text-gray-800 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Featured;