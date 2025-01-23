import { useEffect, useState } from 'react';
import axios from 'axios';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { Link } from 'react-router-dom';

const AllTrainer = () => {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        axios.get("Trainer.json")
            .then(res => {
                setTrainers(res.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    };


    return (
        <div className='bg-slate-200 flex flex-col items-center p-4 '>
            <div className='w-full'>
                <div className='w-80 mx-auto'>
                    <SectionTitle firstTitle='All' secondTitle='Trainers' />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {
                        trainers.map(trainer => (
                            <div key={trainer._id} className="overflow-hidden rounded bg-white shadow-md shadow-slate-200">
                                <img
                                    src="https://picsum.photos/id/493/800/600"
                                    alt="card image"
                                    className="rounded-full p-4"
                                />
                                <div className="p-6">
                                    <div className='flex justify-between text-gray-500 text-sm'>
                                        <p>Age:{trainer.age} years</p>
                                        <p>Experience:{trainer.experience}</p>
                                    </div>
                                    <h2 className='text-2xl pt-2 font-bold text-black'>{trainer.name}</h2>
                                    {/* slot  */}
                                    <p className='text-gray-600 font-semibold mt-2'>Available Slot :</p>
                                    <div className='grid gap-2'>
                                        {
                                            trainer.available_slots.map((slot) => (
                                                <p key={slot._id} className=" items-center justify-center w-3/4 md:w-3/4 py-1 px-3 gap-2 text-sm font-medium transition duration-300 rounded border-2 hover:bg-emerald-600">
                                                    {slot}
                                                </p>
                                            ))
                                        }
                                    </div>
                                </div>

                                <div className="flex justify-center pb-6 ">
                                    <button className="py-2 rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300">
                                        <Link to={`trainers/${trainer._id}`}> Know More </Link>
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

    );
};

export default AllTrainer;