import styles from "../../Styles/budgetStyles";
import {
  CategoryTagIcon,
  EditIcon,
  TrashIcon,
  getCategoryColor,
} from "./icons";

export default function CategoryBudgetCard({
  budget,
  onEdit,
  onDelete,
}) {
  const {
    categoryId,
    categoryName,
    budgetAmount,
    spent,
  } = budget;

  const percent =
    budgetAmount > 0
      ? Math.min(
          Math.round((spent / budgetAmount) * 100),
          999
        )
      : 0;

  const color = getCategoryColor(categoryId);

  const barColor =
    percent >= 95
      ? "#dc2626"
      : percent >= 75
      ? "#ea580c"
      : color.text;

  return (
    <div style={styles.card}>
      <div style={styles.cardTop}>
        <div style={styles.cardCategoryWrap}>
          <div
            style={{
              ...styles.cardIconBox,
              backgroundColor: color.bg,
            }}
          >
            <CategoryTagIcon color={color.text} />
          </div>

          <span style={styles.cardCategoryName}>
            {categoryName}
          </span>
        </div>

        <div style={styles.cardActions}>
          <button
            type="button"
            style={styles.iconButton}
            onClick={() => onEdit(budget)}
          >
            <EditIcon />
          </button>

          <button
            type="button"
            style={styles.iconButton}
            onClick={() => onDelete(budget.budgetId)}
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      <div style={styles.cardAmountRow}>
        <span style={styles.cardSpent}>
          ${spent.toLocaleString()}
        </span>

        <span style={styles.cardTotal}>
          / ${budgetAmount.toLocaleString()}
        </span>
      </div>

      <div style={styles.progressTrackSm}>
        <div
          style={{
            ...styles.progressFillSm,
            width: `${Math.min(percent, 100)}%`,
            backgroundColor: barColor,
          }}
        />
      </div>

      <div style={styles.cardPercent}>
        {percent}% of budget used
      </div>
    </div>
  );
}