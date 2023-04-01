import "./department.scss";
import DepartmentBlock from "../../components/body/departmentblock/DepartmentBlock";
import { department } from "../../enums/department";

import { Col, Row } from "antd";

function Department() {
  const backgroundLst = [
    "https://images.unsplash.com/photo-1560264280-88b68371db39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya3BsYWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8d29ya3BsYWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://plus.unsplash.com/premium_photo-1663047716627-e0b6c878761e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29ya3BsYWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHdvcmtwbGFjZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  ];
  return (
    <div className="Department">
      <div className="Department__title">
        <h1 className="font-face-qsb">Department List</h1>
      </div>
      <div className="Department__list">
        {Object.keys(department).map((item, index) => {
          return (
            <DepartmentBlock
              name={item}
              key={index}
              id={department[item]}
              backgroundImg={backgroundLst[index]}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Department;
