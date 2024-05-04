import {
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  message,
  notification,
} from "antd";
import "./order.scss";
import {
  DeleteOutlined,
  DeleteTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  doDeleteItemCartAction,
  doPlaceOrderAction,
  doUpdateCartAction,
} from "../../redux/order/orderSlice";
import { useEffect, useState } from "react";
import { Empty } from "antd";
import TextArea from "antd/es/input/TextArea";
import { callPlaceOrder } from "../../services/api";

const Payment = (props) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const carts = useSelector((state) => state.order.carts);
  const user = useSelector((state) => state.account.user);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (carts && carts.length > 0) {
      let sum = 0;
      carts.map((item) => {
        sum += item.quantity * item.detail.price;
      });
      setTotalPrice(sum);
    } else {
      setTotalPrice(0);
    }
  }, [carts]);

  const handleOnChangeInput = (value, book) => {
    if (!value || value < 1) return;
    if (!isNaN(value)) {
      dispatch(
        doUpdateCartAction({ quantity: value, detail: book, _id: book._id })
      );
    }
  };

  const onFinish = async (values) => {
    setIsSubmit(true);
    const detailOrder = carts.map((item) => {
      return {
        bookName: item.detail.mainText,
        quantity: item.quantity,
        _id: item._id,
      };
    });
    const data = {
      name: values.name,
      address: values.address,
      phone: values.phone,
      totalPrice: totalPrice,
      detail: detailOrder,
    };
    const res = await callPlaceOrder(data);
    if (res && res.data) {
      message.success("Đặt hàng thành công!");
      dispatch(doPlaceOrderAction());
      props.setCurrentStep(2);
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsSubmit(false);
  };

  return (
    <div
      style={{
        padding: "20px 0",
        maxWidth: 1260,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div className="order-container" style={{ margin: "0 auto" }}>
        <Row gutter={[20, 20]}>
          <Col
            md={16}
            xs={24}
            style={{ height: 600, maxHeight: 600, overflowY: "auto" }}
          >
            {carts?.map((book, index) => {
              const currentBookPrice = book?.detail?.price ?? 0;
              return (
                <div className="order-book" key={`index-${index}`}>
                  <div className="book-content">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                        book?.detail?.thumbnail
                      }`}
                    />
                    <div className="title">{book?.detail?.mainText}</div>
                    <div className="price">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(currentBookPrice)}
                    </div>
                  </div>
                  <div className="action">
                    <div className="quantity">
                      <InputNumber
                        onChange={(value) => handleOnChangeInput(value, book)}
                        value={book.quantity}
                      />
                    </div>
                    <div className="sum">
                      Tổng: &nbsp;
                      <span
                        style={{ color: "rgb(158, 13, 29)", fontWeight: 500 }}
                      >
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(currentBookPrice * book?.quantity)}
                      </span>
                    </div>
                    <DeleteTwoTone
                      style={{ cursor: "pointer", fontSize: 20 }}
                      onClick={() =>
                        dispatch(doDeleteItemCartAction({ _id: book._id }))
                      }
                      twoToneColor="red"
                    />
                  </div>
                </div>
              );
            })}
            {carts.length === 0 && (
              <div className="order-book-empty">
                <Empty description={"Không có sản phẩm trong giỏ hàng"} />
              </div>
            )}
          </Col>
          <Col
            md={8}
            xs={24}
            style={{
              background: "white",
              padding: "20px",
              height: "100%",
              borderRadius: 8,
              paddingTop: 20,
              paddingBottom: 20,
            }}
          >
            <Form onFinish={onFinish} form={form}>
              <Form.Item
                style={{ margin: 0 }}
                labelCol={{ span: 24 }}
                label="Tên người nhận"
                name="name"
                initialValue={user?.fullName}
                rules={[
                  {
                    required: true,
                    message: "Số điện thoại không được để trống!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={{ margin: 0 }}
                labelCol={{ span: 24 }}
                label="Số điện thoại"
                name="phone"
                initialValue={user?.phone}
                rules={[
                  {
                    required: true,
                    message: "Số điện thoại không được để trống!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={{ margin: 0 }}
                labelCol={{ span: 24 }}
                label="Địa chỉ"
                name="address"
                rules={[
                  { required: true, message: "Địa chỉ không được để trống!" },
                ]}
              >
                <TextArea autoFocus rows={4} />
              </Form.Item>
            </Form>
            <div className="info" style={{ marginTop: 20 }}>
              <div className="method">
                <div style={{ fontWeight: 500 }}> Hình thức thanh toán </div>
                <Radio checked>Thanh toán khi nhận hàng</Radio>
              </div>
            </div>
            <Divider style={{ margin: "15px 0" }} />
            <div
              className="calculate"
              style={{
                marginTop: 15,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span> Tổng tiền :</span>
              <span
                className="sum-final"
                style={{
                  marginLeft: 10,
                  fontWeight: 500,
                  fontSize: 20,
                  color: "#9E0D1D",
                }}
              >
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalPrice || 0)}
              </span>
            </div>
            <Divider style={{ margin: "15px 0" }} />
            <button
              onClick={() => form.submit()}
              disabled={isSubmit}
              style={{
                background: "#9E0D1D",
                color: "white",
                fontSize: 16,
                padding: "20px",
                width: "100%",
                borderRadius: 3,
                cursor: "pointer",
                border: 'none'
              }}
            >
              {isSubmit && (
                <span>
                  <LoadingOutlined /> &nbsp;
                </span>
              )}
              Đặt hàng ({carts?.length ?? 0})
            </button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Payment;
