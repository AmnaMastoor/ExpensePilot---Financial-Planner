import TransactionRow from "./TransactionRow";
import EmptyState from "./EmptyState";
import styles from "../../styles/transactionStyles";

export default function TransactionTable({
  transactions,
  categories,
  onEdit,
  onDelete,
})  {
  return (
    <div style={styles.tableCard}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Amount</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Date</th>
            <th style={{ ...styles.th, textAlign: "right" }}>
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TransactionRow
  key={transaction.transactionId}
  transaction={transaction}
  categories={categories}
  onEdit={onEdit}
  onDelete={onDelete}
/>
            ))
          ) : (
            <EmptyState />
          )}
        </tbody>
      </table>
    </div>
  );
}