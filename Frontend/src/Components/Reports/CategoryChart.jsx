import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip
} from "recharts";

import styles from "../../Styles/ReportsStyle";

const COLORS = [
    "#5B5FEF",
    "#4F46E5",
    "#14B8A6",
    "#F97316",
    "#22C55E",
    "#EF4444",
    "#06B6D4",
    "#8B5CF6"
];

export default function CategoryChart({ data }) {

    const total = data.reduce(
        (sum, item) => sum + item.amount,
        0
    );

    return (

        <div style={styles.chartCard}>

            <h3 style={styles.chartTitle}>
                Category Wise Expenses
            </h3>

            <p style={styles.chartSubtitle}>
                Spending breakdown
            </p>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px"
                }}
            >

                {/* Donut Chart */}

                <div
    style={{
        width: "180px",
        height: "180px"
    }}
>

                    <ResponsiveContainer>

                        <PieChart>

                            <Pie
                                data={data}
                                dataKey="amount"
                                nameKey="category"
                                innerRadius={45}
                                outerRadius={75}
                                paddingAngle={3}
                            >

                                {
                                    data.map((item, index) => (

                                        <Cell
                                            key={index}
                                            fill={
                                                COLORS[
                                                index %
                                                COLORS.length
                                                ]
                                            }
                                        />

                                    ))
                                }

                            </Pie>

                            <Tooltip />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

                {/* Category List */}

                <div
                    style={{
                        flex: 1
                    }}
                >

                    {

                        data.map((item, index) => (

                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems: "center",
                                    marginBottom: "12px"
                                }}
                            >

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px"
                                    }}
                                >

                                    <span
                                        style={{
                                            width: "12px",
                                            height: "12px",
                                            borderRadius: "50%",
                                            background:
                                                COLORS[
                                                index %
                                                COLORS.length
                                                ]
                                        }}
                                    />

                                    <span
                                        style={{
                                            fontSize: "14px",
                                            color: "#374151"
                                        }}
                                    >
                                        {item.category}
                                    </span>

                                </div>

                                <strong>
                                    Rs. {item.amount}
                                </strong>

                            </div>

                        ))

                    }

                    <hr
                        style={{
                            margin: "15px 0",
                            border:
                                "1px solid #F3F4F6"
                        }}
                    />

                    <div
                        style={{
                            display: "flex",
                            justifyContent:
                                "space-between",
                            fontWeight: "700",
                            fontSize: "15px"
                        }}
                    >

                        <span>Total</span>

                        <span>
                            Rs. {total}
                        </span>

                    </div>

                </div>

            </div>

        </div>

    );

}