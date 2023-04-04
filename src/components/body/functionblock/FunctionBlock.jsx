import React from "react";
import "./functionblock.scss";

import { ArrowRightOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";

import { SwitchKey } from "../../../redux/actions/switchkey";

function FunctionBlock(props) {
  const data = props.item;
  const dispatch = useDispatch();

  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={`${theme} FunctionBlock`}>
      <div className="FunctionBlock__container">
        <div className="FunctionBlock__container-content">
          <div className="FunctionBlock__container-content-txt">
            <span className="font-face-qsm"> {data.label}</span>
          </div>
          <div className="FunctionBlock__container-content-img">
            {data.icon}
          </div>
        </div>

        <div className="FunctionBlock__container-navigate">
          <span className="FunctionBlock__container-navigate-txt font-face-qsb">
            {data.label} List
          </span>
          <Button
            className="FunctionBlock__container-navigate-btn"
            shape="circle"
            size="small"
            icon={<ArrowRightOutlined />}
            onClick={() => dispatch(SwitchKey({ key: data.navkey }))}
          />
        </div>
      </div>
    </div>
  );
}

export default FunctionBlock;
