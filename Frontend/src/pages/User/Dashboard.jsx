import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Dashboard() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };

    useEffect(() => {

        const loadProfile = async () => {

            try {

                await api.get("/auth/profile");

            }
            catch {

                localStorage.removeItem("token");

                navigate("/login");
            }

        };

        loadProfile();

    }, [navigate]);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="bg-white p-10 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold text-slate-800">
                    Welcome to Expense Tracker 🚀
                </h1>

                <p className="mt-3 text-slate-500">
                    Your dashboard is ready.
                </p>

                <button
                    onClick={logout}
                    className="mt-6 px-5 py-2 bg-red-500 text-white rounded-lg"
                >
                    Logout
                </button>
                
            </div>
        </div>
    );
}