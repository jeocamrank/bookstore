import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Popconfirm,
  Row,
  Table,
  message,
  notification,
} from "antd";
import {
  CloudUploadOutlined,
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import InputSearch from "./InputSearch.jsx";
import { render } from "react-dom";
import * as XLSX from "xlsx";
import { callDeleteBook, callFetchListBook } from "../../../services/api.js";
import BookViewDetail from "./BookViewDetail.jsx";
import BookModalCreate from "./BookModalCreate.jsx";
import BookModalUpdate from "./BookModalUpdate.jsx";

const BookTable = () => {
  const [listBook, setListBook] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=-updatedAt");
  const [dataViewDetail, setDataViewDetail] = useState("");
  const [openViewDetail, setOpenViewDetail] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState("");

  useEffect(() => {
    fetchBook();
  }, [current, pageSize, filter, sortQuery]);

  const fetchBook = async () => {
    setIsLoading(true);
    let query = `current=${current}&pageSize=${pageSize}`;
    if (filter) {
      query += `&${filter}`;
    }
    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    const res = await callFetchListBook(query);
    if (res && res.data) {
      setListBook(res.data.result);
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
      title: "Tên sách",
      dataIndex: "mainText",
      sorter: true,
    },
    {
      title: "Thể loại",
      dataIndex: "category",
      sorter: true,
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      sorter: true,
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      sorter: true,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      sorter: true,
    },
    {
      title: "Action",
      render: (text, record, index) => {
        return (
          <div style={{ width: "100px" }}>
            <Popconfirm
              placement="leftTop"
              title={"Xác nhận xóa user"}
              description={`Bạn có chắc muốn xóa book : ${record.mainText}?`}
              onConfirm={() => handleDeleteBook(record._id)}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <DeleteOutlined
                style={{ color: "red", cursor: "pointer", fontSize: "17px" }}
              />
            </Popconfirm>
            <EditOutlined
              style={{
                color: "Orange",
                marginLeft: "15px",
                cursor: "pointer",
                fontSize: "17px",
              }}
              onClick={() => {
                setOpenModalUpdate(true);
                setDataUpdate(record);
              }}
            />
          </div>
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
          <Button
            type="primary"
            style={{ margin: "0 10px 0px 0" }}
            onClick={() => handleExportData()}
          >
            <ExportOutlined />
            Export
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
              setCurrent(1);
            }}
          >
            <ReloadOutlined />
          </Button>
        </Col>
      </Row>
    );
  };

  const handleExportData = () => {
    console.log(listBook);
    if (listBook.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(listBook);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "ExportUser.csv");
    }
  };

  const handleDeleteBook = async (userId) => {
    const res = await callDeleteBook(userId);
    if (res && res.data) {
      message.success("Xóa user thành công");
      fetchBook();
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
      });
    }
  };

  return (
    <>
      <InputSearch handleSearch={handleSearch} />
      <ButtonHandle />
      <Table
        columns={columns}
        dataSource={listBook}
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

      <BookViewDetail
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
        fetchBook={fetchBook}
      />

      <BookModalCreate
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        fetchBook={fetchBook}
      />

      <BookModalUpdate
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        fetchBook={fetchBook}
      />
    </>
  );
};
export default BookTable;
