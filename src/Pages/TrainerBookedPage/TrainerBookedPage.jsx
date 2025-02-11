import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const TrainerBookedPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { name } = useParams();
    const { trainer, selectedSlot, classes } = location.state || {};

    const [selectedPackage, setSelectedPackage] = useState(null);
    console.log(selectedPackage)

    const packages = [
        {
            name: "Basic Membership",
            benefits: ["Access to gym facilities", "Use of cardio & strength training equipment"],
            price: 10,
            color: "from-blue-100 to-blue-200",
        },
        {
            name: "Standard Membership",
            benefits: ["All Basic Benefits", "Access to group fitness classes"],
            price: 50,
            color: "from-green-100 to-green-200",
        },
        {
            name: "Premium Membership",
            benefits: [
                "All Standard Benefits",
                "Access to personal training sessions",
                "Use of sauna/steam room",
                "Discounts on massage & nutrition counseling",
            ],
            price: 100,
            color: "from-purple-100 to-purple-200",
        },
    ];

    const handleJoinNow = () => {
        if (!selectedPackage) {
            alert("Please select a membership package.");
            return;
        }
        navigate("/dashboard/payment", { state: { trainer, selectedSlot, classes, selectedPackage } });
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-8">
            <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Trainer Booking Details</h2>

            {/* Trainer Info */}
            <div className="mb-8 p-5 border border-gray-300 rounded-lg bg-gray-100 shadow-sm">
                <p className="text-lg font-semibold">Trainer: {name}</p>
                <p>Selected Slot: {selectedSlot}</p>
                <p>Class: {classes}</p>
            </div>

            {/* Membership Packages as Cards */}
            <h3 className="text-2xl font-bold mb-5 text-center text-gray-800">Choose a Membership Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {packages.map((pkg, index) => (
                    <div
                        key={index}
                        className={`p-6 rounded-2xl border-2 shadow-md flex flex-col cursor-pointer transition-all bg-gradient-to-br ${pkg.color} 
                        ${selectedPackage === pkg
                                ? "border-blue-500 ring-4 ring-blue-300 scale-105 shadow-lg"
                                : "hover:shadow-lg hover:scale-105"
                            }`}
                        onClick={() => setSelectedPackage(pkg)}
                    >
                        <h4 className="text-xl font-bold text-gray-800 mb-3">{pkg.name}</h4>
                        <ul className="flex-1 list-disc ml-5 text-sm text-gray-700 space-y-1">
                            {pkg.benefits.map((benefit, idx) => (
                                <li key={idx}>{benefit}</li>
                            ))}
                        </ul>
                        <p className="mt-4 text-lg font-bold text-blue-700">${pkg.price}</p>
                        <div className="mt-4 flex justify-center">
                            <input
                                type="radio"
                                name="membership"
                                value={pkg.name}
                                checked={selectedPackage?.name === pkg.name} // Compare by name
                                onChange={() => setSelectedPackage(pkg)}
                                className={`cursor-pointer w-5 h-5 ${selectedPackage?.name === pkg.name ? "accent-blue-600" : "accent-gray-400"
                                    }`}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Join Now Button */}
            <div className="mt-8 text-center">
                <button
                    onClick={handleJoinNow}
                    className="bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md"
                >
                    Join Now
                </button>
            </div>
        </div>
    );
};

export default TrainerBookedPage;
