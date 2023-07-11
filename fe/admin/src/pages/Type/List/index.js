import { Table, Button, Popconfirm, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { successDialog, deleteSuccess, exist } from "../../../components/Dialog/Dialog";
import { useDispatch } from "react-redux";
import { setDataType } from "../../../slices/dataAdd";
import DetailType from "../Detail";
import typeAPI from "../../../services/typeAPI ";

function TypeList() {
    const [listType, setListType] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const getAllType = async () => {
        try {
            setLoading(true);
            const response = await typeAPI.getAll();
            setListType(response.data.data);
            setLoading(false);
        } catch (err) {
            throw new Error(err);
        }
    };

    useEffect(() => {
        getAllType();
    }, []);

    // XỬ LÝ DELETE
    const handleDelete = async (record) => {
        console.log(record);
        const data = await typeAPI.delete(record.id);
        if (data.data.message == "Delete Successfully") {
            deleteSuccess();
            getAllType();
        }
    };
    // THÊM
    const handleCreate = async (obj) => {
        const data = await typeAPI.create(obj);
        if (data.data.message === "Type Exist") {
            exist();
        } else if (data.data.message === "Create Successfully") {
            successDialog();
            getAllType();
        }
    };
    // SỬA
    const handleUpdate = async (obj) => {
        const data = await typeAPI.update(obj);
        if (data.data.message === "Update Successfully") {
            successDialog();
            getAllType();
        }
        setOpen(false);
    };
    const handleDataCreate = () => {
        setOpen(true);
        dispatch(setDataType([]));
    };
    const handleAddStore = (record) => {
        dispatch(setDataType(record));
        setOpen(true);
    };
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            align: "center",
        },
        {
            title: "Tên loại khóa học",
            dataIndex: "nameType",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            render: (description) => (
                <Tooltip placement="topLeft" title={description}>
                    <div className="des" style={{ width: "300px" }}>
                        {description}
                    </div>
                </Tooltip>
            ),
        },
        {
            title: "Hình ảnh",
            dataIndex: "image",
            align: "center",
            fixed: "right",
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
                        <p className="fs-4 fw-bold">DANH SÁCH LOẠI KHÓA HỌC</p>
                        <Button className="bg-light" onClick={handleDataCreate}>
                            <FontAwesomeIcon icon={faPlus} className="text-dark" />
                        </Button>

                        <DetailType
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
                                    dataSource={listType}
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

export default TypeList;
