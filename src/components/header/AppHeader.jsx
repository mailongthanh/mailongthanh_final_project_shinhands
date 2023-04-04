import "./appheader.scss";
import React, { useEffect } from "react";

import Icon, { UserOutlined, CaretDownOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Space, Switch } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logoutSuccess } from "../../redux/actions/auth";
import { changeLightMode, changeDarkMode } from "../../redux/actions/theme";
import { SwitchKey } from "../../redux/actions/switchkey";

import { logoutAccount } from "../../services/accountService";

import resetLocalStorage from "../../function/resetLocalStorage";

function AppHeader(props) {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("username");
  const { newData } = useSelector((state) => state.modal);
  const { theme } = useSelector((state) => state.theme);

  //-------ICON CUSTOMIZATION---------
  const SunSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-sun-fill"
      viewBox="0 0 16 16"
    >
      <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
    </svg>
  );
  const SunIcon = (props) => <Icon component={SunSvg} {...props} />;

  const MoonSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-moon-fill"
      viewBox="0 0 16 16"
    >
      <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
    </svg>
  );
  const MoonIcon = (props) => <Icon component={MoonSvg} {...props} />;
  //------END ICON CUSTOMIZATION-------

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = async (userId) => {
    try {
      await logoutAccount(userId).then(async () => {
        await dispatch(logoutSuccess());
        await dispatch(changeLightMode());
        await dispatch(SwitchKey({ key: "2" }));
        await resetLocalStorage();
        navigate("/");
      });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  //DROPDOWN ITEMS
  const items = [
    {
      label: (
        <span onClick={() => dispatch(SwitchKey({ key: "3" }))}>
          Your account
        </span>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: <span style={{ color: "red" }}>Log out</span>,
      key: "1",
      onClick: () => {
        logOutHandler(userId);
      },
    },
  ];

  //Whenever username change, update name on header
  useEffect(() => {}, [newData]);

  return (
    <div className={`${theme} AppHeader`}>
      <div className="AppHeader__Welcome font-face-qsr">
        <span className="font-face-qsm">
          Hello, <span className="font-face-qsb">{userName}</span>
        </span>
      </div>

      <div className="AppHeader__Avatar">
        <Switch
          checkedChildren={
            <SunIcon
              style={{
                color: "orange",
                verticalAlign: "sub",
              }}
            />
          }
          unCheckedChildren={
            <MoonIcon
              style={{
                color: "black",
                verticalAlign: "sub",
              }}
            />
          }
          defaultChecked
          onChange={() => {
            if (theme === "light") {
              dispatch(changeDarkMode());
            }
            if (theme === "dark") {
              dispatch(changeLightMode());
            }
          }}
        />
        <Avatar
          style={{
            backgroundColor: "#87d068",
            marginRight: "5px",
          }}
          icon={<UserOutlined />}
        />

        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
        >
          <span onClick={(e) => e.preventDefault()}>
            <Space>
              <CaretDownOutlined style={{ fontSize: "12px" }} />
            </Space>
          </span>
        </Dropdown>
      </div>
    </div>
  );
}

export default AppHeader;
