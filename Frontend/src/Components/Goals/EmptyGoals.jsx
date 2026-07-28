import { FiTarget, FiPlus } from "react-icons/fi";
import styles from "../../Styles/goalStyles";

export default function EmptyGoals({ onAddGoal }) {
  return (
    <div style={styles.emptyContainer}>
      <div style={styles.emptyIcon}>
        <FiTarget size={50} />
      </div>

      <h2 style={styles.emptyTitle}>
        No Financial Goals Yet
      </h2>

      <p style={styles.emptyText}>
        Start tracking your savings by creating your first financial goal.
      </p>

      
    </div>
  );
}