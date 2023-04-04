import React, { useEffect } from "react";
import "./updatemodal.scss";

import { Button, Form, Input, notification, Modal } from "antd";
import { closeModal } from "../../../../redux/actions/modal";
import { useDispatch, useSelector } from "react-redux";

import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { updateUser } from "../../../../services/userService";

import {
  openFailedNotification,
  openSuccessNotification,
} from "../../../../function/openNotification";

function UpdateModal(props) {
  const dispatch = useDispatch();
  const { isOpen, data } = useSelector((state) => state.modal);

  const onFinish = async (values) => {
    await updateUser(data._id, values)
      .then(() => {
        openSuccessNotification("Successfully updated !!!");
        localStorage.setItem("username", values.username);
        dispatch(closeModal({ isUpdated: true }));
      })
      .catch(() => openFailedNotification());
  };

  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        email: data.email,
        username: data.username,
      });
    }
  }, [data]);

  return (
    <Modal
      className="UpdateModal"
      title="Update your account"
      open={isOpen}
      footer={false}
      closable={false}
    >
      <Form
        form={form}
        name="normal_update"
        className="update-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input placeholder="Your new email"></Input>
        </Form.Item>
        <Form.Item name="username" label="Username">
          <Input placeholder="Your new username"></Input>
        </Form.Item>
        <Form.Item>
          <div className="form-footer">
            <Button
              onClick={() => {
                dispatch(closeModal({ isUpdated: false }));
              }}
            >
              Cancel
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              className="update-form-button"
            >
              Update
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UpdateModal;
