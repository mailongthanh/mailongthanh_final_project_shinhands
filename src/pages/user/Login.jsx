import "./login.scss";

import React from "react";

import { Col, Row } from "antd";
import LoginForm from "../../components/body/loginform/LoginForm";
import WelcomeSwiper from "../../components/body/welcome_swiper/WelcomeSwiper";

import resetLocalStorage from "../../function/resetLocalStorage";

function Login() {
  resetLocalStorage();

  return (
    <div className="Login">
      <div className="Login__container">
        <Row>
          <Col lg={{ span: 8 }} md={{ span: 24 }} sm={{ span: 24 }}>
            <div className="Login__container-loginform">
              <div className="Login__container-loginform-welcometxt">
                <h2 className="font-face-qsb">Welcome Back!</h2>
                <span className="font-face-qsm">Login to continue</span>
              </div>
              <LoginForm />
            </div>
          </Col>
          <Col lg={{ span: 16 }} md={{ span: 0 }} sm={{ span: 0 }}>
            <div className="Login__container-welcomeswiper">
              <WelcomeSwiper />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Login;
