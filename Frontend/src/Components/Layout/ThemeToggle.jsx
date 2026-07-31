import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {

    const { theme, toggleTheme } = useTheme();

    return (

        <button
            onClick={toggleTheme}
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                border: "1px solid var(--border-color)",
                background: "var(--surface)",
                color: "var(--text-color)",
                cursor: "pointer",
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "0.3s"
            }}
        >
            {theme === "light" ? "🌙" : "☀️"}
        </button>

    );

}