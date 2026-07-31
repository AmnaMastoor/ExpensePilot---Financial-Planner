import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../styles/dashboardStyles";
import { FiTarget } from "react-icons/fi";
import {
  GridIcon,
  FileIcon,
  TagIcon,
  BarChartIcon,
  WalletIcon,
  LogoutIcon,
} from "../dashboard/icons";

export default function Sidebar({ logout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: GridIcon,
    },
    {
      label: "Transactions",
      path: "/transactions",
      icon: FileIcon,
    },

    {
      label: "Analytics",
      path: "/reports",
      icon: BarChartIcon,
    },
    {
      label: "Budget",
      path: "/budget",
      icon: WalletIcon,
    },
    {
      label: "Financial Goals",
      path: "/goals",
      icon: FiTarget,
    },
  ];

  return (
    <div style={styles.sidebar}>
      <div>
        <div style={styles.logoRow}>
          <span style={styles.logoText}>ExpensePilot</span>
        </div>

        <nav style={styles.nav}>
          {navItems.map(({ label, icon: Icon, path }) => {
            const active = location.pathname === path;

            return (
              <button
                key={label}
                onClick={() => navigate(path)}
                style={{
                  ...styles.navItem,
                  ...(active ? styles.navItemActive : {}),
                }}
              >
                <Icon
  color={active ? "var(--accent)" : "var(--text-muted)"}
  size={20}
/>

                <span
  style={{
    color: active ? "var(--accent)" : "var(--text-secondary)",
    fontWeight: active ? 600 : 500,
  }}
>
                  {label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <button onClick={logout} style={styles.logoutButton}>
        <LogoutIcon />
        <span>Logout</span>
      </button>
    </div>
  );
}