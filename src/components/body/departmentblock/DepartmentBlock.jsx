import "./departmentblock.scss";

import {
  UserOutlined,
  BankOutlined,
  TeamOutlined,
  FileOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

import { useSelector } from "react-redux";
import { Button } from "antd";

import { useNavigate } from "react-router-dom";

function DepartmentBlock({ name, id, backgroundImg }) {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);

  const passDepartment = (id, name) => {
    navigate(`/home/departmentdetail`, {
      state: {
        name: name,
        id: id,
      },
    });
  };
  return (
    <div className={`${theme} DepartmentBlock`}>
      <div className="DepartmentBlock__container">
        <div
          className="DepartmentBlock__container-content"
          style={{
            height: "150px",
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url(${backgroundImg})`,
            backgroundSize: "cover",
          }}
        >
          <div className="DepartmentBlock__container-content-txt">
            <span
              className="font-face-qsb"
              style={{ textTransform: "uppercase" }}
            >
              {name}
            </span>
          </div>
        </div>

        <div className="DepartmentBlock__container-navigate">
          <span className="DepartmentBlock__container-navigate-txt font-face-qsb">
            Department detail
          </span>
          <Button
            className="DepartmentBlock__container-navigate-btn"
            shape="circle"
            size="small"
            icon={<ArrowRightOutlined />}
            onClick={() => passDepartment(id, name)}
          />
        </div>
      </div>
    </div>
  );
}

export default DepartmentBlock;
