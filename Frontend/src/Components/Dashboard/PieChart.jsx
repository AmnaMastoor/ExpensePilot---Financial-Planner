import { useEffect, useState } from "react";
import api from "../../services/api";
import styles from "../../styles/dashboardStyles";

export default function PieChart() {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await api.get("/dashboard/expense-chart");
        setCategoryData(res.data);
      } catch (err) {
        console.error("Error loading chart:", err);
      }
    };

    getCategories();
  }, []);

  const size = 170;
  const radius = size / 2;

  const total = categoryData.reduce((sum, d) => sum + d.value, 0);

  let cumulative = 0;

  const slices = categoryData.map((d) => {
    const startAngle = total === 0 ? 0 : (cumulative / total) * 360;
    cumulative += d.value;
    const endAngle = total === 0 ? 0 : (cumulative / total) * 360;

    return {
      ...d,
      startAngle,
      endAngle,
    };
  });

  const polarToCartesian = (angle) => {
    const rad = ((angle - 90) * Math.PI) / 180;

    return {
      x: radius + radius * Math.cos(rad),
      y: radius + radius * Math.sin(rad),
    };
  };

  const describeSlice = (startAngle, endAngle) => {
    const start = polarToCartesian(endAngle);
    const end = polarToCartesian(startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

    return `M ${radius} ${radius}
            L ${start.x} ${start.y}
            A ${radius} ${radius}
            0 ${largeArcFlag}
            0 ${end.x} ${end.y}
            Z`;
  };

  const labelPosition = (startAngle, endAngle, offset = 1.35) => {
    const middle = (startAngle + endAngle) / 2;

    const rad = ((middle - 90) * Math.PI) / 180;

    return {
      x: radius + radius * offset * Math.cos(rad),
      y: radius + radius * offset * Math.sin(rad),
    };
  };

  const canvasWidth = size + 220;
  const canvasHeight = size + 140;

  const offsetX = (canvasWidth - size) / 2;
  const offsetY = (canvasHeight - size) / 2;

  return (
    <div style={styles.panel}>
      <h3 style={styles.panelTitle}>Expenses by Category</h3>

      <div style={styles.pieWrap}>
        <svg
          width={canvasWidth}
          height={canvasHeight}
          viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
        >
          <g transform={`translate(${offsetX}, ${offsetY})`}>
            {slices.map((slice, index) => (
              <path
                key={index}
                d={describeSlice(slice.startAngle, slice.endAngle)}
                fill={slice.color}
                stroke="#fff"
                strokeWidth="2"
              />
            ))}

            {slices.map((slice, index) => {
              const pos = labelPosition(
                slice.startAngle,
                slice.endAngle
              );

              return (
                <text
                  key={index}
                  x={pos.x}
                  y={pos.y}
                  fontSize="10"
                  textAnchor="middle"
                  fill={slice.color}
                  fontWeight="500"
                >
                  {slice.label} ({slice.value}%)
                </text>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}