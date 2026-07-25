import styles from "../../styles/dashboardStyles";

import {
  SearchIcon,
  BellIcon,
  UserIcon,
} from "../dashboard/icons";

export default function Navbar() {
  return (
    <div style={styles.topBar}>
      <div style={styles.searchBox}>
        <SearchIcon />

        <input
          type="text"
          placeholder="Search transactions..."
          style={styles.searchInput}
        />
      </div>

      <div style={styles.topBarRight}>
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
              John Doe
            </div>

            <div style={styles.userEmail}>
              john@example.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}