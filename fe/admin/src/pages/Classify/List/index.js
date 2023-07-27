import { Table, Button, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { successDialog, deleteSuccess, exist, errorInfo } from "../../../components/Dialog/Dialog";
import { useDispatch } from "react-redux";
import classifyAPI from "../../../services/classifyAPI";
import { setDataClassify } from "../../../slices/dataAdd";
import DetailClassify from "../Detail";

function ClassifyList() {
    const [listClassify, setListClassify] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const getAllClassify = async () => {
        try {
            setLoading(true);
            const response = await classifyAPI.getAll();
            setListClassify(response.data.data);
            setLoading(false);
        } catch (err) {
            throw new Error(err);
        }
    };

    useEffect(() => {
        getAllClassify();
    }, []);

    // XỬ LÝ DELETE
    const handleDelete = async (record) => {
        const data = await classifyAPI.delete(record.id);
        if (data.data.message == "Delete Successfully") {
            deleteSuccess();
            getAllClassify();
        } else if (data.data.message == "Exits") {
            errorInfo("Đang có khóa học thuộc đối tượng này ");
        }
    };
    // THÊM
    const handleCreate = async (obj) => {
        const data = await classifyAPI.create(obj);
        if (data.data.message === "Classify Exist") {
            exist();
        } else if (data.data.message === "Create Successfully") {
            successDialog();
            getAllClassify();
        }
    };
    // SỬA
    const handleUpdate = async (obj) => {
        const data = await classifyAPI.update(obj);
        if (data.data.message === "Update Successfully") {
            successDialog();
            getAllClassify();
        }
    };
    const handleDataCreate = () => {
        setOpen(true);
        dispatch(setDataClassify([]));
    };
    const handleAddStore = (record) => {
        dispatch(setDataClassify(record));
        setOpen(true);
    };
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            align: "center",
        },
        {
            title: "Tên đối tượng",
            dataIndex: "nameClassify",
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
                        <p className="fs-4 fw-bold">DANH SÁCH ĐỐI TƯỢNG</p>
                        <Button className="bg-light" onClick={handleDataCreate}>
                            <FontAwesomeIcon icon={faPlus} className="text-dark" />
                        </Button>

                        <DetailClassify
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
                                    dataSource={listClassify}
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

export default ClassifyList;
