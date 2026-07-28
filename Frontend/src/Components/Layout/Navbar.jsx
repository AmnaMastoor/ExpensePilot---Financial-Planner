import { useEffect, useState } from "react";

import api from "../../services/api";
import styles from "../../styles/dashboardStyles";

import {
  BellIcon,
  UserIcon,
} from "../dashboard/icons";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await api.get("/auth/profile");
        setUser(res.data);
      } catch (error) {
        console.log("Profile error:", error);
      }
    };

    getProfile();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "80px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0 32px",
        backgroundColor: "#ffffff",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div style={styles.bellWrap}>
          <BellIcon />
          <span style={styles.bellDot}></span>
        </div>

        <div style={styles.userWrap}>
          <div style={styles.avatar}>
            <UserIcon />
          </div>

          <div>
            <div style={styles.userName}>
              {user?.name || "User"}
            </div>

            <div style={styles.userEmail}>
              {user?.email || ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
