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
import {
  openFailedNotification,
  openSuccessNotification,
} from "../../../function/openNotification";

function SignUpForm() {
  const navigate = useNavigate();

  //Pass data to login form
  const passUser = (user) => {
    navigate(`/`, {
      state: {
        username: user.username,
        password: user.password,
      },
    });
  };

  //Enter submit button
  const onFinish = async (values) => {
    const res = await createAccount(values);
    if (typeof res !== "string") {
      openSuccessNotification("Your register was successful!");
      passUser(values);
    } else {
      openFailedNotification(res);
    }
    // createAccount(values)
    //   .then(() => {
    //     openSuccessNotification();
    //     passUser(values);
    //   })
    //   .catch(() => openErrorNotification());
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
        {/* Email */}
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

        {/* Username */}
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

        {/* Password */}
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
            { min: 5, message: "Username must be minimum 5 characters." },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>

        {/*Confirm password */}
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Confirm your password"
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
