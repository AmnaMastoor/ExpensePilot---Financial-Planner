import styles from "../../Styles/dashboardStyles";
import { InfoIcon } from "./icons";

export default function BudgetAlert({
  label,
  spent,
  total,
  percent,
}) {
  return (
    <div style={styles.alertBox}>
      <div style={styles.alertHeader}>
        <InfoIcon />

        <span style={styles.alertLabel}>
          {label}

          <span style={styles.alertAmount}>
            Rs{spent} / Rs{total}
          </span>
        </span>
      </div>

      <div style={styles.progressTrack}>
        <div
          style={{
            ...styles.progressFill,
            width: `${percent}%`,
            backgroundColor:
              percent >= 95 ? "#ea580c" : "#f59e0b",
          }}
        />
      </div>

      <div style={styles.alertPercent}>
        {percent}% of budget used
      </div>
    </div>
  );
}