import { Table, Button, Popconfirm, Switch } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faPlus, faListUl } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { successDialog, deleteSuccess, exist } from "../../../components/Dialog/Dialog";
import { useDispatch } from "react-redux";
import classesAPI from "../../../services/classesAPI";
import { setDataClasses } from "../../../slices/dataAdd";
import DetailClasses from "../Detail";

function ClassesList() {
    const [listClasses, setListClasses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getAllClasses = async () => {
        try {
            setLoading(true);
            const response = await classesAPI.getAll();
            setListClasses(response.data.data);
            setLoading(false);
        } catch (err) {
            throw new Error(err);
        }
    };

    useEffect(() => {
        getAllClasses();
    }, []);

    // XỬ LÝ DELETE
    const handleDelete = async (record) => {
        const data = await classesAPI.delete(record.id);
        if (data.data.message === "Delete Successfully") {
            deleteSuccess();
            getAllClasses();
        }
    };

    // THÊM
    const handleCreate = async (obj) => {
        setLoading(true);
        const data = await classesAPI.create(obj);
        if (data.data.message === "Classes Exist") {
            exist();
        } else if (data.data.message === "Create Successfully") {
            successDialog();
            getAllClasses();
        }
        setLoading(false);
    };

    // SỬA
    const handleUpdate = async (obj) => {
        const data = await classesAPI.update(obj);
        if (data.data.message === "Update Successfully") {
            successDialog();
            getAllClasses();
        }
        setOpen(false);
    };
    const handleDataCreate = () => {
        setOpen(true);
        dispatch(setDataClasses([]));
    };
    const handleAddStore = (record) => {
        dispatch(setDataClasses(record));
        setOpen(true);
    };
    const handleUpdateActive = async (checked, record) => {
        let obj = {
            id: record.id,
            active: checked,
        };
        await handleUpdate(obj);
    };
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            align: "center",
            fixed: "left",
        },

        {
            title: "Tên lớp học",
            dataIndex: "nameClasses",
            fixed: "left",
            render: (nameClasses) => (
                <div
                    style={{
                        width: "150px",
                    }}
                >
                    {nameClasses}
                </div>
            ),
        },
        {
            title: "Ngày bắt đầu",
            dataIndex: "startDate",
            render: (startDate) => (
                <div
                    style={{
                        width: "100px",
                    }}
                >
                    {startDate}
                </div>
            ),
        },
        {
            title: "Ngày kết thúc",
            dataIndex: "endDate",
            render: (endDate) => (
                <div
                    style={{
                        width: "100px",
                    }}
                >
                    {endDate}
                </div>
            ),
        },

        {
            title: "Thứ",
            dataIndex: "weekdayId",
            render: (weekdayId) => (
                <div
                    style={{
                        width: "100px",
                    }}
                >
                    {weekdayId + ","}
                </div>
            ),
        },
        {
            title: "Giờ bắt đầu",
            dataIndex: "startHour",
            render: (startHour) => (
                <div
                    style={{
                        width: "100px",
                    }}
                >
                    {startHour}
                </div>
            ),
        },
        {
            title: "Giờ kết thúc",
            dataIndex: "endHour",
            render: (endHour) => <div style={{ width: "80px" }}>{endHour}</div>,
        },
        {
            title: "Giảng viên",
            dataIndex: "nameLecture",
            render: (nameLecture) => <div style={{ width: "150px" }}>{nameLecture}</div>,
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            align: "center",
            render: (quantity) => <div style={{ width: "50px" }}>{quantity}</div>,
        },
        {
            title: "Đã đăng ký",
            dataIndex: "quantityRes",
            align: "center",
            render: (quantityRes) => <div style={{ width: "50px" }}>{quantityRes}</div>,
        },
        {
            title: "Trạng thái ",
            dataIndex: "active",
            fixed: "right",
            render: (active, record) => (
                <div>
                    <Switch
                        defaultChecked={active}
                        onClick={(checked) => handleUpdateActive(checked, record)}
                    />
                </div>
            ),
        },
        {
            title: "Xóa",
            dataIndex: "",
            align: "center",
            fixed: "right",
            render: (_, record) => (
                <Popconfirm title="Bạn có muốn xóa?" onConfirm={() => handleDelete(record)}>
                    <Button className="bg-light">
                        <FontAwesomeIcon icon={faTrashAlt} className="text-dark" />
                    </Button>
                </Popconfirm>
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
        {
            title: "DSHV",
            dataIndex: "",
            align: "center",
            fixed: "right",
            render: (record) => (
                <Button
                    className="bg-light"
                    onClick={() => {
                        navigate(`/liststudentclass/${record.id}`);
                    }}
                >
                    <FontAwesomeIcon icon={faListUl} className="text-dark" />
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
                        <p className="fs-4 fw-bold">DANH SÁCH LỚP HỌC</p>
                        <Button className="bg-light" onClick={handleDataCreate}>
                            <FontAwesomeIcon icon={faPlus} className="text-dark" />
                        </Button>

                        <DetailClasses
                            handleCreate={handleCreate}
                            handleUpdate={handleUpdate}
                            open={open}
                            setOpen={setOpen}
                        />
                        <hr className="w-100 " />
                        <div className="row">
                            <div className="col-md-12">
                                <Table
                                    columns={columns}
                                    dataSource={listClasses}
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

export default ClassesList;
