import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../Styles/adminStyles";

import {
  GridIcon,
  UsersIcon,
  LogoutIcon,
} from "../Admin/icons";

export default function AdminSidebar({ logout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/admin", icon: GridIcon },
    { label: "Users", path: "/admin/users", icon: UsersIcon },
  ];

  return (
    <div style={styles.sidebar}>
      <div>
        <div style={styles.logoRow}>
          <span style={styles.logoText}>ExpensePilot</span>
        </div>

        <span style={styles.adminBadge}>Admin</span>

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

      <button onClick={logout} style={styles.logoutButton}>
        <LogoutIcon />
        <span>Logout</span>
      </button>
    </div>
  );
}
