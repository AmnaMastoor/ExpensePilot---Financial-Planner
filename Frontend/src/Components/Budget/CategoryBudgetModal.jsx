import styles from "../../Styles/budgetStyles";
import { CloseIcon, ChevronIcon } from "./icons";

export default function CategoryBudgetModal({
  open,
  onClose,
  editingId,
  form,
  setForm,
  onSubmit,
  categories,
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
            {editingId
              ? "Edit Category Budget"
              : "Add Category Budget"}
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
          {/* CATEGORY */}
          <div style={styles.field}>
            <label style={styles.label}>
              Category
            </label>

            <div style={styles.selectWrapFull}>
              <select
                value={form.categoryId}
                onChange={(e) =>
                  setForm({
                    ...form,
                    categoryId: e.target.value,
                  })
                }
                style={styles.selectFull}
                disabled={!!editingId}
                required
              >
                <option value="">
                  Select Category
                </option>

                {categories.map((category) => (
                  <option
                    key={category.categoryId}
                    value={category.categoryId}
                  >
                    {category.name}
                  </option>
                ))}
              </select>

              <ChevronIcon />
            </div>
          </div>

          {/* AMOUNT */}
          <div style={styles.field}>
            <label style={styles.label}>
              Monthly Limit ($)
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="e.g. 500"
              value={form.budgetAmount}
              onChange={(e) =>
                setForm({
                  ...form,
                  budgetAmount: e.target.value,
                })
              }
              style={styles.input}
              required
            />
          </div>

          {/* BUTTONS */}
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
              {editingId ? "Save Changes" : "Add Budget"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}