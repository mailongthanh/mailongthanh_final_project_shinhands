import React from "react";

import "./overview.scss";
import FunctionBlock from "../../components/body/functionblock/FunctionBlock";
import CardContainer from "../../components/body/card_container/CardContainer";

import { Col, Row } from "antd";
import { UserOutlined, BankOutlined, TeamOutlined } from "@ant-design/icons";

function Overview() {
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
        <CardContainer></CardContainer>
      </div>
    </div>
  );
}

export default Overview;
