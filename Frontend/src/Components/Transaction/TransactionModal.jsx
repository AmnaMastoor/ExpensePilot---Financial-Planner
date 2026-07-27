import { CloseIcon, ChevronIcon, PlusIcon } from "./icons";
import styles from "../../styles/transactionStyles";

export default function TransactionModal({
  open,
  onClose,
  editingId,
  form,
  setForm,
  onSubmit,
  categories,
  onAddCategory,
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
          <div>
            <h2 style={styles.modalTitle}>
              {editingId
                ? "Edit Transaction"
                : "Add Transaction"}
            </h2>

            <p style={styles.modalSubtitle}>
              {editingId
                ? "Update the transaction details."
                : "Enter details for a new transaction."}
            </p>
          </div>

          <button
            type="button"
            style={styles.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={onSubmit}
          style={styles.modalForm}
        >
          {/* TITLE */}
          <div style={styles.field}>
            <label style={styles.label}>
              Title
            </label>

            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              style={styles.input}
              autoFocus
              required
            />
          </div>

          {/* AMOUNT */}
          <div style={styles.field}>
            <label style={styles.label}>
              Amount
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={form.amount}
              onChange={(e) =>
                setForm({
                  ...form,
                  amount: e.target.value,
                })
              }
              style={styles.input}
              required
            />
          </div>

          {/* TYPE */}
          <div style={styles.field}>
            <label style={styles.label}>
              Type
            </label>

            <div style={styles.selectWrapFull}>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value,
                  })
                }
                style={styles.selectFull}
              >
                <option value="Expense">
                  Expense
                </option>

                <option value="Income">
                  Income
                </option>
              </select>

              <ChevronIcon />
            </div>
          </div>

          {/* CATEGORY */}
          <div style={styles.field}>
            <div style={styles.labelRow}>
              <label style={{ ...styles.label, marginBottom: 0 }}>
                Category
              </label>

              <button
                type="button"
                style={styles.addCategoryBtn}
                onClick={onAddCategory}
              >
                <PlusIcon color="#4f46e5" />
                Add New
              </button>
            </div>

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

          {/* DATE */}
          <div style={styles.field}>
            <label style={styles.label}>
              Date
            </label>

            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({
                  ...form,
                  date: e.target.value,
                })
              }
              style={styles.input}
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div style={styles.field}>
            <label style={styles.label}>
              Description
            </label>

            <textarea
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              style={styles.textarea}
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
              {editingId
                ? "Save Changes"
                : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}