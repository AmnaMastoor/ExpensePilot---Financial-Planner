import { useState } from "react";

const ChangePasswordCard = ({ onChangePassword }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        onChangePassword({
            currentPassword,
            newPassword,
            confirmPassword,
        });

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">

            <h2 className="text-xl font-semibold mb-5">
                Change Password
            </h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label className="block mb-2 font-medium">
                        Current Password
                    </label>

                    <input
                        type="password"
                        className="w-full border rounded-lg px-4 py-2"
                        value={currentPassword}
                        onChange={(e) =>
                            setCurrentPassword(e.target.value)
                        }
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 font-medium">
                        New Password
                    </label>

                    <input
                        type="password"
                        className="w-full border rounded-lg px-4 py-2"
                        value={newPassword}
                        onChange={(e) =>
                            setNewPassword(e.target.value)
                        }
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-2 font-medium">
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        className="w-full border rounded-lg px-4 py-2"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                    />
                </div>

                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
                >
                    Update Password
                </button>

            </form>

        </div>
    );
};

export default ChangePasswordCard;