import { useEffect, useState } from "react";
import api from "../../services/api";
import styles from "../../styles/dashboardStyles";
import BudgetAlert from "./BudgetAlert";

export default function BudgetAlerts() {

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {

    const getBudgetStatus = async () => {

      try {

        const res = await api.get("/Budget/status");

        setAlerts(res.data);

      } catch (err) {

        console.error(err);

      }

    };

    getBudgetStatus();

  }, []);

  return (
    <div style={styles.panel}>
      <h3 style={styles.panelTitle}>Budget Alerts</h3>

      {alerts.map((item) => (
        <BudgetAlert
          key={item.budgetId}
          label={item.category}
          spent={item.spent}
          total={item.budget}
          percent={item.percentage}
        />
      ))}

      <p style={styles.budgetNote}>
        You're doing great! Keep an eye on your spending to stay within budget.
      </p>
    </div>
  );
}