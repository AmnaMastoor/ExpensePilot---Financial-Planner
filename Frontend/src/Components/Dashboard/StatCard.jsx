import styles from "../../styles/dashboardStyles";

export default function StatCard({
  label,
  value,
  change,
  changeColor,
  iconBg,
  icon,
}) {
  return (
    <div style={styles.statCard}>
      <div style={styles.statCardTop}>
        <div>
          <div style={styles.statLabel}>{label}</div>
          <div style={styles.statValue}>{value}</div>
        </div>

        <div
          style={{
            ...styles.statIconBox,
            backgroundColor: iconBg,
          }}
        >
          {icon}
        </div>
      </div>

      <div
        style={{
          ...styles.statChange,
          color: changeColor,
        }}
      >
        {change}
      </div>
    </div>
  );
}