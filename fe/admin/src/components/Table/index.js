import { useState, useEffect } from "react";
import { Table, Button, Popconfirm, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import userAPI from "../../services/userAPI";
import { successDialog } from "../Dialog/Dialog";

function TableUser(props) {
    const { listUser, columns, type, handleAddStore, handleDelete, getAllTypeUser, loading } =
        props;

    const [col, setCol] = useState([]);

    const handleUpdateType = async (active, record) => {
        let data = await userAPI.updateActive(record);
        if ((data.data.message = "Update Successfully")) {
            successDialog();
            getAllTypeUser({ typeUser: 0 });
        }
    };
    const setColUser = (obj) => {
        if (obj === 0) {
            const column = [
                ...columns,
                {
                    title: "Hình ảnh",
                    dataIndex: "image",
                    align: "center",
                    key: "image",
                    render: (image) => (
                        <div>
                            <img src={image} className="d-block mx-auto" width={70} height={100} />
                        </div>
                    ),
                },
                {
                    title: "Trạng thái",
                    dataIndex: "active",
                    align: "center",
                    key: "active",

                    fixed: "right",

                    render: (active, record) => (
                        <div
                            style={{
                                width: "120px",
                            }}
                            className="mx-auto"
                        >
                            {active ? (
                                <Button className="bg-primary text-light" disabled>
                                    Học viên
                                </Button>
                            ) : (
                                <Popconfirm
                                    title="Bạn có chắc chắn?"
                                    onConfirm={(active) => handleUpdateType(active, record)}
                                >
                                    <Button className="bg-light">Nâng cấp</Button>
                                </Popconfirm>
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
            setCol(column);
        } else if (obj === 1) {
            const column = [
                ...columns,

                {
                    title: "Nơi công tác",
                    dataIndex: "workPlace",
                    align: "center",
                    key: "workPlace",

                    render: (street) => (
                        <div style={{ width: "150px" }} className="des-hidden">
                            {street}
                        </div>
                    ),
                },
                {
                    title: "Trạng thái",
                    dataIndex: "active",
                    align: "center",
                    key: "active",

                    render: (active, record) => (
                        <div
                            style={{
                                width: "120px",
                            }}
                            className="mx-auto"
                        >
                            <Button className="bg-primary text-light" disabled>
                                Học viên
                            </Button>
                        </div>
                    ),
                },
                {
                    title: "Hình ảnh",
                    dataIndex: "image",
                    align: "center",
                    fixed: "right",
                    key: "image",
                    render: (image) => (
                        <div>
                            <img src={image} className="d-block mx-auto" width={70} height={100} />
                        </div>
                    ),
                },
                {
                    title: "Xóa",
                    dataIndex: "",
                    align: "center",
                    fixed: "right",
                    key: "delete",
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
                    key: "view",

                    render: (record) => (
                        <Button className="bg-light" onClick={() => handleAddStore(record)}>
                            <FontAwesomeIcon icon={faEdit} className="text-dark" />
                        </Button>
                    ),
                },
            ];
            setCol(column);
        } else if (obj === 2) {
            const column = [
                ...columns,
                {
                    title: "Bằng cấp",
                    dataIndex: "degree",
                    align: "center",
                    key: "degree",

                    render: (degree) => (
                        <Tooltip placement="topLeft" title={degree}>
                            <div className="des" style={{ width: "300px" }}>
                                {degree}
                            </div>
                        </Tooltip>
                    ),
                },
                {
                    title: "Kinh nghiệm",
                    dataIndex: "experience",
                    align: "center",
                    key: "experience",

                    render: (experience) => (
                        <Tooltip placement="topLeft" title={experience}>
                            <div className="des" style={{ width: "300px" }}>
                                {experience}
                            </div>
                        </Tooltip>
                    ),
                },
                {
                    title: "Chuyên môn",
                    dataIndex: "specialize",
                    key: "specialize",

                    align: "center",
                    render: (description) => (
                        <Tooltip placement="topLeft" title={description}>
                            <div className="des" style={{ width: "300px" }}>
                                <div>{description}</div>
                            </div>
                        </Tooltip>
                    ),
                },
                {
                    title: "Mô tả",
                    dataIndex: "description",
                    align: "center",
                    key: "description",

                    render: (description) => (
                        <Tooltip
                            placement="topLeft"
                            title={<div dangerouslySetInnerHTML={{ __html: description }}></div>}
                        >
                            <div className="des" style={{ width: "300px" }}>
                                <div dangerouslySetInnerHTML={{ __html: description }}></div>
                            </div>
                        </Tooltip>
                    ),
                },
                {
                    title: "Hình ảnh",
                    dataIndex: "image",
                    align: "center",
                    fixed: "right",
                    key: "image",

                    render: (image) => (
                        <div>
                            <img src={image} className="d-block mx-auto" width={70} height={100} />
                        </div>
                    ),
                },
                {
                    title: "Xóa",
                    dataIndex: "",
                    align: "center",
                    fixed: "right",
                    key: "delete",

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
                    key: "view",

                    render: (record) => (
                        <Button className="bg-light" onClick={() => handleAddStore(record)}>
                            <FontAwesomeIcon icon={faEdit} className="text-dark" />
                        </Button>
                    ),
                },
            ];
            setCol(column);
        } else if (obj === 3 || obj === 4) {
            const column = [
                ...columns,
                {
                    title: "Vị trí",
                    dataIndex: "position",
                    align: "center",
                    key: "position",
                },
                {
                    title: "Phòng ban",
                    dataIndex: "department",
                    align: "center",
                    key: "department",
                },
                {
                    title: "Hình ảnh",
                    dataIndex: "image",
                    align: "center",
                    fixed: "right",
                    key: "image",
                    render: (image) => (
                        <div>
                            <img src={image} className="d-block mx-auto" width={70} height={100} />
                        </div>
                    ),
                },
                {
                    title: "Xóa",
                    dataIndex: "",
                    align: "center",
                    fixed: "right",
                    key: "delete",

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
                    key: "view",

                    render: (record) => (
                        <Button className="bg-light" onClick={() => handleAddStore(record)}>
                            <FontAwesomeIcon icon={faEdit} className="text-dark" />
                        </Button>
                    ),
                },
            ];
            setCol(column);
        }
    };
    useEffect(() => {
        setColUser(type.typeUser);
    }, [type]);
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.8 } }}
            >
                <Table
                    columns={col}
                    dataSource={listUser}
                    bordered={true}
                    loading={loading}
                    scroll={{ x: true }}
                />
            </motion.div>
        </>
    );
}
export default TableUser;
