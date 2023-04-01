import React from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

import { positions } from "../../../../enums/positions";

function PositionChart({ amount }) {
  const labels = Object.keys(positions);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Employee",
        data: amount,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.yLabel;
          },
        },
      },
    },
  };
  return (
    <div className="chart-container">
      <h2 className="font-face-qsb" style={{ marginBottom: "10px" }}>
        Position
      </h2>
      <Pie data={data} />
    </div>
  );
}

export default PositionChart;
