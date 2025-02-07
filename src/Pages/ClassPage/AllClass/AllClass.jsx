import { Link } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import useClass from "../../../Hooks/useClass";

const Allclass = () => {
    const [classes, isLoading] = useClass();
    if (isLoading) return <Loading />;

    return (
        <div className="p-6">
            <h2 className=" text-2xl md:text-5xl font-bold text-center mb-4 md:mb-10">All Class {classes.length}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    classes.map(item => <div
                        key={item._id}
                        className="overflow-hidden flex flex-col gap-5 rounded bg-white text-slate-500 shadow-md shadow-slate-200">
                        <figure>
                            <img
                                src={item.photo}
                                alt={item.name}
                                className="aspect-video w-full"
                            />
                        </figure>
                        <div className="px-6 flex-1 grid grid-cols-5">
                            {
                                item.trainers?.map(trainer => (<div
                                    key={trainer.trainerId}
                                    className="ml-auto flex items-center px-6 lg:ml-0 lg:p-0"
                                >
                                    <Link to={`/trainers/${trainer.trainerId}`}>
                                        <img
                                            src={trainer.trainerImage}
                                            alt="user name"
                                            title={trainer.trainerName}
                                            className="max-w-full h-14 rounded-full"
                                        />
                                    </Link>
                                </div>))
                            }
                        </div>
                        <div className="px-6 pb-6">
                            <header className="">
                                <h3 className="text-xl md:text-3xl mb-2  font-medium text-slate-700">
                                    {item.name}
                                </h3>
                                <p className="text-sm text-slate-400"> {item.details.slice(0, 150)}.....</p>
                            </header>
                        </div>
                    </div>)
                }
            </div>
        </div >
    );
};

export default Allclass;