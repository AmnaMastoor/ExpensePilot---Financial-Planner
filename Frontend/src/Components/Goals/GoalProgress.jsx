import styles from "../../Styles/goalStyles";

export default function GoalProgress({
  currentAmount,
  targetAmount,
}) {
  const progress =
    targetAmount > 0
      ? Math.min(
          Math.round((currentAmount / targetAmount) * 100),
          100
        )
      : 0;

  const remaining = Math.max(
    targetAmount - currentAmount,
    0
  );

  const formatMoney = (amount) =>
    `£${Number(amount).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <>
      <div style={styles.progressRow}>
        <span style={styles.remainingText}>
          {formatMoney(remaining)} remaining
        </span>

        <span style={styles.progressPercent}>
          {progress}%
        </span>
      </div>

      <div style={styles.progressTrack}>
        <div
          style={{
            ...styles.progressFill,
            width: `${progress}%`,
          }}
        />
      </div>
    </>
  );
}