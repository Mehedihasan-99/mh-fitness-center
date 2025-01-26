import { useEffect, useState } from "react";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../../Hooks/UseAuth";
import useAxiosClient from "../../../../Hooks/useAxiosClient";

const ActivityLog = () => {
    const { user } = useAuth();
    const [userInfo, setUserInfo] = useState([])
    const axiosClient = useAxiosClient();
    useEffect(() => {
        axiosClient.get(`/users/${user?.email}`)
            .then(res => {
                console.log(res.data);
                setUserInfo(res.data)
            })
    }, [user?.email])
    return (
        <div className="flex flex-col items-center bg-gray-100 py-16 mb-4 md:mb-10 lg:mb-20">
            <div className="min-w-80 mx-auto">
                <SectionTitle
                    firstTitle="activity"
                    secondTitle='log'
                />
            </div>
            <div className="w-full overflow-x-auto">
                <table className="w-full text-center border border-separate rounded border-slate-200" cellspacing="0">
                    <tbody>
                        <tr>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Name</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Email</th>
                            <th scope="col" className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Status</th>
                        </tr>
                        {
                            userInfo.status &&
                            <tr className="transition-colors duration-300 hover:bg-slate-50">
                                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 "> {userInfo.name}</td>
                                <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{userInfo.email}</td>
                                <td className={`h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ${userInfo.status === 'pending' ? 'bg-yellow-400' : 'bg-green-500'}`}>{userInfo.status}</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ActivityLog;