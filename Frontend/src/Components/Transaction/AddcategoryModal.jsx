import { useState } from "react";
import { CloseIcon } from "./icons";
import styles from "../../styles/transactionStyles";

const EMPTY_CATEGORY_FORM = () => ({
  name: "",
  description: "",
  icon: "",
});

export default function AddCategoryModal({
  open,
  onClose,
  onCreate,
  saving,
}) {
  const [categoryForm, setCategoryForm] = useState(
    EMPTY_CATEGORY_FORM()
  );

  if (!open) return null;

  const handleClose = () => {
    setCategoryForm(EMPTY_CATEGORY_FORM());
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryForm.name.trim()) {
      alert("Category name is required.");
      return;
    }

    await onCreate(categoryForm);

    setCategoryForm(EMPTY_CATEGORY_FORM());
  };

  return (
    <div
      style={styles.miniOverlay}
      onClick={handleClose}
    >
      <div
        style={styles.miniModal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div style={styles.modalHeader}>
          <div>
            <h2 style={styles.modalTitle}>
              Add Category
            </h2>

            <p style={styles.modalSubtitle}>
              Create a custom category for your transactions.
            </p>
          </div>

          <button
            type="button"
            style={styles.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </button>
        </div>

        {/* PRIVATE NOTE */}
        <div style={styles.privateNote}>
          🔒 Only visible to you — no one else can see this category.
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <div style={styles.field}>
            <label style={styles.label}>
              Name
            </label>

            <input
              type="text"
              value={categoryForm.name}
              onChange={(e) =>
                setCategoryForm({
                  ...categoryForm,
                  name: e.target.value,
                })
              }
              style={styles.input}
              placeholder="e.g. Groceries"
              autoFocus
              required
            />
          </div>

          {/* ICON */}
          <div style={styles.field}>
            <label style={styles.label}>
              Icon (optional)
            </label>

            <input
              type="text"
              value={categoryForm.icon}
              onChange={(e) =>
                setCategoryForm({
                  ...categoryForm,
                  icon: e.target.value,
                })
              }
              style={styles.input}
              placeholder="e.g. 🛒"
            />
          </div>

          {/* DESCRIPTION */}
          <div style={styles.field}>
            <label style={styles.label}>
              Description (optional)
            </label>

            <textarea
              rows={3}
              value={categoryForm.description}
              onChange={(e) =>
                setCategoryForm({
                  ...categoryForm,
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
              onClick={handleClose}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              style={styles.submitButton}
              disabled={saving}
            >
              {saving ? "Adding..." : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}