import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/UseAuth';
import useAxiosClient from '../../Hooks/useAxiosClient';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import GoogleLogin from '../../components/GoogleLogin/GoogleLogin';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const axiosClient = useAxiosClient();
    const navigate = useNavigate();


    const onSubmit = async (data) => {
        // 1. image upload to image bb
        const imageFile = { image: data.image[0] };
        const res = await axiosClient.post(image_hosting_api, imageFile, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (!res.data.success) {
            Swal.fire({
                icon: "error",
                title: "Image Upload Failed",
                text: "Please try again later.",
            });
            return;
        };
        const photo = res.data.data.display_url;
        const name = data.name;

        try {
            // 2. user Registration
            await createUser(data.email, data.password);
            
            //  3. save username and profile phote 
            await updateUserProfile(name, photo);
            const userInfo = {
                name,
                image: photo,
                email: data.email,
                role: "member",
            };
            const userRes = await axiosClient.post("/users", userInfo);

            if (userRes.data.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: "Sign Up is Successfully Completed",
                    icon: "success",
                    confirmButtonText: "Close",
                });
                reset();
                navigate(location?.state?.from || "/");
            }
        } catch (error) {
            const message = getAuthErrorMessage(error.code);
            console.log('error: ', error)
            Swal.fire({
                icon: "error",
                title: "Sign-Up Failed",
                text: message,
            });
        }
    };

    const getAuthErrorMessage = (code) => {
        const messages = {
            "auth/email-already-in-use": "The email address is already registered.",
            "auth/user-not-found": "User not found. Please check your email.",
            "auth/wrong-password": "Incorrect password. Please try again.",
            "auth/too-many-requests": "Too many failed attempts. Try again later.",
            "auth/invalid-credential": "Invalid credentials provided.",
        };
        return messages[code] || "An unknown error occurred. Please try again.";
    };




    return (
        <div>
            <div className="w-11/12 mx-auto lg:max-w-7xl">
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="w-full max-w-lg p-16 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign Up</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            {/* Name Field */}
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Name :
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    {...register("name", { required: "Name is required" })}
                                    className={`mt-1 block w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.name ? "border-red-500" : "border-gray-300"
                                        }`}
                                />
                                {errors.name && (
                                    <span className="text-sm text-red-500">{errors.name.message}</span>
                                )}
                            </div>
                            {/* Email Field */}
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email :
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    {...register("email", { required: "Email is required" })}
                                    className={`mt-1 block w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? "border-red-500" : "border-gray-300"
                                        }`}
                                />
                                {errors.email && (
                                    <span className="text-sm text-red-500">{errors.email.message}</span>
                                )}
                            </div>
                            {/* image Field */}
                            <div className="mb-4">
                                <label
                                    htmlFor="photo"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Photo :
                                </label>
                                <input
                                    id="image"
                                    type="file"
                                    {...register("image", { required: "photo is required" })}
                                    className={`mt-1 block w-full px-4 py-2 text-sm  rounded-lg focus:ring-2  focus:border-transparent ${errors.image ? "border-red-500" : "border-gray-300"
                                        }`}
                                />
                                {errors.image && (
                                    <span className="text-sm text-red-500">{errors.email.message}</span>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="mb-4">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,20}$/ })}
                                    className={`mt-1 block w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? "border-red-500" : "border-gray-300"
                                        }`}
                                />
                                {errors.password?.type === "required" && (
                                    <small className="text-red-500">Password is required.</small>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <small className="text-red-500">
                                        Password must include at least 1 uppercase letter, 1 lowercase letter, and 1 number.
                                    </small>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <small className="text-red-500">Password must be at least 6 characters long.</small>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <small className="text-red-500">Password must be at most 20 characters long.</small>
                                )}
                            </div>
                            {/* Submit Button */}
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className='w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>

                        {/* Additional Links */}
                        <div className="mt-4 text-sm text-center text-gray-600">
                            <p>
                                Already have an account?{" "}
                                <Link to="/sign-up" className="text-blue-500 hover:underline">
                                    Login
                                </Link>
                            </p>
                            <GoogleLogin />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;