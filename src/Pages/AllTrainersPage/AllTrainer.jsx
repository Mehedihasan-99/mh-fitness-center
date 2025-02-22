import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import useAllTrainer from '../../Hooks/useAllTrainer';
import { Link } from 'react-router-dom';
import AvailableSlot from '../../components/AvailableSlot/AvailableSlot';
import { Helmet } from 'react-helmet-async';

const AllTrainer = () => {
    const [trainers] = useAllTrainer()
    console.log('All Trainers :', trainers)

    return (
        <div className='bg-slate-200 flex flex-col items-center p-4'>
            <Helmet>
                <title>MH Fitness Center | All Trainers</title>
            </Helmet>
            <div className='w-full'>
                <div className='w-80 mx-auto'>
                    <SectionTitle firstTitle='All' secondTitle='Trainers' />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trainers.map((trainer) => (
                        <div key={trainer.id} className=" flex flex-col shadow-lg p-6 rounded-2xl bg-white group">

                            {/* Trainer Image */}
                            <div className="flex flex-col items-center relative">
                                <img src={trainer.image} alt={trainer.name} className="w-80 h-80 rounded-full mb-4" />
                                {/* Social Icons (Initially Hidden) */}
                                <div className="absolute bottom-10 left-1/2 z-40 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-125">
                                    <div className="flex items-center gap-4 text-2xl bg-white p-2 rounded-full shadow-md">
                                        <FaFacebook className="text-blue-600 cursor-pointer hover:scale-110 transition" />
                                        <FaGithub className="cursor-pointer hover:scale-110 transition" />
                                        <FaLinkedin className="text-blue-600 cursor-pointer hover:scale-110 transition" />
                                    </div>
                                </div>
                            </div>

                            {/* Trainer Details */}
                            <div className="flex-grow space-y-2">
                                <div className="flex justify-between text-gray-400 text-xs">
                                    <p>Age: {trainer.age} years.</p>
                                    <p>Experience: {trainer.experience} years.</p>
                                </div>
                                <h2 className="text-xl font-bold">{trainer.name}</h2>
                                <div className="flex-1">
                                    <AvailableSlot email={trainer.email} />
                                </div>
                            </div>

                            {/* Know More Button */}
                            <div className="flex justify-center">
                                <button className="bg-blue-400 py-2 px-4  rounded-3xl mt-4">
                                    <Link to={`/trainers/${trainer._id}`}>Know More</Link>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllTrainer;
