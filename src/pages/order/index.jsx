import { Button, Result, Steps } from "antd";
import { useState } from "react";
import ViewOrder from "../../components/Order/viewOrder";
import Payment from "../../components/Order/Payment";
import { SmileOutlined } from "@ant-design/icons";
import './order.scss'

const ResultStyle = {
    height: '500px',
    borderRadius: '8px',
    marginTop: '20px',
    background: 'white'
}
const OrderPage = (props) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div style={{ padding: "20px 0" }}>
      <div
        className="order-container"
        style={{ maxWidth: 1260, marginLeft: "auto", marginRight: "auto" }}
      >
        <div className="order-steps">
          <Steps
            size="small"
            current={currentStep}
            status="finish"
            items={[
              {
                title: "Đơn hàng",
              },
              {
                title: "Đặt hàng",
              },
              {
                title: "Thanh toán",
              },
            ]}
          />
        </div>
        {currentStep === 0 && <ViewOrder setCurrentStep={setCurrentStep} />}
        {currentStep === 1 && <Payment setCurrentStep={setCurrentStep} />}
        {currentStep === 2 && (
          <Result
          style={ResultStyle}
            icon={<SmileOutlined />}
            title="Đơn hàng được đặt thành công"
            extra={<Button type="primary">Xem lịch sử</Button>}
          />
        )}
      </div>
    </div>
  );
};

export default OrderPage;
