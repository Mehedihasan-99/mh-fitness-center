import { Helmet } from "react-helmet-async";
import useNewsletter from "../../../../Hooks/useNewsletter";
import Loading from "../../../../components/Loading/Loading";

const Newsletter = () => {
    const [newsletter, isLoading] = useNewsletter()

    if (isLoading) return <Loading />
    return (
        <div className="w-full overflow-x-auto">
            <Helmet>
                <title>MH Fitness Center | Newsletters</title>
            </Helmet>
            <h2 className="text-center uppercase font-bold text-orange-400 md:text-4xl mb-5">news letter</h2>
            <table className="w-full text-left border-2 border-separate border-slate-500" cellspacing="0">
                <tbody>
                    {
                        newsletter.length > 0 ?
                            <>
                                <tr>
                                    <th scope="col" className="h-12 px-6 text-sm font-medium text-center border-2 first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">No</th>
                                    <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">User Name</th>
                                    <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Email</th>
                                </tr>
                                {
                                    newsletter.map((item, index) =>
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