import { EditIcon, TrashIcon } from "./icons";
import styles from "../../styles/transactionStyles";

function formatDate(dateString) {
  if (!dateString) return "";

  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function TransactionRow({
  transaction,
  categories,
  onEdit,
  onDelete,
}){
  const isIncome =
  transaction.type === 0 ||
  transaction.type === "Income";
  const categoryName =
  categories.find(
    (c) => c.categoryId === transaction.categoryId
  )?.name || "Unknown";

  return (
    <tr style={styles.tr}>
      <td style={styles.tdTitle}>
        {transaction.title}
      </td>

      <td
        style={{
          ...styles.td,
          fontWeight: 600,
          color: isIncome ? "#16a34a" : "#dc2626",
        }}
      >
        $
        {Number(transaction.amount).toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })}
      </td>

      <td style={styles.td}>
        <span
          style={{
            ...styles.badge,
            backgroundColor: isIncome
              ? "#dcfce7"
              : "#fee2e2",
            color: isIncome
              ? "#15803d"
              : "#b91c1c",
          }}
        >
          {isIncome ? "Income" : "Expense"}
        </span>
      </td>

      <td style={styles.td}>
       {categoryName}
      </td>

      <td
        style={{
          ...styles.td,
          color: "#64748b",
        }}
      >
       {formatDate(transaction.transactionDate)}
      </td>

      <td
        style={{
          ...styles.td,
          textAlign: "right",
        }}
      >
        <div style={styles.actionsWrap}>
          <button
            style={styles.iconButton}
            onClick={() => onEdit(transaction)}
          >
            <EditIcon />
          </button>

          <button
            style={styles.iconButton}
            onClick={() =>
  onDelete(transaction.transactionId)
}
          >
            <TrashIcon />
          </button>
        </div>
      </td>
    </tr>
  );
}