import React from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

import { department } from "../../../../enums/department";

function DepartmentChart({ amount }) {
  const labels = Object.keys(department);
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
          "#a294fe",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className="chart-container">
      <h2 className="font-face-qsb" style={{ marginBottom: "10px" }}>
        Department
      </h2>
      <Pie data={data} />
    </div>
  );
}

export default DepartmentChart;
