import { useEffect, useState } from "react";
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


  const [summary, setSummary] = useState(null);
  const [expenseData, setExpenseData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [budgetAlerts, setBudgetAlerts] = useState([]);



  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };



  useEffect(() => {


    const loadDashboard = async () => {


      // First check token/profile

      try {

        await api.get("/auth/profile");


      } catch(error) {


        console.log("Authentication failed", error);


        localStorage.removeItem("token");

        navigate("/login");

        return;

      }



      // Load dashboard data separately


      try {

        const response =
          await api.get("/Dashboard/summary");


        setSummary(response.data);


      } catch(error) {

        console.log(
          "Summary error:",
          error
        );

      }




      try {

        const response =
          await api.get("/Dashboard/expense-chart");


        setExpenseData(response.data);


      } catch(error) {

        console.log(
          "Expense chart error:",
          error
        );

      }




      try {

        const response =
          await api.get("/Dashboard/recent");


        setTransactions(response.data);


      } catch(error) {

        console.log(
          "Recent transaction error:",
          error
        );

      }




      try {

        const response =
          await api.get("/Budget/status");


        setBudgetAlerts(response.data);


      } catch(error) {

        console.log(
          "Budget alert error:",
          error
        );

      }


    };



    loadDashboard();


  }, [navigate]);




  return (


    <div style={styles.page}>


      <Sidebar logout={logout} />



      <div style={styles.main}>


        <Navbar />



        <div style={styles.content}>


          <h1 style={styles.pageTitle}>
            Dashboard
          </h1>



          <p style={styles.pageSubtitle}>
            Welcome back! Here's your financial overview.
          </p>



          <SummaryCard
            data={summary}
          />



          <div style={styles.midGrid}>


            <PieChart
              data={expenseData}
            />



            <BudgetAlerts
              data={budgetAlerts}
            />


          </div>



          <RecentTransactions
            data={transactions}
          />



        </div>


      </div>


    </div>


  );

}