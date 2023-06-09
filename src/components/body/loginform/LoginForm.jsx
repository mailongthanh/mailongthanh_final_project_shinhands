import "./loginform.scss";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, notification } from "antd";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { FrownOutlined } from "@ant-design/icons";

import { loginSuccess } from "../../../redux/actions/auth";
import { loginAccount } from "../../../services/accountService";

import { openFailedNotification } from "../../../function/openNotification";
import resetLocalStorage from "../../../function/resetLocalStorage";

function LoginForm() {
  const location = useLocation();
  const item = location.state;
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  //whenever return loginform, reset local storage
  useEffect(() => {
    resetLocalStorage();
    if (item) {
      form.setFieldsValue({
        username: item.username,
        password: item.password,
      });
    }
  }, []);

  const onFinish = async (values) => {
    try {
      const res = await loginAccount(values);

      if (typeof res != "string") {
        dispatch(
          loginSuccess({
            accessToken: res.accessToken,
            userId: res._id,
            username: res.username,
            isAdmin: res.isAdmin,
          })
        );
        navigate("/home/overview");
      } else {
        openFailedNotification(res);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div className="LoginForm">
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
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
            className="font-face-qsb"
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

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="font-face-qsm">Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button font-face-qsb"
          >
            Log in
          </Button>
          <span className="font-face-qsm">
            Or{" "}
            <a href="/signup" className="font-face-qsb">
              register now!
            </a>
          </span>
        </Form.Item>
      </Form>
    </div>
  );
}
export default LoginForm;
