import styles from "../../styles/dashboardStyles";

import StatCard from "./StatCard";

import {
  TrendUpIcon,
  TrendDownIcon,
  WalletFilledIcon,
} from "./icons";


export default function SummaryCard({ data }) {
  const summary = data || {
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    previousIncome: 0,
    previousExpense: 0,
    previousBalance: 0,
  };


  const calculateChange = (current, previous) => {
    if (!previous || previous === 0) {
      return 0;
    }

    return ((current - previous) / previous) * 100;
  };


  const incomeChange = calculateChange(
    summary.totalIncome,
    summary.previousIncome
  );

  const expenseChange = calculateChange(
    summary.totalExpense,
    summary.previousExpense
  );

  const balanceChange = calculateChange(
    summary.balance,
    summary.previousBalance
  );


  const formatChange = (value) => {
    const sign = value >= 0 ? "+" : "";

    return `${sign}${value.toFixed(1)}% from last month`;
  };


  return (
    <div style={styles.statGrid}>

      {/* Total Income */}
      <StatCard
        label="Total Income"
        value={`$${summary.totalIncome}`}
        change={formatChange(incomeChange)}
        changeColor={
          incomeChange >= 0
            ? "#16a34a"
            : "#dc2626"
        }
        iconBg="#dcfce7"
        icon={
          <TrendUpIcon color="#16a34a" />
        }
      />


      {/* Total Expense */}
      <StatCard
        label="Total Expense"
        value={`$${summary.totalExpense}`}
        change={formatChange(expenseChange)}
        changeColor={
          expenseChange >= 0
            ? "#dc2626"
            : "#16a34a"
        }
        iconBg="#fee2e2"
        icon={
          <TrendDownIcon color="#dc2626" />
        }
      />


      {/* Balance */}
      <StatCard
        label="Balance"
        value={`$${summary.balance}`}
        change={formatChange(balanceChange)}
        changeColor={
          balanceChange >= 0
            ? "#16a34a"
            : "#dc2626"
        }
        iconBg="#ede9fe"
        icon={
          <WalletFilledIcon color="#7c3aed" />
        }
      />

    </div>
  );
}