import React, { useState } from "react";
import logo from "../../assets/picture/fahasa_logo.png";
import { Button, Form, Input, Divider, message, notification } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { callLogin, callRegister } from "../../services/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const onFinish = async (values) => {
    const { username, password } = values;
    setIsSubmit(true);
    const res = await callLogin(username, password);
    setIsSubmit(false);
    if (res?.data) {
      localStorage.setItem('access_token', res.data.access_token);
      message.success("Đăng nhập thành công!");
      navigate("/");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
        duration: 5,
      });
    }
  };

  return (
    <div className="ac-login_form">
      <div className="ac-login_form_content">
        <div className="login-form-window custom-shadow">
          <div>
            <div>
              <img src={logo} alt="" />A c c h a n M a n g a
            </div>
            <div>
              <p>Welcome back, Customers!</p>
              <p className="last">Select your login method</p>
            </div>
          </div>
          <div className="login-form-window_content">
            <Form
              name="basic"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Email:"
                name="username"
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
                className="forgot-pw-link"
              >
                <Link className="forgot-pw" to="">
                  Forgot password?
                </Link>
              </Form.Item>

              <Form.Item>
                <Button
                  className="custom-login-button"
                  type="primary"
                  htmlType="submit"
                  loading={isSubmit}
                >
                  SIGN IN
                </Button>
              </Form.Item>

              <Divider />

              <Form.Item>
                <Button
                  className="login-google"
                  // htmlType="submit"
                  // loading={isSubmit}
                >
                  <FcGoogle className="google-icon" />
                  continue with google
                </Button>
              </Form.Item>
              <p className="text-to-register">
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
