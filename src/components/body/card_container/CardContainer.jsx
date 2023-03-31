import React from "react";
import { Card } from "antd";

import "./cardcontainer.scss";

function CardContainer(props) {
  return (
    <div className="CardContainer">
      <Card className={`${props.className}`}>{props.children}</Card>
    </div>
  );
}

export default CardContainer;
