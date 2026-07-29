import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
    showSuccess,
    showError,
    showLoading,
    hideLoading
} from "../../utils/toast";

export default function ForgotPasswordPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!email.trim()) {
            showError("Please enter your email.");
            return;
        }

        setLoading(true);

        const loadingToast = showLoading("Sending reset link...");

        try {

            const response = await api.post("/auth/forgot-password", {
                email,
            });

            hideLoading(loadingToast);

            showSuccess(response.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 500);

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
                    <MailIcon />
                </div>

                <h1 style={styles.title}>Forgot Password</h1>

                <p style={styles.subtitle}>
                    Enter your email address and we'll send you a password reset
                    link.
                </p>

                <div style={styles.card}>
                    <form onSubmit={handleSubmit}>
                        <div style={styles.field}>
                            <label htmlFor="email" style={styles.label}>
                                Email Address
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={styles.input}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                ...styles.submitButton,
                                opacity: loading ? 0.7 : 1,
                                cursor: loading ? "not-allowed" : "pointer",
                                pointerEvents: loading ? "none" : "auto"
                            }}
                        >
                            {loading
                                ? "Sending..."
                                : "Send Password Reset Link"}
                        </button>

                        <p style={styles.footerText}>
                            Remember your password?{" "}
                            <a href="/login" style={styles.link}>
                                Back to Login
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

function MailIcon() {
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
            <path d="M4 4h16v16H4z" />
            <path d="M22 6l-10 7L2 6" />
        </svg>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#f1f5f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },

    container: {
        width: "100%",
        maxWidth: 430,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    iconBox: {
        width: 64,
        height: 64,
        borderRadius: 16,
        background: "linear-gradient(135deg,#4F46E5,#9333EA)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        boxShadow: "0 10px 15px rgba(79,70,229,.25)",
    },

    title: {
        fontSize: 30,
        fontWeight: 700,
        color: "#0f172a",
        marginBottom: 10,
    },

    subtitle: {
        textAlign: "center",
        color: "#64748b",
        marginBottom: 30,
        lineHeight: 1.6,
    },

    card: {
        width: "100%",
        background: "#fff",
        borderRadius: 16,
        padding: 35,
        boxSizing: "border-box",
        boxShadow:
            "0 20px 25px -5px rgba(0,0,0,.08),0 8px 10px -6px rgba(0,0,0,.05)",
    },

    field: {
        marginBottom: 20,
    },

    label: {
        display: "block",
        marginBottom: 8,
        fontWeight: 600,
        color: "#1e293b",
    },

    input: {
        width: "100%",
        boxSizing: "border-box",
        padding: "13px 15px",
        borderRadius: 10,
        border: "1px solid #e2e8f0",
        background: "#f8fafc",
        fontSize: 15,
        outline: "none",
    },

    submitButton: {
        width: "100%",
        padding: "13px",
        border: "none",
        borderRadius: 10,
        cursor: "pointer",
        color: "#fff",
        fontWeight: 600,
        fontSize: 16,
        background: "linear-gradient(90deg,#4F46E5,#9333EA)",
    },

    footerText: {
        marginTop: 22,
        textAlign: "center",
        color: "#64748b",
        fontSize: 14,
    },

    link: {
        color: "#4F46E5",
        fontWeight: 600,
        textDecoration: "none",
    },
};