import { useEffect, useState } from "react";

import api from "../../services/api";
import styles from "../../Styles/ReportsStyle";

import StatsCards from "./StatsCards";
import IncomeExpenseChart from "./IncomeExpenseChart";
import CategoryChart from "./CategoryChart";
import TransactionsTable from "./TransactionsTable";

export default function Reports() {

    const [report, setReport] = useState(null);

    const loadReports = async () => {

        try {

            const response =
                await api.get("/Reports/overview");

            setReport(response.data);

        }
        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        loadReports();

    }, []);

    const downloadPdf = async () => {

        try {

            const response = await api.get(
                "/Reports/pdf",
                {
                    responseType: "blob"
                }
            );

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.download = "ExpensePilot_Report.pdf";

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        }
        catch (error) {

            console.log(error);

        }

    };

    if (!report) {

        return (
            <div style={styles.content}>
                Loading...
            </div>
        );

    }

    return (

        <div style={styles.content}>

            {/* Header */}

            <div style={styles.header}>

                <div>

                    <h1 style={styles.pageTitle}>
                        Reports
                    </h1>

                    <p style={styles.pageSubtitle}>
                        A full breakdown of your income,
                        expenses and spending habits.
                    </p>

                </div>

                <button
                    style={styles.downloadButton}
                    onClick={downloadPdf}
                >
                    Download PDF
                </button>

            </div>

            {/* Summary Cards */}

            <StatsCards
                monthly={report.monthly}
            />

            {/* Charts */}

            <div style={styles.chartGrid}>

                <IncomeExpenseChart
                    data={report.incomeVsExpense}
                />

                <CategoryChart
                    data={report.categoryWise}
                />

            </div>

            {/* Transactions */}

            <TransactionsTable
                transactions={report.monthly.transactions}
            />

            {/* Yearly Summary */}

            <div style={styles.yearlyGrid}>

                <div style={styles.yearlyCard}>

                    <div style={styles.yearlyLabel}>
                        Yearly Income
                    </div>

                    <div
                        style={{
                            ...styles.yearlyValue,
                            color: "#16A34A"
                        }}
                    >
                        Rs. {report.yearly.totalIncome}
                    </div>

                </div>

                <div style={styles.yearlyCard}>

                    <div style={styles.yearlyLabel}>
                        Yearly Expenses
                    </div>

                    <div
                        style={{
                            ...styles.yearlyValue,
                            color: "#DC2626"
                        }}
                    >
                        Rs. {report.yearly.totalExpenses}
                    </div>

                </div>

                <div style={styles.yearlyCard}>

                    <div style={styles.yearlyLabel}>
                        Yearly Savings
                    </div>

                    <div
                        style={{
                            ...styles.yearlyValue,
                            color: "#5B5FEF"
                        }}
                    >
                        Rs. {report.yearly.totalSavings}
                    </div>

                </div>

            </div>

        </div>

    );

}