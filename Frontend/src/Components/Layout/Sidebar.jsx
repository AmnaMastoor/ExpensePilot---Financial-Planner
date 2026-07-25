import { useState } from "react";
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
  const [activeNav, setActiveNav] = useState("Dashboard");

  const navItems = [
    { label: "Dashboard", icon: GridIcon },
    { label: "Transactions", icon: FileIcon },
    { label: "Categories", icon: TagIcon },
    { label: "Analytics", icon: BarChartIcon },
    { label: "Budget", icon: WalletIcon },
  ];

  return (
    <div style={styles.sidebar}>
      <div>
        <div style={styles.logoRow}>
          <span style={styles.logoText}>ExpenseTracker</span>
        </div>

        <nav style={styles.nav}>
          {navItems.map(({ label, icon: Icon }) => {
            const active = activeNav === label;

            return (
              <button
                key={label}
                onClick={() => setActiveNav(label)}
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