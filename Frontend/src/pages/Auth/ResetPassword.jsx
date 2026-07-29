import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../services/api";
import {
    showSuccess,
    showError,
    showLoading,
    hideLoading
} from "../../utils/toast";

export default function ResetPasswordPage() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const email = searchParams.get("email");
    const token = searchParams.get("token");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!email || !token) {

            showError("Invalid or expired reset link.");

            navigate("/forgot-password");

            return;

        }

        if (!password || !confirmPassword) {

            showError("Please fill all fields.");

            return;

        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

        if (!passwordRegex.test(password)) {

            showError(
                "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character."
            );

            return;

        }

        if (password !== confirmPassword) {

            showError("Passwords do not match.");

            return;

        }

        setLoading(true);

        const loadingToast = showLoading("Resetting password...");

        try {

            const response = await api.post("/auth/reset-password", {

                email,
                token,
                newPassword: password

            });

            hideLoading(loadingToast);

            showSuccess(response.data.message);

            setTimeout(() => {

                navigate("/login");

            }, 700);

        }
        catch (error) {

            hideLoading(loadingToast);

            console.log(error);

            if (error.response) {

                showError(error.response.data.message);

            }
            else {

                showError("Something went wrong.");

            }

        }
        finally {

            setLoading(false);

        }

    };

    return (

        <div style={styles.page}>

            <div style={styles.container}>

                <div style={styles.iconBox}>
                    <LockIcon />
                </div>

                <h1 style={styles.title}>
                    Reset Password
                </h1>

                <p style={styles.subtitle}>
                    Enter your new password below.
                </p>

                <div style={styles.card}>

                    <form onSubmit={handleSubmit}>

                        <div style={styles.field}>

                            <label style={styles.label}>
                                New Password
                            </label>

                            <div style={{ position: "relative" }}>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    style={{ ...styles.input, paddingRight: 50 }}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={styles.eyeButton}
                                >
                                    {showPassword ? "🙈" : "👁"}
                                </button>

                            </div>

                        </div>

                        <div style={styles.field}>

                            <label style={styles.label}>
                                Confirm Password
                            </label>

                            <div style={{ position: "relative" }}>

                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm password"
                                    style={{ ...styles.input, paddingRight: 50 }}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                    style={styles.eyeButton}
                                >
                                    {showConfirmPassword ? "🙈" : "👁"}
                                </button>

                            </div>

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                ...styles.submitButton,
                                opacity: loading ? 0.7 : 1,
                                cursor: loading ? "not-allowed" : "pointer"
                            }}
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>

                        <p style={styles.footerText}>

                            Back to{" "}

                            <a href="/login" style={styles.link}>
                                Login
                            </a>

                        </p>

                    </form>

                </div>

            </div>

        </div>

    );

}

function LockIcon() {

    return (

        <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >

            <rect x="3" y="11" width="18" height="10" rx="2" />

            <path d="M7 11V7a5 5 0 0 1 10 0v4" />

        </svg>

    );

}

const styles = {

    page: {
        minHeight: "100vh",
        background: "#f1f5f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        fontFamily: "Segoe UI"
    },

    container: {
        width: "100%",
        maxWidth: 430
    },

    iconBox: {
        width: 65,
        height: 65,
        borderRadius: 16,
        background: "linear-gradient(135deg,#4F46E5,#9333EA)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto 20px",
        boxShadow: "0 10px 15px rgba(79,70,229,.25)"
    },

    title: {
        textAlign: "center",
        fontSize: 30,
        fontWeight: 700,
        color: "#0f172a",
        marginBottom: 8
    },

    subtitle: {
        textAlign: "center",
        color: "#64748b",
        marginBottom: 30
    },

    card: {
        background: "#fff",
        borderRadius: 16,
        padding: 35,
        boxShadow: "0 20px 25px -5px rgba(0,0,0,.08)"
    },

    field: {
        marginBottom: 20
    },

    label: {
        display: "block",
        marginBottom: 8,
        fontWeight: 600,
        color: "#1e293b"
    },

    input: {
        width: "100%",
        boxSizing: "border-box",
        padding: "13px 15px",
        borderRadius: 10,
        border: "1px solid #e2e8f0",
        background: "#f8fafc",
        fontSize: 15,
        outline: "none"
    },

    eyeButton: {
        position: "absolute",
        right: 12,
        top: "50%",
        transform: "translateY(-50%)",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontSize: 18
    },

    submitButton: {
        width: "100%",
        padding: 13,
        border: "none",
        borderRadius: 10,
        cursor: "pointer",
        color: "#fff",
        fontWeight: 600,
        fontSize: 16,
        background: "linear-gradient(90deg,#4F46E5,#9333EA)"
    },

    footerText: {
        marginTop: 20,
        textAlign: "center",
        color: "#64748b"
    },

    link: {
        color: "#4F46E5",
        textDecoration: "none",
        fontWeight: 600
    }

};