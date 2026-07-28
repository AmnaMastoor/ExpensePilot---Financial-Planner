import { FiTarget, FiPlus } from "react-icons/fi";
import styles from "../../Styles/goalStyles";

export default function GoalToolbar({ onAddGoal }) {
  return (
    <div style={styles.toolbar}>
      <div style={styles.toolbarLeft}>
        <div style={styles.toolbarIcon}>
          <FiTarget size={22} />
        </div>

        <div>
          <h1 style={styles.pageTitle}>
            Financial Goals
          </h1>

          <p style={styles.pageSubtitle}>
            Track and manage all your financial goals.
          </p>
        </div>
      </div>

      <button
        style={styles.addButton}
        onClick={onAddGoal}
      >
        <FiPlus size={18} />
        Add Goal
      </button>
    </div>
  );
}