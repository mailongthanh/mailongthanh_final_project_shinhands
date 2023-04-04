import React, { useEffect, useState } from "react";
import "./employeemodal.scss";

import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Radio,
  Slider,
  Modal,
  notification,
} from "antd";

import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../../../redux/actions/modal";

import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { updateEmployee } from "../../../../../services/employeeService";

import { positions } from "../../../../../enums/positions";
import { department } from "../../../../../enums/department";

function EmployeeModal(props) {
  const dispatch = useDispatch();
  const { isOpen, data } = useSelector((state) => state.modal);

  const { Option } = Select;

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="84">+84</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const openSuccessNotification = () => {
    notification.open({
      message: "Your update was successful!",
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

  const openFailedNotification = () => {
    notification.open({
      message: "You are not allowed to do that!",
      duration: 2,
      icon: (
        <FrownOutlined
          style={{
            color: "red",
          }}
        />
      ),
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  //Slider Age
  const [inputValue, setInputValue] = useState(1);
  const ageHandler = (newValue) => {
    setInputValue(newValue);
  };

  // //Select position
  const positionHandler = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  // //Select department
  const departmentHandler = (value) => {};
  const departmentSearch = (value) => {};

  const onFinish = async (values) => {
    await updateEmployee(data._id, values)
      .then(() => {
        openSuccessNotification();
        dispatch(closeModal({ isUpdated: true }));
      })
      .catch(() => openFailedNotification());
  };

  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        email: data.email,
        name: data.name,
        age: data.age,
        phonenumber: data.phonenumber,
        gender: data.gender,
      });
    }
  }, [data]);

  return (
    <Modal
      className="InsertModal"
      title={props.title}
      open={isOpen}
      footer={false}
      closable={false}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: "84",
        }}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Name"
          tooltip="Employee Name"
          rules={[
            {
              required: true,
              message: "Please input employee name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="age" label="Age">
          <Row>
            <Col span={12}>
              <Slider
                min={1}
                max={20}
                onChange={ageHandler}
                value={typeof inputValue === "number" ? inputValue : 0}
              />
            </Col>
            <Col span={4}>
              <InputNumber
                min={1}
                max={20}
                style={{
                  margin: "0 16px",
                }}
                value={inputValue}
                onChange={ageHandler}
              />
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phonenumber"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
              message: "Please select gender!",
            },
          ]}
        >
          <Select placeholder="select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item name="positionid" label="Position">
          <Select
            showSearch
            placeholder="Select a position"
            optionFilterProp="children"
            onChange={positionHandler}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={Object.keys(positions).map((item, index) => {
              return {
                ...item,
                label: item,
                value: positions[item],
              };
            })}
          />
        </Form.Item>

        <Form.Item name="departmentid" label="Department">
          <Select
            showSearch
            placeholder="Select a department"
            optionFilterProp="children"
            onChange={departmentHandler}
            onSearch={departmentSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={Object.keys(department).map((item, index) => {
              return {
                ...item,
                label: item,
                value: department[item],
              };
            })}
          />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Form.Item>
            <div className="form-footer">
              <Button
                onClick={() => {
                  dispatch(closeModal({ isUpdated: false }));
                }}
              >
                Cancel
              </Button>

              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </div>
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EmployeeModal;
