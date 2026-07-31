import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import {
    showSuccess,
    showError,
    showLoading,
    hideLoading
} from "../../utils/toast";

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (form.password !== form.confirmPassword) {

            showError("Passwords do not match.");
            return;

        }

        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;


        if (!passwordRegex.test(form.password)) {

            showError(
                "Password must contain minimum 8 characters, one uppercase letter and one number."
            );

            return;
        }


        let loadingToast;


        try {

            setLoading(true);

            loadingToast = showLoading("Creating account...");


            await api.post("/auth/register", {
                fullName: form.fullName,
                email: form.email,
                password: form.password
            });


            hideLoading(loadingToast);

            showSuccess(
                "Account created! Please verify your email before login."
            );


            setTimeout(() => {

                navigate("/login");

            }, 1500);


        }
        catch (error) {


            if (loadingToast) {
                hideLoading(loadingToast);
            }


            console.log(error);


            if (error.response) {

                showError(error.response.data.message);

            }
            else {

                showError("Something went wrong!");

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
                    <WalletIcon />
                </div>

                <h1 style={styles.title}>Create Account</h1>
                <p style={styles.subtitle}>Start tracking your expenses today</p>

                <div style={styles.card}>
                    <form onSubmit={handleSubmit}>
                        <div style={styles.field}>
                            <label htmlFor="fullName" style={styles.label}>
                                Full Name
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                value={form.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.field}>
                            <label htmlFor="email" style={styles.label}>
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.field}>
                            <label htmlFor="password" style={styles.label}>
                                Password
                            </label>
                            <div style={{ position: "relative" }}>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    style={{ ...styles.input, paddingRight: 44 }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    style={styles.eyeButton}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                            </div>
                        </div>

                        <div style={styles.field}>
                            <label htmlFor="confirmPassword" style={styles.label}>
                                Confirm Password
                            </label>
                            <div style={{ position: "relative" }}>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    style={{ ...styles.input, paddingRight: 44 }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((s) => !s)}
                                    style={styles.eyeButton}
                                    aria-label={
                                        showConfirmPassword ? "Hide password" : "Show password"
                                    }
                                >
                                    {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
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
                            {loading ? "Creating..." : "Create Account"}
                        </button>

                        <p style={styles.footerText}>
                            Already have an account?{" "}
                            <a href="/login" style={styles.linkBold}>
                                Sign In
                            </a>
                        </p>
                    </form>
                </div>

                <p style={styles.terms}>
                    By creating an account, you agree to our{" "}
                    <a href="#" style={styles.termsLink}>
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" style={styles.termsLink}>
                        Privacy Policy
                    </a>
                </p>
            </div>
        </div>
    );
}

/* ---------- icons ---------- */

function WalletIcon() {
    return (
        <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
            <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
        </svg>
    );
}

function EyeIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function EyeOffIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    );
}

/* ---------- styles ---------- */

const styles = {
    page: {
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#f1f5f9",
        display: "flex",
        justifyContent: "center",
        padding: "56px 20px",
        fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },
    container: {
        width: "100%",
        maxWidth: 420,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    iconBox: {
        width: 64,
        height: 64,
        borderRadius: 16,
        background: "linear-gradient(135deg, #4F46E5 0%, #9333EA 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        boxShadow: "0 10px 15px -3px rgba(79,70,229,0.25)",
    },
    title: {
        fontSize: 30,
        fontWeight: 700,
        color: "var(--text-color)",
        margin: "0 0 8px 0",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 15,
        color:"var(--text-faint)",
        margin: "0 0 28px 0",
        textAlign: "center",
    },
    card: {
        width: "100%",
backgroundColor: "var(--surface)",
        borderRadius: 16,
        boxShadow:
            "0 20px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.05)",
        padding: "36px 32px",
        boxSizing: "border-box",
    },
    field: {
        marginBottom: 18,
    },
    label: {
        display: "block",
        fontSize: 14,
        fontWeight: 600,
        color: "#1e293b",
        marginBottom: 8,
    },
    input: {
        width: "100%",
        padding: "12px 16px",
        borderRadius: 10,
        backgroundColor: "#f1f5f9",
        border: "1px solid transparent",
        fontSize: 15,
        color: "var(--text-color)",
        outline: "none",
        boxSizing: "border-box",
    },
    eyeButton: {
        position: "absolute",
        right: 12,
        top: "50%",
        transform: "translateY(-50%)",
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
    },
    submitButton: {
        width: "100%",
        padding: "13px",
        borderRadius: 10,
        border: "none",
        color: "#fff",
        fontSize: 16,
        fontWeight: 600,
        cursor: "pointer",
        background: "linear-gradient(90deg, #4F46E5 0%, #9333EA 100%)",
        boxShadow: "0 10px 15px -3px rgba(79,70,229,0.2)",
        marginTop: 6,
    },
    footerText: {
        textAlign: "center",
        fontSize: 14,
        color:"var(--text-faint)",
        marginTop: 20,
        marginBottom: 0,
    },
    linkBold: {
        fontWeight: 600,
        color: "#4f46e5",
        textDecoration: "none",
    },
    terms: {
        fontSize: 13,
        color: "var(--text-faint)",
        textAlign: "center",
        marginTop: 24,
        maxWidth: 360,
        lineHeight: 1.5,
    },
    termsLink: {
        color: "#4f46e5",
        textDecoration: "none",
        fontWeight: 500,
    },
};