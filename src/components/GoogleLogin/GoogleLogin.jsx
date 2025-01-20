import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth";
import useAxiosClient from "../../Hooks/useAxiosClient";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";

const GoogleLogin = () => {
    const { googleLogin } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosClient = useAxiosClient()

    const handleGoogleLogin = () => {
        googleLogin()
            .then((result) => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                };
                axiosClient.post("/users", userInfo)
                    .then(() => {
                        navigate(location.state ? location.state?.from?.pathname : "/");
                        Swal.fire({
                            title: "Success!",
                            text: "Sign Up is Successfully",
                            icon: "success",
                            confirmButtonText: "Close",
                        });
                    })
                    .catch((err) => {
                        Swal.fire("Error", err.message, "error");
                    });
            })
    }

    return (
        <div>
            <p className="font-semibold text-gray-500">Or sign in with</p>
            <div className="flex gap-3">
                <button
                    onClick={handleGoogleLogin}
                    className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-emerald-500 px-6 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                    <FaGoogle />
                    <span className="order-2">Google login</span>
                </button>
            </div>
        </div>
    );
};

export default GoogleLogin;