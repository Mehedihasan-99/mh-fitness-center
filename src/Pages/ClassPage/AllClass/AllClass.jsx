import useClass from "../../../Hooks/useClass";

const Allclass = () => {
    const [classes, isLoading, refetch] = useClass()
    return (
        <div className="p-6">
            <h2 className="text-6xl font-bold text-purple-400">class {classes.length}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    classes.map(item => <div
                    key={item._id}
                        className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
                        <figure>
                            <img
                                src={item.photo}
                                alt={item.name}
                                className="aspect-video w-full"
                            />
                        </figure>
                        <div className="p-6">
                            <header className="">
                                <h3 className="text-xl md:text-3xl mb-2  font-medium text-slate-700">
                                    {item.name}
                                </h3>
                                <p className="text-sm text-slate-400"> {item.details.slice(0,150)}.....</p>
                            </header>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Allclass;