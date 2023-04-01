import "./accounttable.scss";

import { Space, Table, Popconfirm, Button, Input } from "antd";
import { useEffect, useState, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

import UpdateModal from "../../modal/update_modal/UpdateModal";
import { openModal } from "../../../../redux/actions/modal";
import { useDispatch, useSelector } from "react-redux";
import "./accounttable.scss";
import { getListUser, deleteUser } from "../../../../services/userService";

import { openSuccessNotification } from "../../../../function/openNotification";

function AccountTable() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
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

  const dispatch = useDispatch();
  const { isOpen, isUpdated } = useSelector((state) => state.modal);
  const { theme } = useSelector((state) => state.theme);

  const userId = localStorage.getItem("userId");
  const isAdmin = localStorage.getItem("isAdmin");

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
      title: "Username",
      dataIndex: "username",
      width: "20%",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Role",
      dataIndex: "role",
      width: "20%",
      filters: [
        {
          text: "Admin",
          value: "admin",
        },
        {
          text: "User",
          value: "user",
        },
      ],
      onFilter: (value, record) => record.role.indexOf(value) === 0,
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "10%",
      fixed: "right",
      render: (_, record) => (
        <Space>
          {userId === record._id && (
            <>
              <a
                className="font-face-qsm"
                onClick={() => dispatch(openModal({ data: record }))}
              >
                Edit
              </a>

              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => {
                  handleRemoveUser(record._id);
                }}
              >
                <a className="font-face-qsm" style={{ color: "red" }}>
                  Delete
                </a>
              </Popconfirm>
            </>
          )}

          {isAdmin === "admin" && userId !== record._id && (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => {
                handleRemoveUser(record._id);
              }}
            >
              <a className="font-face-qsm" style={{ color: "red" }}>
                Delete
              </a>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  const handleGetUsers = async () => {
    setLoading(true);
    try {
      const res = await getListUser();
      setUsers(res);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  async function handleRemoveUser(userId) {
    try {
      const resDelete = await deleteUser(userId);

      if (resDelete) {
        openSuccessNotification(resDelete, 1.5);
      }

      const res = await getListUser();
      setUsers(res);
    } catch (err) {}
  }

  useEffect(() => {
    handleGetUsers();
  }, [isUpdated]);

  return (
    <div className={`${theme} AccountTable`}>
      <Table
        columns={columns}
        dataSource={users.map((item, index) => {
          return {
            ...item,
            key: index,
            number: index + 1,
            role: item.isAdmin ? "admin" : "user",
          };
        })}
        loading={loading}
        pagination={{ pageSize: 8 }}
        scroll={{
          x: 1300,
        }}
      />

      <UpdateModal isModalOpen={isOpen}></UpdateModal>
    </div>
  );
}

export default AccountTable;
