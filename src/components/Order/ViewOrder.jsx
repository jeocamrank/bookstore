import { Col, Divider, InputNumber, Row } from "antd";
import "./order.scss";
import { DeleteOutlined, DeleteTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  doDeleteItemCartAction,
  doUpdateCartAction,
} from "../../redux/order/orderSlice";
import { useEffect, useState } from "react";
import { Empty } from 'antd';

const ViewOrder = (props) => {
  const carts = useSelector((state) => state.order.carts);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();

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
            md={18}
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
                      <span style={{ color: "rgb(158, 13, 29)", fontWeight: 500 }}>
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
            {carts.length === 0 && 
            <div className="order-book-empty">
              <Empty 
              description={'Không có sản phẩm trong giỏ hàng'}
              />
            </div>}
          </Col>
          <Col md={6} xs={24}>
            <div className="order-sum">
              <div className="calculate">
                <span> Tạm tính</span>
                <span>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalPrice || 0)}
                </span>
              </div>
              <Divider style={{ margin: "10px 0" }} />
              <div className="calculate">
                <span> Tổng tiền</span>
                <span className="sum-final">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalPrice || 0)}
                </span>
              </div>
              <Divider style={{ margin: "10px 0" }} />
              <button onClick={() => props.setCurrentStep(1)}>Mua Hàng ({carts?.length ?? 0})</button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ViewOrder;
