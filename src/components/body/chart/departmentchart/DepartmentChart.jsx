import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

import { useSelector } from "react-redux";

import { department } from "../../../../enums/department";
import { getEmployeeByDepartment } from "../../../../services/employeeService";

function DepartmentChart() {
  const labels = Object.keys(department);
  // const [departmentAmount, setDepartmentAmount] = useState([]);
  // const { key } = useSelector((state) => state.switchkey);

  // const getAmountinDepartments = async () => {
  //   const Amount = [];
  //   await Object.keys(department).forEach(async (key) => {
  //     await getEmployeeByDepartment(department[key]).then((res) => {
  //       Amount.push(res.length);
  //     });
  //   });

  //   setDepartmentAmount(Amount);
  //   localStorage.setItem("department_amount", departmentAmount);
  // };

  // useEffect(() => {
  //   if (!localStorage.getItem("department_amount")) {
  //     getAmountinDepartments();
  //   } else if (
  //     localStorage.getItem("department_amount").split(",") === departmentAmount
  //   ) {
  //     getAmountinDepartments();
  //   }
  // }, [key]);

  // const options = {
  //   animation: false,
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //     tooltips: {
  //       callbacks: {
  //         label: function (tooltipItem) {
  //           return tooltipItem.yLabel;
  //         },
  //       },
  //     },
  //   },
  // };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Employee",
        data: [1, 1, 1, 1],
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
      <Pie data={data} options={{ responsive: true }} />
    </div>
  );
}

export default DepartmentChart;
