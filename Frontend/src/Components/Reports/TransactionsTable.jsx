import styles from "../../Styles/ReportsStyle";

export default function TransactionsTable({ transactions }) {

    return (

        <div style={styles.tableCard}>

            <h3 style={styles.tableTitle}>
                Monthly Transactions
            </h3>

            <table style={styles.table}>

                <thead>

                    <tr>

                        <th style={styles.th}>Title</th>

                        <th style={styles.th}>Category</th>

                        <th style={styles.th}>Type</th>

                        <th style={styles.th}>Amount</th>

                        <th style={styles.th}>Date</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        transactions.length > 0 ?

                            transactions.map((item, index) => (

                                <tr key={index}>

                                    <td style={styles.td}>
                                        {item.title}
                                    </td>

                                    <td style={styles.td}>
                                        {item.category}
                                    </td>

                                    <td style={styles.td}>

                                        <span
                                            style={
                                                item.type === "Income"
                                                    ? styles.incomeBadge
                                                    : styles.expenseBadge
                                            }
                                        >
                                            {item.type}
                                        </span>

                                    </td>

                                    <td
                                        style={{
                                            ...styles.td,
                                            color:
                                                item.type === "Income"
                                                    ? "#16A34A"
                                                    : "#DC2626",
                                            fontWeight: "600"
                                        }}
                                    >
                                        Rs. {item.amount}
                                    </td>

                                    <td style={styles.td}>
                                        {new Date(
                                            item.transactionDate
                                        ).toLocaleDateString()}
                                    </td>

                                </tr>

                            ))

                            :

                            <tr>

                                <td
                                    colSpan={5}
                                    style={{
                                        ...styles.td,
                                        textAlign: "center",
                                        padding: "30px"
                                    }}
                                >
                                    No Transactions Found
                                </td>

                            </tr>

                    }

                </tbody>

            </table>

        </div>

    );

}