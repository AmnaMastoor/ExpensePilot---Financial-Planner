import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import styles from "../../Styles/ReportsStyle";

import Sidebar from "../../Components/Layout/Sidebar";
import Navbar from "../../Components/Layout/Navbar";

import StatsCards from "../../Components/Reports/StatsCards";
import IncomeExpenseChart from "../../Components/Reports/IncomeExpenseChart";
import CategoryChart from "../../Components/Reports/CategoryChart";
import TransactionsTable from "../../Components/Reports/TransactionsTable";

export default function Reports() {

    const navigate = useNavigate();

    const [report, setReport] = useState(null);

    const logout = () => {

        localStorage.removeItem("token");
        navigate("/login");

    };

    useEffect(() => {

        const loadReports = async () => {

            try {

                await api.get("/auth/profile");

            }
            catch {

                localStorage.removeItem("token");

                navigate("/login");

                return;

            }

            try {

                const response =
                    await api.get("/Reports/overview");

                setReport(response.data);

            }
            catch (error) {

                console.log(error);

            }

        };

        loadReports();

    }, [navigate]);



    const downloadPdf = async () => {

        try {

            const response = await api.get(
                "/Reports/pdf",
                {
                    responseType: "blob"
                }
            );

            const url =
                window.URL.createObjectURL(
                    new Blob([response.data])
                );

            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                "ExpensePilot_Report.pdf";

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

        return <h2>Loading...</h2>;

    }

    return (

        <div style={styles.page}>

            <Sidebar logout={logout} />

            <div style={styles.main}>

                <Navbar />

                <div style={styles.content}>

                    {/* Header */}

                    <div style={styles.header}>

                        <div>

                            <h1 style={styles.pageTitle}>
                                Reports
                            </h1>

                            <p style={styles.pageSubtitle}>
                                Complete financial report
                            </p>

                        </div>

                        <button
                            style={styles.downloadButton}
                            onClick={downloadPdf}
                        >
                            Download PDF
                        </button>

                    </div>

                    {/* Monthly Cards */}

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

            </div>

        </div>

    );

}