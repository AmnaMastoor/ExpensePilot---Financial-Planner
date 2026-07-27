import styles from "../../Styles/budgetStyles";
import { CloseIcon } from "./icons";

export default function EditMonthlyBudgetModal({
  open,
  onClose,
  value,
  setValue,
  onSubmit,
}) {
  if (!open) return null;

  return (
    <div
      style={styles.overlay}
      onClick={onClose}
    >
      <div
        style={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>
            Edit Monthly Budget
          </h2>

          <button
            type="button"
            style={styles.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={onSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>
              Total Monthly Budget ($)
            </label>

            <input
              type="number"
              min="0"
              step="1"
              value={value}
              onChange={(e) =>
                setValue(e.target.value)
              }
              style={styles.input}
              autoFocus
              required
            />
          </div>

          <div style={styles.modalActions}>
            <button
              type="button"
              style={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              style={styles.submitButton}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}