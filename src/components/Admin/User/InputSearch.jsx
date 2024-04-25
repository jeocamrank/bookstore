import { Button, Col, Form, Input, Row, theme, Space } from "antd";

const InputSearch = (props) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    let query = "";

    if (values.fullName) {
      query += `&fullName=/${values.fullName}/i`;
    }
    if (values.email) {
      query += `&email=/${values.email}/i`;
    }
    if (values.phone) {
      query += `&phone=/${values.phone}/i`;
    }
    if (query) {
      props.handleSearch(query);
    }
  };

  return (
    <Form
      form={form}
      style={{
        boxShadow: "1px 2px 5px 1px rgba(0, 0, 0, 0.25)",
        padding: "10px",
        borderRadius: "7px",
        marginBottom: "25px",
      }}
      name="advanced_search"
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item labelCol={{ span: 24 }} name={`fullName`} label={`Name`}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item labelCol={{ span: 24 }} name={`email`} label={`Email`}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            labelCol={{ span: 24 }}
            name={`phone`}
            label={`Số điện thoại`}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col
          span={24}
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <Space>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button htmlType="button" onClick={() => {
              form.resetFields();
              props.setFilter('');
            }}>Clear</Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
};

export default InputSearch;
