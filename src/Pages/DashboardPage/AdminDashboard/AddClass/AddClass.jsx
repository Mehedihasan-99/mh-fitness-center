import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddClass = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure()

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] };
        const res = await axios.post(image_hosting_api, imageFile, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (res.data.success) {
            Swal.fire({
                icon: "success",
                title: "Image Upload successfully",
                text: "Success !!.",
            });
        };
        const photo = res.data.data.display_url;
        const classInfo = {
            name: data.name,
            photo,
            details: data.details
        }
        try {
            const classAdd = await axiosSecure.post('/classes', classInfo)
            if (classAdd.data.insertedId) {
                Swal.fire({
                    title: "Success!",
                    text: "Class add is Successfully Completed",
                    icon: "success",
                    confirmButtonText: "Close",
                });
                reset();
                // navigate(location?.state?.from || "/");
            }
        } catch (error) {
            const message = error.code.split('/')[1]
            console.log('error :', message)
            Swal.fire({
                icon: "error",
                title: "Sign-Up Failed",
                text: message,
            });
        }

    }

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
                {/*  <!-- Body--> */}
                <div className="p-6">
                    <header className="mb-4 text-center">
                        <h3 className="text-xl font-medium text-slate-700">Login</h3>
                    </header>
                    <div className="flex flex-col md:space-y-8">
                        <div className="grid md:grid-cols-2 md:gap-4">
                            <div className="relative mb-6">
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="your name"
                                    {...register("name", { required: true })}
                                    className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                                />
                                <label
                                    htmlFor="id-b03"
                                    className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                                >
                                    Class Name :
                                </label>
                                {errors.name && <span className="text-red-500 text-xs">Class name is required</span>}
                            </div>
                            <div className="relative mb-6">
                                <input
                                    id="image"
                                    type="file"
                                    name="image"
                                    placeholder="your name"
                                    {...register("image", { required: true })}
                                    className="peer relative h-10 w-full rounded border border-slate-200 px-4 py-2 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                                />
                                <label
                                    htmlFor="id-b03"
                                    className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                                >
                                    Class Image :
                                </label>
                                {errors.image && <span className="text-red-500 text-xs">Image is required</span>}
                            </div>
                        </div>
                        {/*      <!-- Input field --> */}
                        <div className="relative mb-6">
                            <textarea
                                type="text"
                                {...register("details", { required: true })}
                                placeholder="Type your Class details"
                                className="peer relative h-32 md:h-20 w-full rounded border border-slate-200 px-4 pr-12 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                            />
                            <label
                                htmlFor="id-b13"
                                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                            >
                                Class Details :
                            </label>
                            {errors.details && <span className="p-2 text-red-500 text-xs">Details is required</span>}

                        </div>
                    </div>
                </div>
                {/*  <!-- Action base sized basic button --> */}
                <div className="flex justify-end p-6 ">
                    <button className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                        <span>Log in</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddClass;