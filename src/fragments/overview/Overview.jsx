import React, { useEffect, useState } from "react";

import "./overview.scss";
import FunctionBlock from "../../components/body/functionblock/FunctionBlock";
import CardContainer from "../../components/body/card_container/CardContainer";

import PositionChart from "../../components/body/chart/positionchart/PositionChart";
import DepartmentChart from "../../components/body/chart/departmentchart/DepartmentChart";

import { Col, Row } from "antd";
import { UserOutlined, BankOutlined, TeamOutlined } from "@ant-design/icons";

import {
  getEmployeeByDepartment,
  getEmployeeByPosition,
} from "../../services/employeeService";
import { department } from "../../enums/department";
import { positions } from "../../enums/positions";

function Overview() {
  const [positionAmount, setPositionAmount] = useState([]);
  const [departmentAmount, setDepartmentAmount] = useState([]);
  const functionLst = [
    {
      key: "1",
      label: "Employee",
      icon: <TeamOutlined />,
      className: "FunctionBlock-staff",
      navkey: "7",
    },
    {
      key: "2",
      label: "Department",
      icon: <BankOutlined />,
      className: "FunctionBlock-department",
      navkey: "5",
    },
    {
      key: "3",
      label: "Account",
      icon: <UserOutlined />,
      className: "FunctionBlock-account",
      navkey: "3",
    },
  ];

  const getAmountinDepartments = async () => {
    const Amount = [];
    await Object.keys(department).forEach(async (key) => {
      await getEmployeeByDepartment(department[key]).then((res) => {
        Amount.push(res.length);
      });
    });

    setDepartmentAmount(Amount);
  };

  const getAmountinPositions = async () => {
    const Amount = [];
    await Object.keys(positions).forEach(async (key) => {
      await getEmployeeByPosition(positions[key]).then((res) => {
        Amount.push(res.length);
      });
    });

    setPositionAmount(Amount);
  };

  useEffect(() => {
    getAmountinDepartments();
    getAmountinPositions();
  }, []);

  return (
    <div className="Overview">
      <div className="Overview__functionList">
        <Row gutter={16}>
          {functionLst.map((item, index) => {
            return (
              <Col span={8} lg={6}>
                <FunctionBlock item={item} key={index} />
              </Col>
            );
          })}
        </Row>
      </div>

      <div className="Overview__chartList">
        <Row>
          <Col span={12}>
            <CardContainer className="Overview__chartList-position">
              <Row>
                <Col span={12}>
                  <PositionChart amount={positionAmount} />
                </Col>
              </Row>
            </CardContainer>
          </Col>

          <Col span={12}>
            <CardContainer className="Overview__chartList-department">
              <Row>
                <Col span={12}>
                  <DepartmentChart amount={departmentAmount} />
                </Col>
              </Row>
            </CardContainer>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Overview;
