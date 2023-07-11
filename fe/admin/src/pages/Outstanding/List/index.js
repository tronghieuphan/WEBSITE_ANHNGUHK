import { Table, Button, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { successDialog, deleteSuccess, exist } from "../../../components/Dialog/Dialog";
import { useDispatch } from "react-redux";
import outstandingAPI from "../../../services/outstandingAPI";
import { setDataOutstanding } from "../../../slices/dataAdd";
import DetailOutstanding from "../Detail";

function OutstandingList() {
    const [listOutstanding, setListOutstanding] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const getAllOutstanding = async () => {
        try {
            setLoading(true);
            const response = await outstandingAPI.getAll();
            setListOutstanding(response.data.data);
            setLoading(false);
        } catch (err) {
            throw new Error(err);
        }
    };

    useEffect(() => {
        getAllOutstanding();
    }, []);

    // XỬ LÝ DELETE
    const handleDelete = async (record) => {
        console.log(record);
        const data = await outstandingAPI.delete(record.id);
        if (data.data.message == "Delete Successfully") {
            deleteSuccess();
            getAllOutstanding();
        }
    };
    // THÊM
    const handleCreate = async (obj) => {
        const data = await outstandingAPI.create(obj);
        if (data.data.message === "Outstanding Exist") {
            exist();
        } else if (data.data.message === "Create Successfully") {
            successDialog();
            getAllOutstanding();
        }
    };
    // SỬA
    const handleUpdate = async (obj) => {
        const data = await outstandingAPI.update(obj);
        if (data.data.message === "Update Successfully") {
            successDialog();
            getAllOutstanding();
        }
        setOpen(false);
    };
    const handleDataCreate = () => {
        setOpen(true);
        dispatch(setDataOutstanding([]));
    };
    const handleAddStore = (record) => {
        dispatch(setDataOutstanding(record));
        setOpen(true);
    };
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            align: "center",
        },

        {
            title: "Học viên",
            dataIndex: "user",
            render: (user) => <div> {user?.firstName + " " + user?.lastName}</div>,
        },
        {
            title: "Loại khóa học",
            dataIndex: "type",
            render: (type) => <div> {type.nameType}</div>,
        },
        {
            title: "Điểm",
            dataIndex: "point",
        },
        {
            title: "Hình ảnh",
            dataIndex: "image",
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
                        <p className="fs-4 fw-bold">DANH SÁCH HỌC VIÊN NỔI BẬT</p>
                        <Button className="bg-light" onClick={handleDataCreate}>
                            <FontAwesomeIcon icon={faPlus} className="text-dark" />
                        </Button>

                        <DetailOutstanding
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
                                    dataSource={listOutstanding}
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

export default OutstandingList;
