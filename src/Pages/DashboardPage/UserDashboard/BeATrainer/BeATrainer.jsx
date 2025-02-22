import { useForm } from 'react-hook-form';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import useAuth from '../../../../Hooks/UseAuth';
import useAxiosClient from '../../../../Hooks/useAxiosClient';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const BeATrainer = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosClient = useAxiosClient()

    const onSubmit = async (data) => {
        const res = await axiosClient.patch('/users', { ...data, status: 'pending' });
        if (res.data) {
            Swal.fire({
                icon: "success",
                title: "Application submit successfully",
                text: "Success !!.",
            });
            reset()
        };


    };


    return (
        <div className="flex flex-col justify-center items-center bg-gray-100 py-16 mb-4 md:mb-10 lg:mb-20">
            <Helmet>
                <title>MH Fitness Center | Be a Trainer</title>
            </Helmet>
            <div className="w-full text-center mx-auto">
                <SectionTitle
                    firstTitle="apply to be a"
                    secondTitle="Trainer"
                />
            </div>
            <div className="w-full px-6 flex flex-col md:flex-row items-center gap-5">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full overflow-hidden rounded bg-slate-300 text-slate-500 shadow-md shadow-slate-200">
                    <div className="grid grid-cols-2 gap-5 px-5  py-10">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <label>Full Name:</label>
                            <input
                                type="text"
                                readOnly
                                defaultValue={user?.displayName || ''}
                                placeholder="Your full name"
                                {...register("name", { required: true })}
                                className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all"
                            />
                            {errors.name && <span className="text-red-500 text-xs">Name is required</span>}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label>Email:</label>
                            <input
                                type="email"
                                readOnly
                                defaultValue={user?.email || ''}
                                placeholder="Your email"
                                {...register("email", { required: true })}
                                className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all"
                            />
                            {errors.email && <span className="text-red-500 text-xs">Email is required</span>}
                        </div>

                        {/* Profile Image URL */}
                        <div className="space-y-2 md:col-span-2">
                            <label>Profile Image URL:</label>
                            <input
                                type="url"
                                placeholder="Profile image URL"
                                defaultValue={user?.photoURL
                                }
                                {...register("image", { required: true })}
                                className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all"
                            />
                            {errors.image && <span className="text-red-500 text-xs">Image is required</span>}
                        </div>

                        {/* Age */}
                        <div className="space-y-2">
                            <label>Age:</label>
                            <input
                                type="number"
                                placeholder="Your age"
                                {...register("age", { required: true })}
                                className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all"
                            />
                            {errors.age && <span className="text-red-500 text-xs">Age is required</span>}
                        </div>

                        {/* Years of Experience */}
                        <div className="space-y-2">
                            <label>Years of Experience:</label>
                            <input
                                type="number"
                                placeholder="Years of experience"
                                {...register("experience", { required: true })}
                                className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all"
                            />
                            {errors.experience && <span className="text-red-500 text-xs">Experience is required</span>}
                        </div>

                        {/* Skills */}
                        <div className="space-y-2 md:col-span-2">
                            <label>Select Your Skills:</label>
                            <div className="grid grid-cols-4 gap-4">
                                {[
                                    { value: "strength-training", label: "Strength Training" },
                                    { value: "cardio-workouts", label: "Cardio Workouts" },
                                    { value: "yoga-instructor", label: "Yoga Instruction" },
                                    { value: "pilates-training", label: "Pilates Training" },
                                    { value: "nutrition-coaching", label: "Nutrition Coaching" },
                                    { value: "weight-loss-programs", label: "Weight Loss Programs" },
                                    { value: "flexibility-training", label: "Flexibility Training" },
                                    { value: "group-exercise", label: "Group Exercise Classes" },
                                    { value: "rehabilitation-fitness", label: "Rehabilitation Fitness" },
                                    { value: "high-intensity-interval-training", label: "HIIT" },
                                    { value: "sports-specific-training", label: "Sports-Specific Training" },
                                    { value: "bodybuilding", label: "Bodybuilding" },
                                ].map((skill) => (
                                    <label key={skill.value} className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            value={skill.value}
                                            {...register("skills", { required: true })}
                                            className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">{skill.label}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.skills && (
                                <span className="text-red-500 text-xs">
                                    Please select at least one skill.
                                </span>
                            )}
                        </div>

                        {/* Available Days */}
                        <div className="space-y-2">
                            <label>Available Days:</label>
                            <div className="grid grid-cols-7 gap-4">
                                {[
                                    { value: "Monday", label: "Mon" },
                                    { value: "Tuesday", label: "Tue" },
                                    { value: "Wednesday", label: "Wed" },
                                    { value: "Thursday", label: "Thu" },
                                    { value: "Friday", label: "Fri" },
                                    { value: "Saturday", label: "Sat" },
                                    { value: "Sunday", label: "Sun" },
                                ].map((day) => (
                                    <label key={day.value} className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            value={day.value}
                                            {...register("availableDays", { required: true })}
                                            className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">{day.label}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.availableDays && <span className="text-red-500 text-xs">Available days are required</span>}
                        </div>

                        {/* Available Time */}
                        <div className="space-y-2">
                            <label>Available Time:</label>
                            <input
                                type="text"
                                placeholder="Available time (e.g., 9 AM - 5 PM)"
                                {...register("availableTime", { required: true })}
                                className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all"
                            />
                            {errors.availableTime && <span className="text-red-500 text-xs">Available time is required</span>}
                        </div>

                        {/* About Yourself */}
                        <div className="space-y-2 md:col-span-2">
                            <label>About Yourself:</label>
                            <textarea
                                placeholder="Tell us about yourself"
                                {...register("about", { required: true })}
                                className="peer h-28 relative w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all"
                            />
                            {errors.about && <span className="text-red-500 text-xs">This field is required</span>}
                        </div>
                    </div>

                    <div className="flex justify-center p-6">
                        <button className="h-10 rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600">
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BeATrainer;
