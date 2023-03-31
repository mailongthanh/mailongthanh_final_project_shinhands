import "./department.scss";
import DepartmentBlock from "../../components/body/departmentblock/DepartmentBlock";
import { department } from "../../enums/department";

import { Col, Row } from "antd";

function Department() {
  return (
    <div className="Department">
      <div className="Department__title">
        <h1 className="font-face-qsb">Department List</h1>
      </div>
      <div className="Department__list">
        {Object.keys(department).map((item, index) => {
          return (
            <DepartmentBlock name={item} key={index} id={department[item]} />
          );
        })}
      </div>
    </div>
  );
}

export default Department;
