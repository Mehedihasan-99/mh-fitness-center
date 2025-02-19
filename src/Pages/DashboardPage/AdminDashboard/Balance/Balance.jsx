import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import useMembers from "../../../../Hooks/useMembers";
import Loading from "../../../../components/Loading/Loading";
import useNewsletter from "../../../../Hooks/useNewsletter";

const Balance = () => {
    const [members, isMembersLoading] = useMembers();
    const [newsletter, isNewsLetterLoading] = useNewsletter();
    const axiosSecure = useAxiosSecure();

    // Fetch transaction data
    const { data: transaction = [], isLoading } = useQuery({
        queryKey: ['balance'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments/admin');
            return res.data;
        }
    });

    // Calculate total balance
    const totalPrice = transaction.reduce((total, item) => total + item.price, 0);

    // Dynamic chart data
    const chartData = [
        { name: "Paid Members", value: members.length },
        { name: "Newsletter Subscribers", value: newsletter.length }
    ];

    const COLORS = ["#0088FE", "#FFBB28"];

    if (isLoading || isMembersLoading || isNewsLetterLoading) return <Loading />;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="w-full text-center">
                <SectionTitle firstTitle={'Total'} secondTitle={'Balance'} />
            </div>

            {/* Total Balance */}
            <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Total Balance</h2>
                <p className="text-3xl font-semibold text-green-600">${totalPrice}</p>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Last 5 Transactions</h2>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="p-2">Name</th>
                            <th className="p-2">Amount</th>
                            <th className="p-2">Package</th>
                            <th className="p-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...transaction].reverse().slice(0, 5).map((txn) => (
                            <tr key={txn.id} className="border-b">
                                <td className="p-2">{txn.name}</td>
                                <td className="p-2">$ {txn.price}</td>
                                <td className="p-2 text-green-500">{txn.package.split(' ')[0]}</td>
                                <td className="p-2">{txn.orderDate.split('T')[0]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pie Chart */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Subscribers vs Paid Members</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Balance;
