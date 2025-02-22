import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import useClass from "../../../Hooks/useClass";
import { FaRegBookmark, FaStar } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { Helmet } from "react-helmet-async";

const Allclass = () => {
    const [search, setSearch] = useState("");
    const [classes, isLoading] = useClass(search); // Pass search query to hook

    if (isLoading) return <Loading />;

    return (
        <div className="p-6">
            <Helmet>
                <title>MH Fitness Center | All Classes</title>
            </Helmet>
            <h2 className="text-2xl md:text-5xl font-bold text-center mb-4 md:mb-10">
                All Classes ({classes.length})
            </h2>

            {/* Search Input */}
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Search for a class..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-md p-2 border rounded-md"
                />
            </div>

            {/* Display Classes */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {classes.map((item) => {
                    const averageRating =
                        item.rating && item.rating.length > 0
                        ? item.rating.reduce((sum, r) => sum + r, 0) / item.rating.length
                        : 0;

                    return (
                        <div
                            key={item._id}
                            className="overflow-hidden flex flex-col gap-5 rounded bg-white text-slate-500 shadow-md"
                        >
                            <figure>
                                <img src={item.photo} alt={item.name} className="aspect-video w-full" />
                            </figure>
                            <div className="px-6 flex justify-between">
                                <p className="flex items-center text-sm gap-1">
                                    Rating: {averageRating.toFixed(1)}
                                    <FaStar className="size-3 text-yellow-400" />
                                </p>
                                <p className="flex items-center text-sm gap-1">
                                    Booked: {item.booked || 0}{" "}
                                    {item.booked ? (
                                        <FaBookmark className="size-3 text-blue-500" />
                                    ) : (
                                        <FaRegBookmark className="size-3" />
                                    )}
                                </p>
                            </div>
                            <div className="px-6 flex-1 grid grid-cols-5 gap-2">
                                {item.trainers?.map((trainer) => (
                                    <div key={trainer.trainerId} className="ml-auto flex items-center px-6 lg:ml-0 lg:p-0">
                                        <Link to={`/trainers/${trainer.trainerId}`}>
                                            <img src={trainer.trainerImage} alt={trainer.trainerName} title={trainer.trainerName} className="max-w-full rounded-full" />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            <div className="px-6 pb-6">
                                <h3 className="text-xl md:text-3xl mb-2 font-medium text-slate-700">{item.name}</h3>
                                <p className="text-sm text-slate-400">{item.details.slice(0, 150)}.....</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Allclass;
