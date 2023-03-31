import React, { useEffect, useState } from "react";
import "./positiontable.scss";

import { Space, Table, Popconfirm } from "antd";
import { positions } from "../../../../enums/positions";

import { useSelector } from "react-redux";

import { getListPosition } from "../../../../services/positionService";

function PositionTable(props) {
  const [loading, setLoading] = useState(false);
  // const [positions, setPositions] = useState();

  const { theme } = useSelector((state) => state.theme);

  // const handleGetPositions = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await getListPosition();
  //     await setPositions(res);
  //     setLoading(false);
  //   } catch (err) {
  //     setLoading(false);
  //   }
  // };
  // const handleRemovePosition = async (id) => {
  //   try {
  //     const res = await deletePosition(id);
  //     if (res) {
  //       console.log("You are not allowed to remove");
  //     }
  //     handleGetPositions();
  //   } catch (err) {}
  // };

  // const columns_admin = [
  //   {
  //     title: "No",
  //     dataIndex: "key",
  //     width: "5%",
  //     defaultSortOrder: "ascend",
  //     sorter: (a, b) => a.key - b.key,
  //   },
  //   {
  //     title: "Position Name",
  //     dataIndex: "positionname",
  //     sorter: (a, b) => a.positionname.length - b.positionname.length,
  //     width: "20%",
  //   },
  //   {
  //     title: "Action",
  //     dataIndex: "action",
  //     width: "20%",
  //     render: (_, record) => (
  //       <Space>
  //         <span
  //           className="font-face-qsm"
  //           style={{ color: "blue", cursor: "pointer" }}
  //         >
  //           Edit
  //         </span>

  //         <Popconfirm
  //           title="Sure to delete?"
  //           onConfirm={() => {
  //             handleRemovePosition(record._id);
  //           }}
  //         >
  //           <span
  //             className="font-face-qsm"
  //             style={{ color: "red", cursor: "pointer" }}
  //           >
  //             Delete
  //           </span>
  //         </Popconfirm>
  //       </Space>
  //     ),
  //   },
  // ];

  const columns = [
    {
      title: "No",
      dataIndex: "key",
      width: "5%",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: "Position Name",
      dataIndex: "positionname",
      sorter: (a, b) => a.positionname.length - b.positionname.length,
      width: "20%",
    },
  ];

  // useEffect(() => {
  //   handleGetPositions();
  // }, [props.reload]);

  return (
    <div className={`${theme} PositionTable`}>
      <Table
        columns={columns}
        loading={loading}
        // dataSource={positions.map((item, index) => {
        //   return {
        //     ...item,
        //     key: index,
        //   };
        // })}
        dataSource={Object.keys(positions).map((key, index) => {
          return {
            ...key,
            key: index,
            positionname: key,
          };
        })}
        pagination={{ pageSize: 7 }}
      ></Table>
    </div>
  );
}

export default PositionTable;
