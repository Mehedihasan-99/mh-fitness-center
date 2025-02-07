import { useForm } from 'react-hook-form';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAuth from '../../../Hooks/UseAuth';
import useAxiosClient from '../../../Hooks/useAxiosClient';

const Newsletter = () => {
    const { register, handleSubmit } = useForm();
    const { user } = useAuth()
    const axiosClient = useAxiosClient();

    const onSubmit = async (data) => {
        console.log('data', data)
        const res = axiosClient.post('/newsletter', data)
        console.log( 'res :', res)
    }

    return (
        <div className="flex flex-col items-center bg-gray-100 py-16 mb-4 md:mb-10 lg:mb-20">
            <div className="min-w-80 mx-auto">
                <SectionTitle
                    secondTitle="Newsletter"
                />
            </div>
            <div className='w-10/12 mx-auto flex flex-col gap-5 md:flex-row'>
                <div className="text-center">
                    <h2 className="text-4xl uppercase font-bold text-gray-800 mb-4">
                        Subscribe to Our Newsletter !!
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Subscribe our news letter to get exciting latest and updated news. So you stay connected to our forums.
                    </p>
                </div>
                <div className="w-full">
                    <form onSubmit={handleSubmit(onSubmit)} className="overflow-hidden rounded text-slate-500">
                        {/*  <!-- Body--> */}
                        <div className="relative mt-4 mb-6">
                                    <input
                                        id="name"
                                        type="text"
                                        defaultValue={user?.displayName}
                                        placeholder="your name"
                                        {...register("name", { required: true })}
                                        className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                                    />
                                    <label
                                        htmlFor="id-b03"
                                        className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                                    >
                                        Name :
                                    </label>
                                </div>
                                <div className="relative mb-6">
                                    <input
                                        id="name"
                                        type="text"
                                        defaultValue={user?.email}
                                        placeholder="your name"
                                        {...register("email", { required: true })}
                                        className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                                    />
                                    <label
                                        htmlFor="id-b03"
                                        className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                                    >
                                        Email :
                                    </label>
                                </div>
                        {/*  <!-- Action base sized basic button --> */}
                        <div className="flex justify-center p-6 ">
                            <button className="h-10 rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                                <span>Subscribe now</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;