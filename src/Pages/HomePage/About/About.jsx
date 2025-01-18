import { useEffect } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {

    useEffect(() => {
            AOS.init({
                duration: 2000,
            });
        }, []);
    

    return (
        <div className="flex flex-col items-center bg-gray-100 py-16 mb-4 md:mb-10 lg:mb-20">
            <div className="min-w-80 mx-auto">
                <SectionTitle
                    firstTitle="contact"
                    secondTitle='us'
                />
            </div>
            <div className="w-full md:w-3/4 mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center gap-5">
                {/* Left Side - Text Details */}
                <div data-aos="fade-right" className="flex flex-col justify-center  md:text-left md:w-1/2 mb-8 md:mb-0">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        The Story Behind MH Fitness Center
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                        MH Fitness Center began with a simple vision: to create a space
                        where people from all walks of life could prioritize their health
                        and well-being. Founded by fitness enthusiasts, we wanted to share
                        our passion for staying active and living a healthy lifestyle.
                    </p>

                </div>
                <div data-aos="fade-left" className="md:w-1/2">
                    <img
                        src='https://i.ibb.co.com/yNsmmvk/images-6.jpg'
                        alt=""
                        className="w-10/12 mx-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default About;