import "./department_detail_table.scss";

import { useEffect, useState, useRef } from "react";
import { Space, Table, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

import { getEmployeeByDepartment } from "../../../../services/employeeService";

import { positions } from "../../../../enums/positions";

function DepartmentDetailTable(props) {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [employees, setEmployees] = useState();
  const searchInput = useRef(null);

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
      const res = await getEmployeeByDepartment(props.id);
      setEmployees(res);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
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
      width: "5%",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      width: "10%",
    },

    {
      title: "Position",
      dataIndex: "position",
      width: "20%",
    },
  ];

  const generateIDtoName = (target, id) => {
    let name;

    Object.keys(target).forEach((key) => {
      if (target[key] === id) {
        name = key;
      }
    });

    return name;
  };

  useEffect(() => {
    handleGetEmployees();
  }, []);

  return (
    <div className="DepartmentDetailTable">
      {employees && (
        <Table
          columns={columns}
          loading={loading}
          pagination={{ pageSize: 8 }}
          dataSource={employees.map((item, index) => {
            return {
              ...item,
              key: index,
              position: generateIDtoName(positions, item.positionid),
            };
          })}
          scroll={{
            x: 1300,
          }}
        />
      )}
    </div>
  );
}

export default DepartmentDetailTable;
