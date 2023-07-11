import { Table, Button } from "antd";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import consultAPI from "../../../services/consultAPI";
import { successInfo } from "../../../components/Dialog/Dialog";

function ConsultList() {
    const [listConsult, setListConsult] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllConsult = async () => {
        try {
            setLoading(true);
            const response = await consultAPI.getAll();
            setListConsult(response.data.data);
            setLoading(false);
        } catch (err) {
            throw new Error(err);
        }
    };
    const acceptConsult = async (obj) => {
        const data = await consultAPI.accept(obj);
        if (data.data.message === "Update Successfully") {
            successInfo("Xử lý thành công");
            getAllConsult();
        }
    };
    const handleAcceptConsult = (active, record) => {
        console.log(record);
        acceptConsult(record);
    };
    useEffect(() => {
        getAllConsult();
    }, []);
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            align: "center",
        },
        {
            title: "Họ lót",
            dataIndex: "user",
            render: (user) => <div>{user?.firstName}</div>,
        },
        {
            title: "Tên ",
            dataIndex: "user",
            render: (user) => <div>{user?.lastName}</div>,
        },
        {
            title: "Mục tiêu",
            dataIndex: "target",
        },
        {
            title: "Thời gian mong muốn",
            dataIndex: "timeComplete",
        },
        {
            title: "Giờ hẹn",
            dataIndex: "timeArrive",
        },
        {
            title: "Ngày hẹn",
            dataIndex: "dateArrive",
        },
        {
            title: "Lớp học đăng ký ",
            dataIndex: "classRoom",
            render: (classesRoom) => <div>{classesRoom}</div>,
        },
        {
            title: "Trạng thái",
            dataIndex: "active",
            align: "center",
            fixed: "right",

            render: (active, record) => (
                <div
                    style={{
                        width: "120px",
                    }}
                    className="mx-auto"
                >
                    {active ? (
                        <Button className="bg-light" disabled>
                            Đã xác nhận
                        </Button>
                    ) : (
                        <Button
                            type="primary"
                            onClick={(active) => handleAcceptConsult(active, record)}
                        >
                            Chờ xử lý
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.8 } }}
            >
                <div className="text-muted">
                    <div className="">
                        <p className="fs-4 fw-bold">DANH SÁCH ĐĂNG KÝ TƯ VẤN</p>
                        <hr className="w-100 " />
                        <div className="row">
                            <div className="col-md-12">
                                <Table
                                    columns={columns}
                                    dataSource={listConsult}
                                    bordered={true}
                                    loading={loading}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default ConsultList;
