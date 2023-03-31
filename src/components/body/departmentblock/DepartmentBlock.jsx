import "./departmentblock.scss";

import {
  UserOutlined,
  BankOutlined,
  TeamOutlined,
  FileOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { SwitchKey } from "../../../redux/actions/switchkey";

import { useNavigate } from "react-router-dom";

function DepartmentBlock({ name, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const passDepartment = (id, name) => {
    navigate(`/home/departmentdetail`, {
      state: {
        name: name,
        id: id,
      },
    });
  };
  return (
    <div className="DepartmentBlock">
      <div className="DepartmentBlock__container">
        <div className="DepartmentBlock__container-content">
          <div className="DepartmentBlock__container-content-txt">
            <h1 className="font-face-qsb">9</h1>
            <span className="font-face-qsm">{name}</span>
          </div>
        </div>

        <div className="DepartmentBlock__container-navigate">
          <span className="DepartmentBlock__container-navigate-txt font-face-qsb">
            Department List
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
