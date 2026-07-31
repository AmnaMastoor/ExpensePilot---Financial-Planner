import styles from "../../styles/dashboardStyles";
import BudgetAlert from "./BudgetAlert";


export default function BudgetAlerts({ data }) {


  const alerts = data || [];



  return (

    <div style={styles.panel}>


      <h3 style={styles.panelTitle}>
        Budget Alerts
      </h3>



      {
        alerts.length === 0 ?

        (
         <p
           style={{
              color: "var(--text-muted)",
             fontSize: "16px",
             marginBottom: "12px",
              }}
              > No budget alerts available
            </p>
        )

        :

        (

          alerts.map((item) => (

            <BudgetAlert

              key={item.budgetId}

              label={item.category}

              spent={item.spent}

              total={item.budget}

              percent={item.percentage}

            />

          ))

        )

      }



      <p style={styles.budgetNote}>
        You're doing great! Keep an eye on your spending to stay within budget.
      </p>


    </div>

  );

}