import { Table, Button, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faPlus, faFileExport } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { successDialog, deleteSuccess, exist } from "../../../components/Dialog/Dialog";
import { useDispatch } from "react-redux";
import pointAPI from "../../../services/pointAPI";
import DetailPoint from "../Detail";
import { setDataPoint } from "../../../slices/dataAdd";
import "./style.scss";
import classesAPI from "../../../services/classesAPI";
import handleOnExport from "../../../utils/exportXLSX";
function PointListClass() {
    const [loading, setLoading] = useState(false);
    const { idClasses } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [allPointClass, setAllPointClass] = useState([]);
    console.log("allPointClass: ", allPointClass);
    const [listPointClass, setListPointClass] = useState([]);
    const [infoClasses, setInfoClasses] = useState();
    const [open, setOpen] = useState(false);

    //Gọi API
    const getAllPointClass = async () => {
        try {
            setLoading(true);
            const response = await pointAPI.getByPointClass({ datafind: idClasses });
            setAllPointClass(response.data.data);
            setLoading(false);
        } catch (err) {
            throw new Error(err);
        }
    };
    const getInfoClasses = async () => {
        try {
            setLoading(true);
            const response = await classesAPI.findInfo({ datafind: idClasses });
            setInfoClasses(response.data.data);
            setLoading(false);
        } catch (err) {
            throw new Error(err);
        }
    };

    const getListPointClass = async () => {
        try {
            setLoading(true);
            const response = await pointAPI.getListPointClass({ datafind: idClasses });
            setListPointClass(response.data.data);
            setLoading(false);
        } catch (err) {
            throw new Error(err);
        }
    };
    //  XỬ LÝ DELETE
    const handleDelete = async (record) => {
        const data = await pointAPI.delete(record.id);
        if (data.data.message == "Delete Successfully") {
            deleteSuccess();
            getAllPointClass();
        }
    };
    // THÊM
    const handleCreate = async (obj) => {
        const data = await pointAPI.create(obj);
        if (data.data.message === "Point Exist") {
            exist();
        } else if (data.data.message === "Create Successfully") {
            successDialog();
            getAllPointClass();
        }
    };
    // SỬA
    const handleUpdate = async (obj) => {
        const data = await pointAPI.update(obj);
        if (data.data.message === "Update Successfully") {
            successDialog();
            getAllPointClass();
        }
    };
    const handleAddStore = (record) => {
        dispatch(setDataPoint(record));
        setOpen(true);
    };
    const handleDataCreate = () => {
        setOpen(true);
        dispatch(setDataPoint([]));
    };
    const handleExportFile = () => {
        let obj = {
            list: listPointClass,
            name:
                "DANH SÁCH ĐIỂM" +
                infoClasses.nameClasses +
                " " +
                infoClasses.startDate +
                " " +
                infoClasses.endDate,
        };
        handleOnExport(obj);
    };
    useEffect(() => {
        getAllPointClass();
        getListPointClass();
        getInfoClasses();
    }, [idClasses]);
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            align: "center",
        },
        {
            title: "Học viên",
            dataIndex: "user",
            render: (user) => <div>{user.firstName + " " + user.lastName}</div>,
        },

        {
            title: "Điểm số",
            dataIndex: "numberPoint",
        },
        {
            title: "Đánh giá",
            dataIndex: "result",
            align: "center",
            render: (result) => (
                <div className={result === "1" ? "good" : "bad"}>
                    {result === "1" ? "Đạt" : "Không đạt"}
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
                        <p className="fs-4 fw-bold">DANH SÁCH ĐIỂM "{infoClasses?.nameClasses}"</p>

                        <div>
                            <div className="d-flex ">
                                <Button
                                    className="bg-light "
                                    onClick={() => {
                                        navigate(`/list-point`);
                                    }}
                                >
                                    Quay lại
                                </Button>
                                <Button className="bg-light mx-2" onClick={handleExportFile}>
                                    <FontAwesomeIcon icon={faFileExport} className="text-dark" />
                                </Button>
                                <Button className="bg-light mx-2" onClick={handleDataCreate}>
                                    <FontAwesomeIcon icon={faPlus} className="text-dark" />
                                </Button>
                                <DetailPoint
                                    handleCreate={handleCreate}
                                    handleUpdate={handleUpdate}
                                    open={open}
                                    setOpen={setOpen}
                                />
                            </div>
                            <DetailPoint handleCreate={handleCreate} handleUpdate={handleUpdate} />
                            <hr className="w-100 " />
                            <div className="row">
                                <div className="col-md-12">
                                    <Table
                                        columns={columns}
                                        dataSource={allPointClass}
                                        bordered={true}
                                        loading={loading}
                                        scroll={{ x: true }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default PointListClass;
