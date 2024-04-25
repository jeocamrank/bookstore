import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "antd";
import InputSearch from "./InputSearch.jsx";
import { callFetchListUser } from "../../../services/api.js";
import {
  CloudUploadOutlined,
  DeleteOutlined,
  ExportOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { render } from "react-dom";
import UserViewDetail from "./UserViewDetail.jsx";
import UserModalCreate from "./UserModalCreate.jsx";
import UserImport from "./data/UserImport.jsx";

const UserTable = () => {
  const [listUser, setListUser] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("");
  const [dataViewDetail, setDataViewDetail] = useState("");
  const [openViewDetail, setOpenViewDetail] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalImport, setOpenModalImport] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [current, pageSize, filter, sortQuery]);

  const fetchUser = async () => {
    setIsLoading(true);
    let query = `current=${current}&pageSize=${pageSize}`;
    if (filter) {
      query += `&${filter}`;
    }
    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    const res = await callFetchListUser(query);
    if (res && res.data) {
      setListUser(res.data.result);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
  };

  const columns = [
    {
      title: "id",
      dataIndex: "_id",
      render: (text, record, index) => {
        return (
          <a
            href="#"
            onClick={() => {
              setDataViewDetail(record);
              setOpenViewDetail(true);
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Tên hiển thị",
      dataIndex: "fullName",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      sorter: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      sorter: true,
    },
    {
      title: "Action",
      render: (text, record, index) => {
        return (
          <>
            <DeleteOutlined
              style={{ color: "red", cursor: "pointer", fontSize: "17px" }}
            />
          </>
        );
      },
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }

    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }

    if (sorter && sorter.field) {
      const q =
        sorter.order === "ascend"
          ? `sort=${sorter.field}`
          : `sort=-${sorter.field}`;
      setSortQuery(q);
    }
  };

  const handleSearch = (query) => {
    setFilter(query);
  };

  const ButtonHandle = () => {
    return (
      <Row gutter={24} justify="space-between" style={{ marginBottom: "5px" }}>
        <Col span={12} style={{ textAlign: "left" }}></Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Button type="primary" style={{ margin: "0 10px 0px 0" }}>
            <ExportOutlined />
            Export
          </Button>
          <Button type="primary" style={{ margin: "0 10px 0px 0" }} onClick={() => setOpenModalImport(true)}>
            <CloudUploadOutlined />
            Import
          </Button>
          <Button
            type="primary"
            style={{ margin: "0 10px 0px 0" }}
            onClick={() => setOpenModalCreate(true)}
          >
            <PlusOutlined />
            Thêm mới
          </Button>
          <Button
            type="ghost"
            onClick={() => {
              setFilter("");
              setSortQuery("");
            }}
          >
            <ReloadOutlined />
          </Button>
        </Col>
      </Row>
    );
  };

  return (
    <>
      <InputSearch handleSearch={handleSearch} />
      <ButtonHandle />
      <Table
        columns={columns}
        dataSource={listUser}
        onChange={onChange}
        rowKey="_id"
        loading={isLoading}
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]}-{range[1]} trên {total} rows{" "}
              </div>
            );
          },
        }}
      />

      <UserModalCreate
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        fetchUser={fetchUser}
      />

      <UserViewDetail
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
        fetchUser={fetchUser}
      />

      <UserImport
        openModalImport={openModalImport}
        setOpenModalImport={setOpenModalImport}
        fetchUser={fetchUser}
      />
    </>
  );
};
export default UserTable;
