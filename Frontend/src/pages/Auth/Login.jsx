import { useState } from "react";
import { TrendingUp, Eye, EyeOff } from "lucide-react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import {
    showSuccess,
    showError,
    showLoading,
    hideLoading
} from "../../utils/toast";

export default function LoginPage() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showResend, setShowResend] = useState(false);
    const [resendEmail, setResendEmail] = useState("");

    function getRoleFromToken(token) {
        try {
            const payload = token.split(".")[1];
            const decoded = JSON.parse(
                atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
            );

            return (
                decoded.role ||
                decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
                null
            );
        } catch (error) {
            console.log("Token decode error:", error);
            return null;
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        const loading = showLoading("Signing in...");

        try {

            const response = await api.post("/auth/login", {
                email,
                password
            });

            hideLoading(loading);

            localStorage.setItem("token", response.data.token);

            showSuccess("Signed in successfully!");

            const role = getRoleFromToken(response.data.token);

            setTimeout(() => {
                if (role === "Admin") {
                    navigate("/admin");
                } else {
                    navigate("/dashboard");
                }
            }, 500);

        }
        catch (error) {

            hideLoading(loading);

            console.log(error);


            if (error.response) {


                if (error.response.data.code === "EMAIL_NOT_VERIFIED") {

                    setResendEmail(email);
                    setShowResend(true);

                    showError(
                        "Please verify your email first."
                    );

                }
                else {

                    showError(
                        error.response.data.message
                    );

                }


            }
            else {

                showError("Something went wrong!");

            }

        }

    };

    const handleResendVerification = async () => {

        const loading = showLoading(
            "Sending verification email..."
        );


        try {

            const response = await api.post(
                "/auth/resend-verification-email",
                {
                    email: resendEmail
                }
            );


            hideLoading(loading);


            showSuccess(
                response.data.message
            );


        }
        catch (error) {

            hideLoading(loading);


            if (error.response) {

                showError(
                    error.response.data.message
                );

            }
            else {

                showError(
                    "Something went wrong!"
                );

            }

        }

    };

    return (
        <div className="min-h-screen w-full flex bg-slate-50">
            {/* Left panel */}
            <div
                className="hidden md:flex md:w-1/2 flex-col justify-between p-10 lg:p-14 relative overflow-hidden"
                style={{
                    background: "linear-gradient(160deg, #4338CA 0%, #7C3AED 55%, #9333EA 100%)",
                }}
            >
                <div>
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <TrendingUp className="w-6 h-6 text-indigo-600" strokeWidth={2.5} />
                        </div>
                        <span className="text-white text-2xl font-bold tracking-tight">
                            ExpensePilot
                        </span>
                    </div>

                    {/* Dashboard preview card */}
                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                        <div className="bg-black rounded-xl overflow-hidden p-4">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[10px] text-gray-300 font-medium tracking-wide">
                                    USERS: LAST 7 DAYS USING MEDIAN
                                </span>
                                <span className="text-[10px] text-gray-500">⋯</span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <ChartPanel label="LOAD TIME VS BOUNCE RATE" stat="57.1%" color="#22D3EE" />
                                <ChartPanel label="START RENDER VS BOUNCE RATE" stat="45%" color="#F472B6" />
                            </div>

                            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-gray-800">
                                <MiniStat label="Page Load" value="0.7s" color="#22D3EE" />
                                <MiniStat label="Page Views" value="2.7Mpvs" color="#F472B6" />
                                <MiniStat label="Bounce Rate" value="40.6%" color="#F472B6" />
                                <MiniStat label="Sessions" value="479K" color="#22D3EE" />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h1 className="text-white text-3xl font-bold mb-3 leading-tight">
                        Manage Your Finances Smarter
                    </h1>
                    <p className="text-indigo-100/90 text-base leading-relaxed max-w-md">
                        Track expenses, analyze spending patterns, and achieve your
                        financial goals with powerful analytics and insights.
                    </p>
                </div>
            </div>

            {/* Right panel */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 py-12">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-8 sm:p-10">
                    <h2 className="text-3xl font-bold text-gray-950 mb-2"
                        style={{ color: "var(--text-color)" }}
                    >
                        Welcome Back
                    </h2>
                    <p className="text-slate-500 mb-8">
                        Sign in to continue to your dashboard
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-slate-700 mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-transparent text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-slate-700 mb-2"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3 pr-11 rounded-xl bg-slate-100 border border-transparent text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                Remember me
                            </label>
                            <Link
                                to="/forgot-password"
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl text-white font-semibold shadow-md shadow-indigo-500/20 transition hover:opacity-95 active:scale-[0.99]"
                            style={{
                                background: "linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)",
                            }}
                        >
                            Sign In
                        </button>
                        {
                            showResend && (

                                <div className="mt-4 text-center">

                                    <p className="text-sm text-slate-500 mb-2">
                                        Didn't receive verification email?
                                    </p>


                                    <button
                                        type="button"
                                        onClick={handleResendVerification}
                                        className="text-indigo-600 font-semibold hover:text-indigo-700"
                                    >
                                        Resend Verification Email
                                    </button>


                                </div>

                            )
                        }

                        <div className="relative my-5">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>

                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">
                                    OR
                                </span>
                            </div>
                        </div>

                        <GoogleLogin
                            onSuccess={async (credentialResponse) => {
                                try {
                                    console.log("Google Success:", credentialResponse);

                                    const response = await api.post("/auth/google-login", {
                                        idToken: credentialResponse.credential,
                                    });

                                    console.log("Backend Response:", response.data);

                                    localStorage.setItem("token", response.data.token);

                                    navigate("/dashboard");
                                } catch (error) {
                                    console.error("Google Login Error:", error);

                                    if (error.response) {
                                        console.log("Status:", error.response.status);
                                        console.log("Data:", error.response.data);
                                    }
                                }
                            }}
                            onError={() => {
                                console.log("Google Login Failed");
                            }}
                        />

                        <p className="text-center text-sm text-slate-500 pt-2">
                            Don&apos;t have an account?{" "}
                            <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-700">
                                Create Account
                            </a>
                        </p>
                    </form>
                </div>

                <p className="text-xs text-slate-400 mt-6">
                    © 2026 Expense Tracker. All rights reserved.
                </p>
            </div>
        </div>
    );
}

function ChartPanel({ label, stat, color }) {
    // simple bar sparkline mock
    const bars = [40, 65, 30, 80, 55, 70, 45, 90, 35, 60, 50, 75];
    return (
        <div className="bg-gray-900 rounded-lg p-2">
            <div className="flex items-center justify-between mb-1">
                <span className="text-[8px] text-gray-400 font-medium">{label}</span>
                <span className="text-[8px] font-bold" style={{ color }}>
                    {stat}
                </span>
            </div>
            <div className="flex items-end gap-[2px] h-10">
                {bars.map((h, i) => (
                    <div
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{ height: `${h}%`, backgroundColor: color, opacity: 0.85 }}
                    />
                ))}
            </div>
        </div>
    );
}

function MiniStat({ label, value, color }) {
    return (
        <div>
            <div className="text-[11px] font-bold" style={{ color }}>
                {value}
            </div>
            <div className="text-[8px] text-gray-500">{label}</div>
        </div>
    );
}