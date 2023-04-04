import React, { useState } from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

import { useSelector } from "react-redux";

import { positions } from "../../../../enums/positions";
import { getEmployeeByPosition } from "../../../../services/employeeService";
import { useEffect } from "react";

function PositionChart() {
  const labels = Object.keys(positions);
  const [positionAmount, setPositionAmount] = useState([]);
  const { key } = useSelector((state) => state.switchkey);

  const getAmountinPositions = async () => {
    const Amount = [];
    await Object.keys(positions).forEach(async (key) => {
      await getEmployeeByPosition(positions[key]).then((res) => {
        Amount.push(res.length);
      });
    });

    setPositionAmount(Amount);
    localStorage.setItem("position_amount", positionAmount);
  };

  useEffect(() => {
    if (!localStorage.getItem("position_amount")) {
      getAmountinPositions();
    } else if (
      localStorage.getItem("position_amount").split(",") === positionAmount
    ) {
      getAmountinPositions();
    }
  }, [key]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Employee",
        data: [1, 1],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2 className="font-face-qsb" style={{ marginBottom: "10px" }}>
        Position
      </h2>
      <Pie data={data} options={{ responsive: true }} />
    </div>
  );
}

export default PositionChart;
