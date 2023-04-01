import "./departmentdetail.scss";
import DepartmentDetailTable from "../../components/body/table/department_detail/DepartmentDetailTable";
import { useLocation, useNavigate } from "react-router-dom";
import { CaretRightOutlined } from "@ant-design/icons";

function DepartmentDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state;
  return (
    <div className="DepartmentDetail">
      <div className="DepartmentDetail__title">
        <span
          className="font-face-qsb"
          onClick={() => {
            navigate("/home/department");
          }}
        >
          Department
        </span>
        <CaretRightOutlined />
        <h1 className="font-face-qsb">{item.name} Detail</h1>
      </div>

      <DepartmentDetailTable id={item.id} />
    </div>
  );
}

export default DepartmentDetail;
