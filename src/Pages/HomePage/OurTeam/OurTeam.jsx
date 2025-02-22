import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAllTrainer from "../../../Hooks/useAllTrainer";
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from "../../../components/Loading/Loading";

const OurTeam = () => {
    const [trainers, isLoading] = useAllTrainer();
    const [currentPage, setCurrentPage] = useState(1);
    const trainersPerPage = 3;

    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
    }, []);

    if (isLoading) return <Loading />;

    // **Pagination Logic**
    const indexOfLastTrainer = currentPage * trainersPerPage;
    const indexOfFirstTrainer = indexOfLastTrainer - trainersPerPage;
    const currentTrainers = trainers.slice(indexOfFirstTrainer, indexOfLastTrainer);
    const totalPages = Math.ceil(trainers.length / trainersPerPage);

    return (
        <div data-aos="fade-up">
            <section className="mb-4 md:mb-10 lg:mb-20 bg-gray-50 py-16">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <SectionTitle firstTitle="our" secondTitle="team" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentTrainers.length === 0 ? (
                            <p>No trainer found</p>
                        ) : (
                            currentTrainers.map((trainer) => (
                                <div
                                    data-aos="fade-down"
                                    data-aos-delay="500"
                                    key={trainer._id}
                                    className="bg-white shadow-lg rounded-lg flex flex-col items-start p-6"
                                >
                                    <div className="mb-4 w-full text-indigo-600">
                                        <img
                                            src={trainer.image}
                                            alt={trainer.name}
                                            className="rounded-tl-3xl h-40 w-full rounded-br-3xl"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{trainer.name}</h3>
                                    <div className="text-gray-600 text-start text-sm mb-2">
                                        <span>Expertise :</span>
                                        <div className="grid grid-cols-2 text-[10px]">
                                            {trainer.skills.map((skill, index) => (
                                                <div key={index}>{skill},</div>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-start text-sm flex-grow">
                                        Biography : {trainer.about.slice(0, 100)}...
                                    </p>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Pagination Controls */}
                    <div className="mt-6 flex justify-center space-x-2">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2 bg-gray-200 rounded-md">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OurTeam;
