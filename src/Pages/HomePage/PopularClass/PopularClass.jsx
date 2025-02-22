import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import useAxiosClient from '../../../Hooks/useAxiosClient';
import { FaBookmark, FaRegBookmark, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PopularClass = () => {
    const axiosClient = useAxiosClient()

    const { data: topClasses = [] } = useQuery({
        queryKey: ['toop-classes'],
        queryFn: async () => {
            const res = await axiosClient.get('/top-classes')
            return res.data
        }
    })

    return (
        <div className="flex flex-col items-center bg-gray-100 py-16 mb-4 md:mb-10 lg:mb-20">
            <div className="min-w-80 w-full text-center mx-auto">
                <SectionTitle
                    firstTitle='Top-booked'
                    secondTitle='class'
                />
            </div>
            <div className="w-11/12 md:w-full grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:mx-5">
                {topClasses.map((item) => {
                    // Calculate average rating
                    const averageRating =
                        item.rating && item.rating.length > 0
                        && item.rating.reduce((sum, r) => sum + r, 0) / item.rating.length;

                    return (
                        <div
                            key={item._id}
                            className="overflow-hidden flex flex-col gap-5 rounded bg-white text-slate-500 shadow-md shadow-slate-200"
                        >
                            <figure>
                                <img
                                    src={item.photo}
                                    alt={item.name}
                                    className="aspect-video w-full"
                                />
                            </figure>
                            <div className="px-6 flex justify-between">
                                {/* Display Average Rating */}
                                <p className="flex items-center text-sm gap-1">
                                    Rating: {averageRating || 0}
                                    <FaStar className={`size-3 ${averageRating && 'text-yellow-400'}`} />
                                </p>

                                {/* Display Booked Status */}
                                <p className="flex items-center text-sm gap-1">
                                    Booked: {item.booked || 0}{" "}
                                    {item.booked ? (
                                        <FaBookmark className="size-3 text-blue-500" />
                                    ) : (
                                        <FaRegBookmark className="size-3" />
                                    )}
                                </p>
                            </div>
                            <div className="px-6 pb-6">
                                <h3 className="text-xl md:text-3xl mb-2 font-medium text-slate-700">
                                    {item.name}
                                </h3>
                                <p className="text-sm text-slate-400">
                                    {item.details.slice(0, 150)}.....
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className='mt-5'>
                <Link to="/classes">
                    <button className="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                        <span>View All </span>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PopularClass;