import { Table, Button, Tooltip, Select, Segmented, DatePicker } from "antd";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import consultAPI from "../../../services/consultAPI";
import { successDialog, successInfo } from "../../../components/Dialog/Dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHand, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setDataConsult } from "../../../slices/dataAdd";
import DetailConsult from "../Detail";

function ConsultList() {
    const [listConsult, setListConsult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [optineDate, setOptionDate] = useState(false);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const getAllConsult = async () => {
        try {
            setLoading(true);
            const response = await consultAPI.getAll({ choose: 1 });
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
    const acceptResConsult = async (obj) => {
        const data = await consultAPI.acceptRes(obj);
        if (data.data.message === "Update Successfully") {
            successInfo("Xử lý thành công");
            getAllConsult();
        }
    };
    const handleAcceptConsult = (active, record) => {
        acceptConsult(record);
    };
    const handleAcceptRes = (active, record) => {
        acceptResConsult(record);
    };
    const handleAlertConsult = async () => {
        let a = await consultAPI.alertConsult();
        if (a.data.message === "Handle Successfully") {
            successInfo("Xử lý thành công");
        }
    };

    const handleChooseDetail = async (e) => {
        let a = new Date(e.$d);
        let b = await consultAPI.getAll({
            choose: 4,
            datechoose: a,
        });
        setListConsult(b.data.data);
    };
    const handleChooseSegment = async (obj) => {
        let a = await consultAPI.getAll(obj);
        setListConsult(a.data.data);
    };
    const handChangeOptionDate = async (e) => {
        if (e === 4) {
            setOptionDate(true);
        } else {
            setOptionDate(false);
            handleChooseSegment({ choose: e });
        }
    };
    const handleAddStore = (record) => {
        dispatch(setDataConsult(record));
        setOpen(true);
    };
    const handleUpdate = async (obj) => {
        const data = await consultAPI.update(obj);
        if (data.data.message === "Update Successfully") {
            successDialog();
            getAllConsult();
        }
        setOpen(false);
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
            render: (user) => <div style={{ width: "170px" }}>{user?.firstName}</div>,
        },
        {
            title: "Tên ",
            dataIndex: "user",
            render: (user) => <div>{user?.lastName}</div>,
        },
        {
            title: "Email",
            dataIndex: "user",
            render: (user) => <div>{user?.email}</div>,
        },
        {
            title: "Số điện thoại",
            dataIndex: "user",
            render: (user) => <div>{user?.phone}</div>,
        },
        {
            title: "Mục tiêu",
            dataIndex: "target",
        },
        {
            title: "Thời gian mong muốn",
            dataIndex: "timeComplete",
            render: (timeComplete) => <div style={{ width: "150px" }}>{timeComplete}</div>,
        },
        {
            title: "Giờ hẹn",
            dataIndex: "timeArrive",
            render: (timeArrive) => <div style={{ width: "150px" }}>{timeArrive}</div>,
        },
        {
            title: "Ngày hẹn",
            dataIndex: "dateArrive",
            render: (dateArrive) => <div style={{ width: "200px" }}>{dateArrive}</div>,
        },
        {
            title: "Lớp học đăng ký ",
            dataIndex: "classRoom",
            render: (classesRoom) => <div style={{ width: "300px" }}>{classesRoom}</div>,
        },
        {
            title: "Xử lý tư vấn",
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
                            Đã tư vấn
                        </Button>
                    ) : (
                        <Button
                            type="primary"
                            onClick={(active) => handleAcceptConsult(active, record)}
                        >
                            Chờ tư vấn
                        </Button>
                    )}
                </div>
            ),
        },
        {
            title: "Trạng thái đăng ký",
            dataIndex: "checkRes",
            align: "center",
            fixed: "right",

            render: (checkRes, record) => (
                <div
                    style={{
                        width: "120px",
                    }}
                    className="mx-auto"
                >
                    {checkRes ? (
                        <Button className="bg-light" disabled>
                            Đã xác nhận
                        </Button>
                    ) : (
                        <Button
                            type="primary"
                            onClick={(active) => handleAcceptRes(active, record)}
                        >
                            Chưa xác nhận
                        </Button>
                    )}
                </div>
            ),
        },
        {
            title: "Xem",
            dataIndex: "",
            align: "center",
            fixed: "right",
            render: (record) => (
                <Button className="bg-light" onClick={() => handleAddStore(record)}>
                    <FontAwesomeIcon icon={faEdit} className="text-dark" />
                </Button>
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
                        <div className="row my-2">
                            <div className="col-md-4">
                                <Tooltip placement="top" title="Xử lý các đăng ký tư vấn">
                                    <Button className="bg-light " onClick={handleAlertConsult}>
                                        <FontAwesomeIcon icon={faHand} className="text-dark" />
                                    </Button>
                                </Tooltip>
                            </div>
                            <DetailConsult
                                open={open}
                                setOpen={setOpen}
                                handleUpdate={handleUpdate}
                            />
                            <div className="col-md-8 text-end">
                                <Segmented
                                    options={[
                                        { label: "Hôm nay", value: 1 },
                                        { label: "Ngày mai", value: 2 },
                                        { label: "Tất cả", value: 3 },
                                        { label: "Chọn theo ngày", value: 4 },
                                    ]}
                                    onChange={handChangeOptionDate}
                                />
                                {optineDate ? (
                                    <DatePicker onChange={handleChooseDetail} className="mx-2" />
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Table
                                    columns={columns}
                                    dataSource={listConsult}
                                    bordered={true}
                                    loading={loading}
                                    scroll={{ x: true }}
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
