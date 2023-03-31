import React, { useEffect } from "react";
import "./signupform.scss";

import { useNavigate } from "react-router-dom";

import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  SmileOutlined,
  FrownOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";

import { createAccount } from "../../../services/accountService";

import resetLocalStorage from "../../../function/resetLocalStorage";

function SignUpForm() {
  const navigate = useNavigate();

  //reset local storage
  useEffect(() => {
    resetLocalStorage();
  }, []);

  //register success
  const openSuccessNotification = () => {
    notification.open({
      message: "Your register was successful!",
      duration: 2,
      icon: (
        <SmileOutlined
          style={{
            color: "green",
          }}
        />
      ),
    });
  };

  //register error
  const openErrorNotification = () => {
    notification.open({
      message: "Your register was error!",
      duration: 2,
      icon: <FrownOutlined style={{ color: "red" }} />,
    });
  };

  const passUser = (user) => {
    navigate(`/`, {
      state: {
        username: user.username,
        password: user.password,
      },
    });
  };

  //Enter submit button
  const onFinish = (values) => {
    createAccount(values)
      .then(() => {
        openSuccessNotification();
        passUser(values);
      })
      .catch(() => openErrorNotification());
  };

  return (
    <div className="SignUpForm">
      <Form
        name="normal_signup"
        className="signup-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <p className="font-face-qsm">
          Already a member?{" "}
          <a className="font-face-qsb" href="/">
            Login
          </a>
        </p>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="signup-form-button font-face-qsb"
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SignUpForm;
