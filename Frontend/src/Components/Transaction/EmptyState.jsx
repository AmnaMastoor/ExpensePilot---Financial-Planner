import styles from "../../styles/transactionStyles";
export default function EmptyState() {
  return (
    <tr>
      <td colSpan={6} style={styles.emptyRow}>
        <div style={styles.emptyState}>
          <h3 style={styles.emptyTitle}>
            No transactions found
          </h3>

          <p style={styles.emptyText}>
            Try changing your search or add a new transaction.
          </p>
        </div>
      </td>
    </tr>
  );
}