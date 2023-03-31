import "./employeetable.scss";

import { useEffect, useState, useRef } from "react";
import { Space, Table, Popconfirm, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";

import EmployeeModal from "../../modal/update_modal/employeemodal/EmployeeModal";

import { openModal } from "../../../../redux/actions/modal";
import {
  getListEmployee,
  deleteEmployee,
} from "../../../../services/employeeService";

function EmployeeTable() {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [employees, setEmployees] = useState();
  const searchInput = useRef(null);

  const { isOpen, isUpdated } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleGetEmployees = async () => {
    setLoading(true);
    try {
      const res = await getListEmployee();
      setEmployees(res);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleRemoveEmployee = async (id) => {
    try {
      await deleteEmployee(id);
      const res = await getListEmployee();
      setEmployees(res);
    } catch {}
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "No",
      dataIndex: "key",
      width: "5%",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Phone Number",
      dataIndex: "phonenumber",
      width: "20%",
    },
    {
      title: "Age",
      dataIndex: "age",
      width: "10%",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      width: "20%",
    },

    {
      title: "Position",
      dataIndex: "positionid",
      width: "20%",
    },
    {
      title: "Department",
      dataIndex: "departmentid",
      width: "20%",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "20%",
      fixed: "right",
      render: (_, record) => (
        <Space>
          <a
            className="font-face-qsm"
            onClick={() => dispatch(openModal({ data: record }))}
          >
            Edit
          </a>

          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => {
              handleRemoveEmployee(record._id);
            }}
          >
            <a className="font-face-qsm" style={{ color: "red" }}>
              Delete
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    handleGetEmployees();
  }, [isUpdated]);

  return (
    <div className="EmployeeTable">
      <Table
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 8 }}
        dataSource={employees}
        scroll={{
          x: 1300,
        }}
      />

      <EmployeeModal />
    </div>
  );
}

export default EmployeeTable;
