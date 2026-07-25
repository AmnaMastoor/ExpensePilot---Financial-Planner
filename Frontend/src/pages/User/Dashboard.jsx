
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import styles from "../../styles/dashboardStyles";

import Sidebar from "../../Components/Layout/Sidebar";
import Navbar from "../../Components/Layout/Navbar";
import SummaryCard from "../../Components/Dashboard/SummaryCard";
import PieChart from "../../Components/Dashboard/PieChart";
import BudgetAlerts from "../../Components/Dashboard/BudgetAlerts";
import RecentTransactions from "../../Components/Dashboard/RecentTransactions";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        await api.get("/auth/profile");
      } catch {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    loadProfile();
  }, [navigate]);

  return (
  
 <div style={styles.page}>
    <Sidebar logout={logout} />

    <div style={styles.main}>
      <Navbar />
      <div style={styles.content}> <h1 style={styles.pageTitle}>Dashboard</h1>
       <p style={styles.pageSubtitle}> Welcome back! Here's your financial overview. </p>
       <SummaryCard />
       <div style={styles.midGrid}> <PieChart /> <BudgetAlerts /> </div>
       <RecentTransactions />
    </div>
  </div>
  </div>
  

  );
}