import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const Newsletter = () => {
    const axiosSecure = useAxiosSecure();

    const { data = [] } = useQuery({
        queryKey: ['newsletter'],
        queryFn: async () => {
            const res = await axiosSecure.get('/newsletter/admin')
            return res.data
        }
    })

    return (
        <div className="w-full overflow-x-auto">
            <h2 className="text-center uppercase font-bold text-orange-400 md:text-4xl mb-5">news letter</h2>
            <table className="w-full text-left border-2 border-separate border-slate-500" cellspacing="0">
                <tbody>
                    {
                        data.length > 0 ?
                            <>
                                <tr>
                                    <th scope="col" className="h-12 px-6 text-sm font-medium text-center border-2 first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">No</th>
                                    <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">User Name</th>
                                    <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Email</th>
                                </tr>
                                {
                                    data.map((item, index) =>
                                        <tr key={item._id}>
                                            <th scope="row" className="h-12 px-6 text-sm text-center transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{index + 1}</th>
                                            <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{item.name}</td>
                                            <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{item.email}</td>
                                        </tr>)
                                }</> :
                            <p className="text-center text-sm text-slate-500">
                                No records found.
                            </p>
                    }
                </tbody>
            </table>
        </div>
    )
};

export default Newsletter;