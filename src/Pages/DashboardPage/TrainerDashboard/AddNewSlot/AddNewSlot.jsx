import { useForm } from 'react-hook-form';
import useAuth from '../../../../Hooks/UseAuth';
import useAxiosClient from '../../../../Hooks/useAxiosClient';
import useClass from '../../../../Hooks/useClass';
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import Loading from '../../../../components/Loading/Loading';
import { useQuery } from '@tanstack/react-query';

const AddNewSlot = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user, loading } = useAuth();
    const [classes] = useClass()
    // const [trainerInfo, setTrainerInfo] = useState(null); // initialize as null
    const axiosClient = useAxiosClient();
    const axiosSecure = useAxiosSecure();

    const {data: trainerInfo ,isLoading, refetch} = useQuery({
        queryKey: ['trainerinfo'],
        queryFn: async() => {
            const res = await axiosClient.get(`/users/${user?.email}`)
            return res.data
        }
    })

    const classNames = [...new Set(classes.map(cls => cls.name))];


    const onSubmit = async (data) => {
        if (trainerInfo?.availableTime < data.slotTime) {
            Swal.fire({
                icon: "error",
                title: "Slot Time Exceeds Availability!",
                text: `Your available time is ${trainerInfo?.availableTime}hour, but you selected slot time is ${data.slotTime} hour.`,
                showConfirmButton: true
            });
            return;
        }
        try {
            const res = await axiosSecure.patch(`/trainer/${trainerInfo._id}`, data)
            if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Your slot has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch()
                reset()
            }
        } catch (error) {
            if (error.response?.status === 400) {
                Swal.fire({
                    icon: "error",
                    title: "Trainer already assigned!",
                    text: error.response.data.message,
                    confirmButtonText: "OK"
                });
            }
        }
    }

    if (loading && isLoading) return <Loading />
    return (
        <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
                {/*  <!-- Body--> */}
                <div className="p-6">
                    <div className="flex flex-col md:space-y-4">
                        <div className="grid md:grid-cols-2 md:gap-2">
                            {/* trainer name */}
                            <div className="relative mb-2">
                                <label>
                                    Name :
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    readOnly
                                    defaultValue={trainerInfo?.name}
                                    className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                                />
                            </div>
                            {/* trainer email */}
                            <div className="relative mb-2">
                                <label>
                                    Email :
                                </label>
                                <input
                                    id="name"
                                    type="email"
                                    readOnly
                                    defaultValue={trainerInfo?.email}
                                    className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                                />
                            </div>
                            {/* available time */}
                            <div className="relative mb-6">
                                <label>
                                    Available Time (Hour) :
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    readOnly
                                    defaultValue={trainerInfo?.availableTime}
                                    className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                                />
                            </div>
                        </div>
                        
                        <div className='border-b-4 border-black my-6'></div>
                        {/*      <!-- Input field --> */}
                        <div className='grid md:grid-cols-2 md:gap-2'>
                            {/* slot name  */}
                            <div className="relative mb-6">
                                <label>Slot Name :</label>
                                <input
                                    id="slotName"
                                    type="text"
                                    placeholder="Slot name"
                                    {...register('slotName', { required: true })}
                                    className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500"
                                />
                            </div>
                            {/* slot time */}
                            <div className="relative mb-6">
                                <label>Slot Time :</label>
                                <input
                                    id="slotTime"
                                    type="number"
                                    placeholder="Slot time"
                                    {...register("slotTime", { required: true })}
                                    className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500"
                                />
                            </div>
                            {/* slot days */}
                            <div className="relative mb-6">
                                <label>Slot Days :</label>
                                <div className="grid grid-cols-4 gap-4 mt-4">
                                    {(trainerInfo?.availableDays || []).map((day) => (
                                        <label key={day} className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                value={day}
                                                {...register("slotDays", { required: true })}
                                                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">{day}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            {/* class */}
                            <div className="relative mb-6">
                                <label>Class :</label>
                                <select
                                    id="class"
                                    {...register("class", { required: true })}
                                    className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500"
                                >
                                    <option value="">Select Class</option>
                                    {classNames.map((className) => (
                                        <option key={className} value={className}>
                                            {className}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                {/* submit button */}
                <div className="flex justify-center p-6 ">
                    <button className="h-10 rounded bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
                        <span>Add New Slot</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNewSlot;