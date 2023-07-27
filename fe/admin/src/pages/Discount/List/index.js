import { Table, Button, Popconfirm, Switch, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { successDialog, deleteSuccess, exist, errorInfo } from "../../../components/Dialog/Dialog";
import { useDispatch } from "react-redux";
import discountAPI from "../../../services/discountAPI";
import { setDataDiscount } from "../../../slices/dataAdd";
import DetailDiscount from "../Detail";

function DiscountList() {
    const [listDiscount, setListDiscount] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const getAllDiscount = async () => {
        try {
            setLoading(true);
            const response = await discountAPI.getAll();
            setListDiscount(response.data.data);
            setLoading(false);
        } catch (err) {
            throw new Error(err);
        }
    };

    useEffect(() => {
        getAllDiscount();
    }, []);
    // XỬ LÝ DELETE
    const handleDelete = async (record) => {
        const data = await discountAPI.delete(record.id);
        if (data.data.message === "Couldn't Delete") {
            Swal.fire({
                icon: "error",
                title: "Khuyến mãi đang hoạt động !",
                customClass: {
                    title: "fs-5 text-error",
                },
            });
        } else if (data.data.message === "Delete Successfully") {
            deleteSuccess();
            getAllDiscount();
        } else if (data.data.message === "Exits") {
            errorInfo("Khuyến mãi đang được áp dụng cho khóa học ");
        }
    };
    // THÊM
    const handleCreate = async (obj) => {
        const data = await discountAPI.create(obj);
        if (data.data.message === "Discount Exist") {
            exist();
        } else if (data.data.message === "Create Successfully") {
            successDialog();
            getAllDiscount();
        }
    };
    // SỬA
    const handleUpdate = async (obj) => {
        const data = await discountAPI.update(obj);
        if (data.data.message === "Update Successfully") {
            successDialog();
            getAllDiscount();
        }
        setOpen(false);
    };
    const handleDataCreate = () => {
        setOpen(true);
        dispatch(setDataDiscount([]));
    };
    const handleAddStore = (record) => {
        dispatch(setDataDiscount(record));
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
            title: "Tên khuyến mãi",
            dataIndex: "nameDiscount",
            render: (nameDiscount) => (
                <Tooltip title={nameDiscount}>
                    <div style={{ width: "150px" }}>{nameDiscount}</div>
                </Tooltip>
            ),
        },
        {
            title: "Phần trăm",
            dataIndex: "percent",
            render: (percent) => (
                <div className="text-center" style={{ width: "70px" }}>
                    {percent} %
                </div>
            ),
        },
        {
            title: "Code",
            dataIndex: "code",
        },
        {
            title: "Ngày bắt đầu",
            dataIndex: "startDate",
            render: (startDate) => <div style={{ width: "150px" }}>{startDate}</div>,
        },
        {
            title: "Ngày kết thúc",
            dataIndex: "endDate",
            render: (endDate) => <div style={{ width: "150px" }}>{endDate}</div>,
        },
        {
            title: "Mô tả",
            dataIndex: "description",
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
                        <p className="fs-4 fw-bold">DANH SÁCH KHUYẾN MÃI</p>
                        <Button className="bg-light" onClick={handleDataCreate}>
                            <FontAwesomeIcon icon={faPlus} className="text-dark" />
                        </Button>

                        <DetailDiscount
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
                                    dataSource={listDiscount}
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

export default DiscountList;
