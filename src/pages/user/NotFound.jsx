import React from "react";

import "./notfound.scss";

import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="NotFound">
      <div className="NotFound__container">
        <div className="NotFound__container-txt">
          <h1 className="font-face-qsb">Oops!</h1>
          <p className="font-face-qsm">
            The page you are looking for can't be found.
          </p>
          <Button
            type="primary"
            className="NotFound__container-btn font-face-qsb"
          >
            <span onClick={() => navigate("/")}>Go Home Page</span>
          </Button>
        </div>
        <div className="NotFound__container-img">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/404-error-3702359-3119148.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
