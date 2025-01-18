import { useForm } from 'react-hook-form';

const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log("Login Data:", data);
        alert("Login Successful!");
        reset()
    };

    return (
        <div>
            <div className="w-11/12 mx-auto lg:max-w-7xl">
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="w-full max-w-lg p-16 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
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
                                    Email
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;