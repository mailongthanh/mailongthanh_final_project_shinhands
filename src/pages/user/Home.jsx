import "./home.scss";

import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Layout } from "antd";
import {
  HomeOutlined,
  TeamOutlined,
  DashboardOutlined,
  InsertRowRightOutlined,
  GoldOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  IdcardOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AppHeader from "../../components/header/AppHeader";

import Overview from "../../fragments/overview/Overview";
import Account from "../../fragments/account/Account";
import Position from "../../fragments/position/Position";
import Employees from "../../fragments/employees/Employees";
import Department from "../../fragments/department/Department";
import DepartmentDetail from "../../fragments/department_detail/DepartmentDetail";
import Logo from "../../components/body/logo/Logo";

import variables from "../../scss/_variables.scss";

import { SwitchKey } from "../../redux/actions/switchkey";

const { Header, Sider, Content } = Layout;

function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("2");
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();
  const { key } = useSelector((state) => state.switchkey);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const siderStyle = {
    backgroundColor: "#a294fe",
    borderRadius: "0 30px 30px 0",
    boxShadow:
      theme === "light"
        ? variables[`card-box-shadow-lightmode`]
        : variables[`card-box-shadow-darkmode`],
  };

  const contentstyle = {
    margin: "24px 16px",
    padding: 24,
    minHeight: 280,
    backgroundColor:
      theme === "light"
        ? variables[`container-lightmode-bg-color`]
        : variables[`container-darkmode-bg-color`],
    borderRadius: "5px 5px 30px 30px",
    boxShadow:
      theme === "light"
        ? variables[`card-box-shadow-lightmode`]
        : variables[`card-box-shadow-darkmode`],
  };

  //Menu items
  const items = [
    // {
    //   key: "1",
    //   icon: <DashboardOutlined />,
    //   label: "Dashboard",
    // },
    {
      key: "2",
      icon: <HomeOutlined />,
      label: "Overview",
    },
    {
      key: "3",
      icon: <TeamOutlined />,
      label: "Accounts",
    },
    {
      key: "4",
      icon: <InsertRowRightOutlined />,
      label: "Company",
      children: [
        {
          key: "5",
          icon: <GoldOutlined />,
          label: "Department",
        },
        {
          key: "6",
          icon: <IdcardOutlined />,
          label: "Position",
        },
        {
          key: "7",
          icon: <UserOutlined />,
          label: "Employee",
        },
      ],
    },
  ];

  //GenerateKeytoPath
  const generateKeytoPath = (key) => {
    switch (key) {
      case "1": {
        return "dashboard";
      }
      case "2": {
        return "overview";
      }
      case "3": {
        return "accounts";
      }
      case "5": {
        return "department";
      }
      case "6": {
        return "positions";
      }
      case "7": {
        return "employees";
      }
      case "8": {
        return "departmentdetail";
      }
      default:
        break;
    }
  };

  useEffect(() => {
    const path = generateKeytoPath(key);
    setSelectedMenuItem(key);
    navigate(path);
  }, [key]);

  return (
    <div className={`${theme} Home`}>
      <Layout
        style={{
          height: "100vh",
          backgroundColor:
            theme === "light"
              ? variables[`layout-lightmode-bg-color`]
              : variables[`layout-darkmode-bg-color`],
        }}
      >
        {/* SIDEBAR */}
        <Sider
          className="Home__Sider"
          trigger={null}
          collapsed={collapsed}
          style={siderStyle}
          breakpoint="md"
          onBreakpoint={() => {
            setCollapsed(true);
          }}
        >
          <div className="Home__Logo">
            <Logo />
          </div>

          <Menu
            className="font-face-qsb Home__Menu"
            mode="inline"
            defaultSelectedKeys={["2"]}
            items={items}
            selectedKeys={selectedMenuItem}
            onClick={({ key }) => {
              dispatch(SwitchKey({ key: key }));
            }}
          />
        </Sider>

        {/* CONTENT */}
        <Layout
          className="site-layout"
          style={{
            backgroundColor:
              theme === "light"
                ? variables[`layout-lightmode-bg-color`]
                : variables[`layout-darkmode-bg-color`],
            color:
              theme === "light"
                ? variables[`text-lightmode-color`]
                : variables[`text-darkmode-color`],
          }}
        >
          {/* HEADER */}
          <Header className="Home__Header__container">
            <span
              className="collapsedIcon"
              style={{ cursor: "pointer" }}
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>

            <div className="Home__Header">
              <AppHeader />
            </div>
          </Header>

          {/* BODY */}
          <Content style={contentstyle}>
            <Routes>
              <Route path="/accounts" element={<Account />}></Route>
              <Route path="/overview" element={<Overview />}></Route>
              <Route path="/positions" element={<Position />}></Route>
              <Route path="/employees" element={<Employees />}></Route>
              <Route path="/department" element={<Department />}></Route>
              <Route
                path="/departmentdetail"
                element={<DepartmentDetail />}
              ></Route>
            </Routes>
            {/* {generateKeytoPath(selectedMenuItem)} */}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Home;
