import { useState } from "react";
import { toast } from "react-hot-toast";

const DeleteAccountModal = ({ isOpen, onClose, onConfirm, hasPassword }) => {

    const [password, setPassword] = useState("");

    if (!isOpen) return null;

    const handleDelete = () => {

        if (hasPassword && !password.trim()) {

            toast.error("Please enter your password.");

            return;

        }

        onConfirm(password);

        setPassword("");

    };

    const handleCancel = () => {

        setPassword("");

        onClose();

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl shadow-lg w-[450px] p-6">

                <h2 className="text-2xl font-bold text-red-600 mb-3">
                    Delete Account
                </h2>

                <p className="text-gray-600 mb-2">
                    Are you sure you want to delete your account?
                </p>

                <p className="text-sm text-gray-500 mb-5">
                    This action cannot be undone.
                    All your transactions, budgets,
                    financial goals and categories
                    will be permanently deleted.
                </p>

                {
                    hasPassword && (

                        <>
                            <label className="block font-medium mb-2">
                                Confirm your password
                            </label>

                            <input
                                type="password"
                                className="w-full border rounded-lg px-4 py-2 mb-6"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                        </>

                    )
                }

                <div className="flex justify-end gap-3">

                    <button
                        onClick={handleCancel}
                        className="border border-gray-300 hover:bg-gray-100 px-5 py-2 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                    >
                        Delete Account
                    </button>

                </div>

            </div>

        </div>

    );
};

export default DeleteAccountModal;