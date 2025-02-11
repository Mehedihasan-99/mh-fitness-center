import Loading from "../../../../components/Loading/Loading";
import useAdmin from "../../../../Hooks/useAdmin";
import useAuth from "../../../../Hooks/UseAuth";
import useTrainer from "../../../../Hooks/useTrainer";

const UserProfile = () => {
    const { user, loading } = useAuth();
    const [isAdmin] = useAdmin();
    const [isTrainer] = useTrainer()

    if (loading) return <Loading />

    return (
        <div>
            <div className="overflow-hidden rounded bg-white text-center text-slate-500 shadow-md shadow-slate-200">
                {/*  <!-- Image --> */}
                <figure className=" p-6 md:p-10">
                    <span className="relative inline-flex h-40 w-80 items-center justify-center rounded-full text-white">
                        <img
                            src={user?.photoURL}
                            alt={user?.displayName}
                            title={user?.displayName}
                            className="max-w-full h-full rounded-full"
                        />
                    </span>
                </figure>
                <div className="p-6 pt-0">
                    <header className="mb-4 space-y-2">
                        <h3 className="text-xl font-medium text-slate-700">
                            Name : {user.displayName}
                        </h3>
                        <p className=" text-slate-400">Email : {user.email}</p>
                        <p className=" text-slate-400">Role : {isAdmin ? 'Admin' : isTrainer ? 'Trainer' : 'User'}</p>
                        <p className=" text-slate-400">Last Login : {user.metadata.lastSignInTime}</p>
                    </header>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;