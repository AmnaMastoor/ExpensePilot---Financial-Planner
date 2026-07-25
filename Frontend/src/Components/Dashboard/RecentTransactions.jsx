import { useEffect, useState } from "react";
import api from "../../services/api";
import styles from "../../styles/dashboardStyles";

export default function RecentTransactions() {

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {

    const getTransactions = async () => {
      try {
        const res = await api.get("/Dashboard/recent");
        setTransactions(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getTransactions();

  }, []);

  const catColors = {
    "Food & Dining": {
      bg: "#dbeafe",
      text: "#1d4ed8",
    },
    Income: {
      bg: "#dcfce7",
      text: "#15803d",
    },
    Transportation: {
      bg: "#ede9fe",
      text: "#6d28d9",
    },
    Entertainment: {
      bg: "#fef3c7",
      text: "#b45309",
    },
    Shopping: {
      bg: "#fce7f3",
      text: "#be185d",
    },
    "Bills & Utilities": {
      bg: "#ccfbf1",
      text: "#0f766e",
    },
  };

  return (
    <div style={{ ...styles.panel, marginTop: 24 }}>
      <h3 style={styles.panelTitle}>
        Recent Transactions
      </h3>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Date</th>

            <th
              style={{
                ...styles.th,
                textAlign: "right",
              }}
            >
              Amount
            </th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction, index) => {
            const colors =
              catColors[transaction.cat] || {
                bg: "#f1f5f9",
                text: "#475569",
              };

            const isPositive =
              transaction.amount > 0;

            return (
              <tr key={index} style={styles.tr}>
                <td style={styles.tdDesc}>
                  {transaction.desc}
                </td>

                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.badge,
                      backgroundColor: colors.bg,
                      color: colors.text,
                    }}
                  >
                    {transaction.cat}
                  </span>
                </td>

                <td
                  style={{
                    ...styles.td,
                    color: "#64748b",
                  }}
                >
                  {transaction.date}
                </td>

                <td
                  style={{
                    ...styles.td,
                    textAlign: "right",
                    fontWeight: 600,
                    color: isPositive
                      ? "#16a34a"
                      : "#dc2626",
                  }}
                >
                  {isPositive ? "+" : "-"}$
                  {Math.abs(
                    transaction.amount
                  ).toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}