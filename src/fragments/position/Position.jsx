import "./position.scss";

import React, { useState } from "react";

import PositionTable from "../../components/body/table/position/PositionTable";
import { Button, Input } from "antd";

// import { createPosition } from "../../services/positionService";

function Position() {
  // const [input, setInput] = useState();
  // const [reload, setReload] = useState(false);

  // const handleCreatePo = async (position) => {
  //   try {
  //     await setReload(true);
  //     await createPosition(position);
  //     await setReload(false);
  //   } catch (e) {
  //     await setReload(false);
  //   }
  // };

  return (
    <div className="Position">
      {/* <div className="Position__createPo">
        <Input
          className="Position__createPo-input"
          placeholder="Create a new position"
          onChange={(e) => {
            setInput({ positionname: e.target.value });
          }}
        />
        <Button
          onClick={() => handleCreatePo(input)}
          className="Position__createPo-btn"
          type="primary"
        >
          Submit
        </Button>
      </div> */}
      <div className="Position__title">
        <h1 className="font-face-qsb">Position List</h1>
      </div>
      <PositionTable />
    </div>
  );
}

export default Position;
