import {
  FiTarget,
  FiDollarSign,
  FiTrendingUp,
  FiCheckCircle,
} from "react-icons/fi";

import styles from "../../Styles/goalStyles";

function formatMoney(amount) {
 return `Rs ${Number(amount).toLocaleString("en-PK", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}`;
}

export default function GoalStats({ goals }) {
  const totalGoals = goals.length;

  const totalSaved = goals.reduce(
    (sum, goal) => sum + Number(goal.currentAmount),
    0
  );

  const totalTarget = goals.reduce(
    (sum, goal) => sum + Number(goal.targetAmount),
    0
  );

  const completedGoals = goals.filter(
    (goal) => goal.currentAmount >= goal.targetAmount
  ).length;

  const onTrackGoals = goals.filter(
    (goal) =>
      goal.targetAmount > 0 &&
      goal.currentAmount / goal.targetAmount >= 0.5
  ).length;

  const stats = [
    {
      title: "Total Goals",
      value: totalGoals,
      icon: <FiTarget />,
      color: "#4f46e5",
    },
    {
      title: "Total Saved",
      value: formatMoney(totalSaved),
      icon: <FiDollarSign />,
      color: "#16a34a",
    },
    {
      title: "Total Target",
      value: formatMoney(totalTarget),
      icon: <FiTrendingUp />,
      color: "black",
    },
    {
      title: "Completed",
      value: completedGoals,
      icon: <FiCheckCircle />,
      color: "#059669",
    },
    {
      title: "On Track",
      value: `${onTrackGoals} / ${totalGoals}`,
      icon: <FiTrendingUp />,
      color: "#f59e0b",
    },
  ];

  return (
    <div style={styles.statsContainer}>
      {stats.map((stat) => (
        <div
          key={stat.title}
          style={{
            ...styles.statCard,
            borderTop: `4px solid ${stat.color}`,
          }}
        >
          <div
            style={{
              ...styles.statIcon,
              color: stat.color,
            }}
          >
            {stat.icon}
          </div>

          <div style={styles.statContent}>
            <p style={styles.statTitle}>
              {stat.title}
            </p>

            <h2 style={styles.statValue}>
              {stat.value}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}