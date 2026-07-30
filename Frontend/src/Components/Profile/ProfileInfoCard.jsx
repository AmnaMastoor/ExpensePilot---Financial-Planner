import { useEffect, useState } from "react";

const ProfileInfoCard = ({ profile, onSave }) => {

    const [fullName, setFullName] = useState("");

    useEffect(() => {
        if (profile) {
            setFullName(profile.fullName);
        }
    }, [profile]);

    const handleSubmit = (e) => {
        e.preventDefault();

        onSave({
            fullName,
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">

            <h2 className="text-xl font-semibold mb-5">
                Profile Information
            </h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label className="block mb-2 font-medium">
                        Full Name
                    </label>

                    <input
                        type="text"
                        className="w-full border rounded-lg px-4 py-2"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 font-medium">
                        Email
                    </label>

                    <input
                        type="email"
                        className="w-full border rounded-lg px-4 py-2 bg-gray-100"
                        value={profile?.email || ""}
                        disabled
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-2 font-medium">
                        Member Since
                    </label>

                    <input
                        type="text"
                        className="w-full border rounded-lg px-4 py-2 bg-gray-100"
                        value={
                            profile?.createdAt
                                ? new Date(profile.createdAt).toLocaleDateString()
                                : ""
                        }
                        disabled
                    />
                </div>

                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
                >
                    Save Changes
                </button>

            </form>

        </div>
    );
};

export default ProfileInfoCard;