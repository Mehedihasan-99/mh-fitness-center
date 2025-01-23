import useAuth from "../../../../Hooks/UseAuth";

const UserProfile = () => {
    const { user, loading } = useAuth();

    if (loading) {
        <div className="relative w-full">
            <label
                id="p01d-label"
                className="absolute top-0 left-0 mb-0 block w-1/4 text-center text-xs text-white"
            >
                <span className="sr-only">uploading</span> 25%
            </label>
            <progress
                aria-labelledby="p01d-label"
                id="p01d"
                max="100"
                value="25"
                className="block w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-emerald-500 [&::-moz-progress-bar]:bg-emerald-500"
            >
                25%
            </progress>
        </div>
        return
    }

    return (
        <div>
            <div className="overflow-hidden rounded bg-white text-center text-slate-500 shadow-md shadow-slate-200">
                {/*  <!-- Image --> */}
                <figure className="p-6 md:p-10 pb-0">
                    <span className="relative inline-flex h-40 w-80 items-center justify-center rounded-full text-white">
                        <img
                            src={user?.photoURL}
                            alt="user name"
                            title={user?.displayName}
                            className="max-w-full rounded-full"
                        />
                    </span>
                </figure>
                <div className="p-6">
                    <header className="mb-4 space-y-2">
                        <h3 className="text-xl font-medium text-slate-700">
                            Name : {user.displayName}
                        </h3>
                        <p className=" text-slate-400">Email : {user.email}</p>
                        <p className=" text-slate-400">Last Login : {user.metadata.lastSignInTime}</p>
                    </header>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;