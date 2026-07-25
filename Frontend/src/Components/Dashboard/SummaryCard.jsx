import { useEffect, useState } from "react";
import api from "../../services/api";
import styles from "../../styles/dashboardStyles";

import StatCard from "./StatCard";

import {
  TrendUpIcon,
  TrendDownIcon,
  WalletFilledIcon,
} from "./icons";

export default function SummaryCard() {

  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  useEffect(() => {

    const getSummary = async () => {

      try {

        const res = await api.get("/dashboard/summary");

        setSummary(res.data);

      } catch (err) {

        console.error(err);

      }

    };

    getSummary();

  }, []);

  return (
    <div style={styles.statGrid}>
      <StatCard
        label="Total Income"
        value={summary.totalIncome}
        change="+12.5% from last month"
        changeColor="#16a34a"
        iconBg="#dcfce7"
        icon={<TrendUpIcon color="#16a34a" />}
      />

      <StatCard
        label="Total Expense"
        value={summary.totalExpense}
        change="+8.2% from last month"
        changeColor="#dc2626"
        iconBg="#fee2e2"
        icon={<TrendDownIcon color="#dc2626" />}
      />

      <StatCard
        label="Balance"
        value={summary.balance}
        change="+4.3% from last month"
        changeColor="#16a34a"
        iconBg="#ede9fe"
        icon={<WalletFilledIcon color="#7c3aed" />}
      />
    </div>
  );
}