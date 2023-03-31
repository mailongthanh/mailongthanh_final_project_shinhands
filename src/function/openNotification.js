import { SmileOutlined, FrownOutlined } from "@ant-design/icons";

import { notification } from "antd";

export const openFailedNotification = (message, duration) => {
  notification.open({
    message,
    duration,
    icon: (
      <FrownOutlined
        style={{
          color: "red",
        }}
      />
    ),
  });
};

export const openSuccessNotification = (message, duration) => {
  notification.open({
    message,
    duration,
    icon: (
      <SmileOutlined
        style={{
          color: "green",
        }}
      />
    ),
  });
};
