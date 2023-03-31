import "./departmentdetail.scss";
import DepartmentDetailTable from "../../components/body/table/department_detail/DepartmentDetailTable";
import { useLocation, useNavigate } from "react-router-dom";

function DepartmentDetail() {
  const location = useLocation();
  const item = location.state;
  return (
    <div className="DepartmentDetail">
      <div className="DepartmentDetail__title">
        <h1 className="font-face-qsb">Department Detail</h1>
      </div>

      <DepartmentDetailTable id={item.id.id} />
    </div>
  );
}

export default DepartmentDetail;
