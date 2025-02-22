import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosClient from "../../../Hooks/useAxiosClient";
import { Link } from "react-router-dom";


const LatestForum = () => {
    const axiosClient = useAxiosClient();

    const { data: forums = [] } = useQuery({
        queryKey: ['latest forums'],
        queryFn: async () => {
            const res = await axiosClient.get('/latest-forums')
            return res.data
        }
    })


    return (
        <div className="p-6">
            <div className='text-center'>
                <SectionTitle
                    firstTitle={'Latest Community'}
                    secondTitle={'Forums'}
                />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    forums.map(item => <div
                        key={item._id}
                        className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
                        <figure>
                            <img
                                src={item.photo}
                                alt={item.name}
                                className="aspect-video w-full"
                            />
                        </figure>

                        <div className="px-6 pb-6">.
                            <div className="flex items-center gap-4 ">
                                <img
                                    src={item.author.profilePicture}
                                    alt=""
                                    className="w-10 h-10 rounded-full bg-yellow-200"
                                />
                                <div>
                                    <h2 className="text-sm">Name :{item.author.name}</h2>
                                    {item.badge && (
                                        <span className=" text-sm">
                                            Role : {item.badge}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <h3 className="md:text-xl mb-2  font-medium text-slate-700">
                                {item.title}
                            </h3>
                            <p className="text-xs text-slate-400"> {item.content.slice(0, 150)}.....</p>
                        </div>
                    </div>)
                }
            </div>
            <div className='mt-5 text-center'>
                <Link to="/community">
                    <button className="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                        <span>View All </span>
                    </button>
                </Link>
            </div>
        </div>
    );
};


export default LatestForum;