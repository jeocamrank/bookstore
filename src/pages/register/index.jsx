import React, { useState } from "react";
import logo from "../../assets/picture/fahasa_logo.png";
import { Button, Form, Input, Divider, message, notification } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="ac-register_form">
      <div className="ac-register_form_content">
        <div className="register-form-window custom-shadow">
          <div>
            <div>
              <img src={logo} alt="" />A c c h a n Ma n g a
            </div>
            <div>
              <p>Welcome back, Customers!</p>
              <p className="last">Select your login method</p>
            </div>
          </div>
          <div className="register-form-window_content">
            <Form
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Họ tên:"
                name="fullName"
                rules={[
                  { required: true, message: "Họ và tên không được để trống" },
                ]}
              >
                <Input className="custom-input" placeholder="fullName" />
              </Form.Item>

              <Form.Item
                label="Email:"
                name="email"
                rules={[
                  { required: true, message: "Email không được để trống" },
                ]}
              >
                <Input className="custom-input" placeholder="Email" />
              </Form.Item>

              <Form.Item
                label="Mật khẩu:"
                name="password"
                rules={[
                  { required: true, message: "Mật khẩu không được để trống" },
                ]}
              >
                <Input.Password
                  className="custom-input"
                  placeholder="Enter your password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <Form.Item
                label="Số điện thoại:"
                name="phone"
                rules={[
                  { required: true, message: "Họ và tên không được để trống" },
                ]}
              >
                <Input className="custom-input" placeholder="phoneNumber" />
              </Form.Item>

              <Form.Item>
                <Button
                  className="custom-register-button"
                  htmlType="submit"
                  loading={isSubmit}
                >
                  SIGN UP
                </Button>
              </Form.Item>

              <Divider />

              <Form.Item>
                <Button
                  className="register-google"
                  // htmlType="submit"
                  // loading={isSubmit}
                >
                  <FcGoogle className="google-icon"/>continue with google
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
