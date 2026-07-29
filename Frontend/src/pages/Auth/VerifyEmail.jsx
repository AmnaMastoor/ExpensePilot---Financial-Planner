import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MailCheck, XCircle, LoaderCircle } from "lucide-react";
import api from "../../services/api";

export default function VerifyEmail() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {

        const verifyEmail = async () => {

            const userId = searchParams.get("userId");
            const token = searchParams.get("token");

            if (!userId || !token) {
                setStatus("failed");
                setMessage("Invalid verification link.");
                return;
            }

            try {

                await api.get("/auth/confirm-email", {
                    params: {
                        userId,
                        token
                    }
                });

                setStatus("success");
                setMessage("Your email has been verified successfully.");

            } catch (error) {

                console.log(error);

                setStatus("failed");
                setMessage(
                    error.response?.data?.message ||
                    "Verification link is invalid or expired."
                );
            }
        };


        verifyEmail();

    }, [searchParams]);


    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-10 w-full max-w-md text-center">

                {
                    status === "loading" && (
                        <>
                            <LoaderCircle className="w-16 h-16 text-indigo-600 mx-auto animate-spin mb-5" />

                            <h2 className="text-2xl font-bold text-slate-900">
                                Verifying Email...
                            </h2>

                            <p className="text-slate-500 mt-3">
                                Please wait while we verify your account.
                            </p>
                        </>
                    )
                }


                {
                    status === "success" && (
                        <>
                            <MailCheck className="w-16 h-16 text-indigo-600 mx-auto mb-5" />

                            <h2 className="text-2xl font-bold text-slate-900">
                                Email Verified 🎉
                            </h2>

                            <p className="text-slate-500 mt-3">
                                {message}
                            </p>


                            <button
                                onClick={() => navigate("/login")}
                                className="mt-8 w-full py-3 rounded-xl text-white font-semibold shadow-md transition hover:opacity-95"
                                style={{
                                    background:
                                        "linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)"
                                }}
                            >
                                Go to Login
                            </button>
                        </>
                    )
                }


                {
                    status === "failed" && (
                        <>
                            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-5" />

                            <h2 className="text-2xl font-bold text-slate-900">
                                Verification Failed
                            </h2>

                            <p className="text-slate-500 mt-3">
                                {message}
                            </p>


                            <button
                                onClick={() => navigate("/login")}
                                className="mt-8 w-full py-3 rounded-xl text-white font-semibold shadow-md transition hover:opacity-95"
                                style={{
                                    background:
                                        "linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)"
                                }}
                            >
                                Back to Login
                            </button>
                        </>
                    )
                }

            </div>

        </div>
    );
}