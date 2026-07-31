import styles from "../../styles/dashboardStyles";


export default function RecentTransactions({ data }) {


  const transactions = data || [];



  const catColors = {

    "Food":
    {
      bg:"#dbeafe",
      text:"#1d4ed8",
    },


    "Transport":
    {
      bg:"#ede9fe",
      text:"#6d28d9",
    },


    "Shopping":
    {
      bg:"#fce7f3",
      text:"#be185d",
    },


    "Bills":
    {
      bg:"#ccfbf1",
      text:"#0f766e",
    },


    "Entertainment":
    {
      bg:"#fef3c7",
      text:"#b45309",
    },
    
    Salary: {
    bg: "#dcfce7",
    text: "#15803d",
  }
  };



  return (

    <div
      style={{
        ...styles.panel,
        marginTop:24
      }}
    >


      <h3 style={styles.panelTitle}>
        Recent Transactions
      </h3>



      <table style={styles.table}>


        <thead>

          <tr>

            <th style={styles.th}>
              Description
            </th>


            <th style={styles.th}>
              Category
            </th>


            <th style={styles.th}>
              Date
            </th>


            <th
              style={{
                ...styles.th,
                textAlign:"right"
              }}
            >
              Amount
            </th>


          </tr>

        </thead>



        <tbody>


        {
          transactions.map(
            (transaction,index)=>{


              const colors =
                catColors[transaction.category]
                ||
               {
              bg:"var(--badge-bg)",
              text:"var(--text-secondary)"
                }



              const isExpense =
                transaction.type === "Expense";



              return (

                <tr
                  key={index}
                  style={styles.tr}
                >


                  <td style={styles.tdDesc}>
                    {transaction.title}
                  </td>



                  <td style={styles.td}>

                    <span
                      style={{
                        ...styles.badge,
                        backgroundColor:colors.bg,
                        color:colors.text
                      }}
                    >

                      {transaction.category}

                    </span>

                  </td>




                  <td
                 style={{
                 ...styles.td,
                  color:"var(--text-muted)"
                  }}
                  >

                    {
                      new Date(
                        transaction.transactionDate
                      ).toLocaleDateString()
                    }

                  </td>




                  <td
                    style={{
                      ...styles.td,
                      textAlign:"right",
                      fontWeight:600,
                      color:isExpense
                        ? "#dc2626"
                        : "#16a34a"
                    }}
                  >

                    {
                      isExpense
                      ? "-"
                      : "+"
                    }

                    $
                    {
                      Math.abs(
                        transaction.amount
                      ).toFixed(2)
                    }

                  </td>



                </tr>

              );


            }
          )
        }



        </tbody>


      </table>


    </div>

  );

}