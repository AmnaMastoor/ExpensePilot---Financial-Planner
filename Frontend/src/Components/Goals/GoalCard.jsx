import GoalProgress from "./GoalProgress";
import {
  FiCalendar,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

import styles from "../../Styles/goalStyles";

function formatMoney(amount) {
 return `Rs ${Number(amount).toLocaleString("en-PK", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}`;
}

function formatDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function GoalCard({
  goal,
  onEdit,
  onDelete,
}) {
  const completed =
    goal.currentAmount >= goal.targetAmount;

  return (
    <div style={styles.goalCard}>
      <div style={styles.goalTopBar}></div>

      <div style={styles.goalBody}>
        <div style={styles.goalHeader}>
          <div>
            <h3 style={styles.goalTitle}>
              {goal.title}
            </h3>

            <p style={styles.goalDescription}>
              {goal.description || "No description"}
            </p>
          </div>

          <span
            style={{
              ...styles.statusBadge,
              backgroundColor: completed
                ? "#dcfce7"
                : "#fef3c7",
              color: completed
                ? "#15803d"
                : "#b45309",
            }}
          >
            {completed ? "Completed" : "In Progress"}
          </span>
        </div>

        <div style={styles.amountRow}>
          <div>
            <small style={styles.amountLabel}>
              Saved
            </small>

            <div style={styles.savedAmount}>
              {formatMoney(goal.currentAmount)}
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <small style={styles.amountLabel}>
              Target
            </small>

            <div style={styles.targetAmount}>
              {formatMoney(goal.targetAmount)}
            </div>
          </div>
        </div>

        <GoalProgress
          currentAmount={goal.currentAmount}
          targetAmount={goal.targetAmount}
        />

        <div style={styles.footer}>
          <div style={styles.date}>
            <FiCalendar size={14} />
            <span>{formatDate(goal.targetDate)}</span>
          </div>

          <div style={styles.actions}>
            <button
              style={styles.editButton}
              onClick={() => onEdit(goal)}
            >
              <FiEdit2 size={14} />
              Edit
            </button>

            <button
              style={styles.deleteButton}
              onClick={() =>
                onDelete(goal.financialGoalId)
              }
            >
              <FiTrash2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}