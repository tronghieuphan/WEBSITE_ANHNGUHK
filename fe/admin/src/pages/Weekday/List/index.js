import { Table, Button, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { successDialog, deleteSuccess, exist } from "../../../components/Dialog/Dialog";
import weekdayAPI from "../../../services/weekdayAPI";
import DetailWeekday from "../Detail";
import { useDispatch } from "react-redux";
import { setDataWeekday } from "../../../slices/dataAdd";

function WeekdayList() {
    const [listWeekday, setListWeekday] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const getAllWeekday = async () => {
        try {
            setLoading(true);
            const response = await weekdayAPI.getAll();
            setListWeekday(response.data.data);
            setLoading(false);
        } catch (err) {
            throw new Error(err);
        }
    };

    useEffect(() => {
        getAllWeekday();
    }, []);

    // XỬ LÝ DELETE
    const handleDelete = async (record) => {
        console.log(record);
        const data = await weekdayAPI.delete(record.id);
        if (data.data.message === "Delete Successfully") {
            deleteSuccess();
            getAllWeekday();
        }
    };
    // THÊM
    const handleCreate = async (obj) => {
        const data = await weekdayAPI.create(obj);
        if (data.data.message === "Weekday Exist") {
            exist();
        } else if (data.data.message === "Create Successfully") {
            successDialog();
            getAllWeekday();
        }
    };
    // SỬA
    const handleUpdate = async (obj) => {
        const data = await weekdayAPI.update(obj);
        if (data.data.message === "Update Successfully") {
            successDialog();
            getAllWeekday();
        }
        setOpen(false);
    };
    const handleDataCreate = () => {
        setOpen(true);
        dispatch(setDataWeekday([]));
    };
    const handleAddStore = (record) => {
        dispatch(setDataWeekday(record));
        setOpen(true);
    };
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            align: "center",
        },
        {
            title: "Tên thứ",
            dataIndex: "nameWeekday",
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
                        <p className="fs-4 fw-bold">DANH SÁCH THỨ TRONG TUẦN</p>
                        <Button className="bg-light" onClick={handleDataCreate}>
                            <FontAwesomeIcon icon={faPlus} className="text-dark" />
                        </Button>
                        <DetailWeekday
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
                                    dataSource={listWeekday}
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

export default WeekdayList;
