import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend
} from "recharts";

import styles from "../../Styles/ReportsStyle";

export default function IncomeExpenseChart({ data }) {

    const chartData = [
        {
            name: "Overview",
            Income: data.totalIncome,
            Expenses: data.totalExpenses
        }
    ];

    return (

        <div style={styles.chartCard}>

            <h3 style={styles.chartTitle}>
                Income vs Expenses
            </h3>

            <p style={styles.chartSubtitle}>
                Overall financial comparison
            </p>

            <div
                style={{
                    width: "100%",
                    height: "320px"
                }}
            >

                <ResponsiveContainer>

                    <BarChart
                        data={chartData}
                        barGap={12}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="name"
                        />

                        <YAxis />

                        <Tooltip />

                        <Legend />

                        <Bar
                            dataKey="Income"
                            fill="#5B5FEF"
                            radius={[8,8,0,0]}
                            barSize={70}
                        />

                        <Bar
                            dataKey="Expenses"
                            fill="#F4A6AE"
                            radius={[8,8,0,0]}
                            barSize={70}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

            
                <div>

                    <span
                        style={{
                            width:12,
                            height:12,
                            background:"#5B5FEF",
                            display:"inline-block",
                            borderRadius:"3px",
                            marginRight:"8px"
                        }}
                    />

                    Income

                </div>

                <div>

                    <span
                        style={{
                            width:12,
                            height:12,
                            background:"#F4A6AE",
                            display:"inline-block",
                            borderRadius:"3px",
                            marginRight:"8px"
                        }}
                    />

                    Expenses

                </div>

            </div>

       

    );

}