import {
    ArrowUp,
    ArrowDown,
    Wallet
} from "lucide-react";

import styles from "../../Styles/ReportsStyle";

export default function StatsCards({ monthly }) {

    return (

        <div style={styles.cardsGrid}>

            {/* Income */}

            <div style={styles.card}>

                <div style={styles.cardHeader}>

                    <span style={styles.cardTitle}>
                        Total Income
                    </span>

                    <div
                        style={{
                            width: 38,
                            height: 38,
                            borderRadius: "50%",
                            background: "#DCFCE7",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <ArrowUp
                            size={18}
                            color="#16A34A"
                        />
                    </div>

                </div>

                <div
                    style={{
                        ...styles.cardValue,
                        color: "var(--text-color)"
                    }}
                >
                    Rs. {monthly.totalIncome}
                </div>

                <div
                    style={{
                        ...styles.cardFooter,
                        color: "#16A34A"
                    }}
                >
                    Income this month
                </div>

            </div>

            {/* Expense */}

            <div style={styles.card}>

                <div style={styles.cardHeader}>

                    <span style={styles.cardTitle}>
                        Total Expenses
                    </span>

                    <div
                        style={{
                            width: 38,
                            height: 38,
                            borderRadius: "50%",
                            background: "#FEE2E2",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <ArrowDown
                            size={18}
                            color="#DC2626"
                        />
                    </div>

                </div>

                <div
                    style={{
                        ...styles.cardValue,
                       color: "var(--text-color)"
                    }}
                >
                    Rs. {monthly.totalExpenses}
                </div>

                <div
                    style={{
                        ...styles.cardFooter,
                        color: "#DC2626"
                    }}
                >
                    Expenses this month
                </div>

            </div>

            {/* Savings */}

            <div style={styles.card}>

                <div style={styles.cardHeader}>

                    <span style={styles.cardTitle}>
                        Total Savings
                    </span>

                    <div
                        style={{
                            width: 38,
                            height: 38,
                            borderRadius: "50%",
                            background: "#EEF2FF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Wallet
                            size={18}
                            color="#5B5FEF"
                        />
                    </div>

                </div>

                <div
                    style={{
                        ...styles.cardValue,
                        color: "#16A34A"
                    }}
                >
                    Rs. {monthly.totalSavings}
                </div>

                <div style={styles.cardFooter}>
                    Net savings this month
                </div>

            </div>

        </div>

    );

}