import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../styles/dashboardStyles";

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
    label: "Categories",
    path: "/categories",
    icon: TagIcon,
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: BarChartIcon,
  },
  {
    label: "Budget",
    path: "/budget",
    icon: WalletIcon,
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
        <Icon color={active ? "#4f46e5" : "#64748b"} />

        <span
          style={{
            color: active ? "#4f46e5" : "#475569",
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

      <button
        onClick={logout}
        style={styles.logoutButton}
      >
        <LogoutIcon />

        <span>Logout</span>
      </button>
    </div>
  );
}