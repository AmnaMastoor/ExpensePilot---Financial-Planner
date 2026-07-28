import { useEffect, useState } from "react";
import styles from "../../Styles/goalStyles";

const INITIAL_FORM = {
  title: "",
  description: "",
  targetAmount: "",
  currentAmount: "",
  targetDate: "",
};

export default function GoalModal({
  isOpen,
  onClose,
  onSave,
  editingGoal,
}) {
  const [formData, setFormData] = useState(INITIAL_FORM);

  useEffect(() => {
    if (editingGoal) {
      setFormData({
        title: editingGoal.title || "",
        description: editingGoal.description || "",
        targetAmount: editingGoal.targetAmount || "",
        currentAmount: editingGoal.currentAmount || "",
        targetDate: editingGoal.targetDate
          ? editingGoal.targetDate.split("T")[0]
          : "",
      });
    } else {
      setFormData(INITIAL_FORM);
    }
  }, [editingGoal, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...formData,
      targetAmount: Number(formData.targetAmount),
      currentAmount: Number(formData.currentAmount),
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <h2 style={styles.modalTitle}>
          {editingGoal ? "Edit Goal" : "Add Goal"}
        </h2>

        <form onSubmit={handleSubmit}>

          <div style={styles.formGroup}>
            <label>Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label>Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              style={styles.textarea}
            />
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label>Target Amount</label>

              <input
                type="number"
                name="targetAmount"
                value={formData.targetAmount}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label>Current Amount</label>

              <input
                type="number"
                name="currentAmount"
                value={formData.currentAmount}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label>Target Date</label>

            <input
              type="date"
              name="targetDate"
              value={formData.targetDate}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.modalActions}>
            <button
              type="button"
              onClick={onClose}
              style={styles.cancelButton}
            >
              Cancel
            </button>

            <button
              type="submit"
              style={styles.saveButton}
            >
              {editingGoal ? "Update Goal" : "Create Goal"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}