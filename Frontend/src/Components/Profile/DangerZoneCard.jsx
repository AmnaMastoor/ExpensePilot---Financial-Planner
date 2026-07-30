const DangerZoneCard = ({ onDeleteClick }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-red-200">

            <h2 className="text-xl font-semibold text-red-600 mb-3">
                Danger Zone
            </h2>

            <p className="text-gray-600 mb-6">
                Once you delete your account, all your data will be permanently removed.
            </p>

            <button
                onClick={onDeleteClick}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
            >
                Delete Account
            </button>

        </div>
    );
};

export default DangerZoneCard;