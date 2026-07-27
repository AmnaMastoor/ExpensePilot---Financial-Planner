import styles from "../../Styles/budgetStyles";
import { EditIcon } from "./icons";

export default function MonthlyBudgetCard({
  spent,
  total,
  onEdit,
}) {
  const percent =
    total > 0
      ? Math.min(
          Math.round((spent / total) * 100),
          100
        )
      : 0;

  const remaining = total - spent;

  return (
    <div style={styles.monthlyCard}>
      <div style={styles.monthlyTop}>
        <div>
          <p style={styles.monthlyLabel}>
            Monthly Budget
          </p>

          <div style={styles.monthlyAmountRow}>
            <span style={styles.monthlySpent}>
              ${spent.toLocaleString()}
            </span>

            <span style={styles.monthlyTotal}>
              / ${total.toLocaleString()}
            </span>
          </div>
        </div>

        <button
          type="button"
          style={styles.editButton}
          onClick={onEdit}
        >
          <EditIcon />
          Edit
        </button>
      </div>

      <div style={styles.progressTrackLg}>
        <div
          style={{
            ...styles.progressFillLg,
            width: `${percent}%`,
            backgroundColor:
              percent >= 90
                ? "#dc2626"
                : percent >= 70
                ? "#f59e0b"
                : "#4f46e5",
          }}
        />
      </div>

      <div style={styles.progressMetaRow}>
        <span style={styles.progressMetaLeft}>
          {percent}% used
        </span>

        <span style={styles.progressMetaRight}>
          ${remaining.toLocaleString()} remaining
        </span>
      </div>
    </div>
  );
}