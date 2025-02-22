import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import useAuth from "../../Hooks/UseAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import GoogleLogin from "../../components/GoogleLogin/GoogleLogin";
import { Helmet } from "react-helmet-async";

const LoginForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [disabled, setDisabled] = useState(true);
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const form = location?.state?.form?.pathname || '/'

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleCaptcha = (e) => {
        const captcha = e.target.value;
        if (captcha.length > 5 && validateCaptcha(captcha)) {
            setDisabled(false);
        };
    };


    const onSubmit = (data) => {
        signIn(data.email, data.password)
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    text: "Login Successfully",
                    icon: "success",
                    timer: 2000,
                });
                reset();
                setDisabled(true);
                navigate(form)
            })
            .catch((err) => {
                let message = "Your email & password do not match.";
                if (err.code === "auth/user-not-found") {
                    message = "User not found. Please check your email.";
                } else if (err.code === "auth/wrong-password") {
                    message = "Incorrect password. Please try again.";
                } else if (err.code === "auth/too-many-requests") {
                    message = "Too many failed attempts. Try again later.";
                } else if (err.code === "auth/invalid-credential") {
                    message = "invalid credential.";
                }
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: message,
                });
            });
    };

    return (
        <div className="w-11/12 mx-auto lg:max-w-7xl">
            <Helmet>
                <title>MH Fitness Center | Login</title>
            </Helmet>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-lg p-16 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Email Field */}
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className={`flex items-center gap-1 text-sm  font-medium  text-gray-700${errors.email ? "border-red-500" : "border-gray-300"
                                    }`}
                            >
                                Email{errors.email && (
                                    <span className="text-red-500">*</span>
                                )}
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                {...register("email", { required: "Email is required" })}
                                className={`mt-1 block w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                        </div>

                        {/* Password Field */}
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className={`flex items-center gap-1 text-sm  font-medium  text-gray-700${errors.password ? "border-red-500" : "border-gray-300"
                                    }`}
                            >
                                Password{errors.password && (
                                    <span className="text-red-500">*</span>
                                )}
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", { required: "Password is required" })}
                                className={`mt-1 block w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                        </div>

                        {/* Captcha */}
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                <LoadCanvasTemplate />
                            </label>
                            <input
                                id="captcha"
                                type="text"
                                onChange={handleCaptcha}
                                placeholder="Type this Captcha"
                                name="captcha"
                                className='mt-1 block w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent '
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="mt-6">
                            <button
                                type="submit"
                                disabled={disabled}
                                className={`w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${disabled ? "bg-gray-500" : "bg-blue-400"}`}
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    {/* Additional Links */}
                    <div className="mt-4 text-sm text-center text-gray-600">
                        <p>
                            Don’t have an account?{" "}
                            <a href="/sign-up" className="text-blue-500 hover:underline">
                                Register
                            </a>
                        </p>
                        <div className="flex justify-center mt-4">
                            <GoogleLogin />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
