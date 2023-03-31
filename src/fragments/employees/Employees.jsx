import "./employees.scss";

import { Button } from "antd";
import InsertModal from "../../components/body/modal/insert_modal/InsertModal";
import EmployeeTable from "../../components/body/table/employee/EmployeeTable";

import { openModal } from "../../redux/actions/modal";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

function Employees() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  return (
    <div className="Employees">
      <div className="Employees__createEm">
        <Button type="primary" onClick={() => setOpen(true)}>
          Create a new employee
        </Button>
      </div>
      <InsertModal open={open} setOpen={setOpen}></InsertModal>

      <EmployeeTable />
    </div>
  );
}

export default Employees;
