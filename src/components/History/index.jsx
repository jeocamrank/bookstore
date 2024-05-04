import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import ReactJson from 'react-json-view';
import { callFethListHistory } from "../../services/api";
import { useSelector } from "react-redux";

const HistoryForm = () => {
    const [data, setData] = useState([]); // Dữ liệu lịch sử giao dịch
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((state) => state.account.user);


    useEffect(() => {
        fetchListBook();
    }, []);

    const fetchListBook = async () => {
        setIsLoading(true);
        const res = await callFethListHistory();
        if (res && res.data) {
            setData(res);
          }
        console.log(res);
        setIsLoading(false);
    }

    const columns = [
        {
            title: "Thời gian",
            dataIndex: "updatedAt",
            key: "updatedAt",
            sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
        },
        {
            title: "Tổng số tiền",
            dataIndex: "totalPrice",
            key: "totalPrice",
        },
        {
            title: "Trạng thái",
            key: "status",
            render: () => <Tag color="green">Thành Công</Tag>
        },
        {
            title: "Chi tiết",
            key: "detail",
            render: (text, record) => (
                <ReactJson src={record.detail} collapsed={true} />
            ),
        },
    ];

    return (
        <>
        <Table 
            columns={columns} 
            dataSource={data} 
            loading={isLoading}
            rowKey="_id"
            style={{ maxWidth: 1260, marginLeft: 'auto', marginRight: 'auto', marginTop: 30 }}
        />
        </>
    );
};

export default HistoryForm;