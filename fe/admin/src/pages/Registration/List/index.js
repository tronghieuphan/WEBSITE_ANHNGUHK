import { Table, Button, Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    successDialog,
    exist,
    errorInfo,
    successInfo,
    info,
} from "../../../components/Dialog/Dialog";
import { useDispatch } from "react-redux";
import registrationAPI from "../../../services/registrationAPI";
import { setDataRegistration } from "../../../slices/dataAdd";
import DetailRegistration from "../Detail";
import DetailRegisPrint from "../DetailRes";
import getCookie from "../../../cookie/getCookie";
import handleDatetime from "../../../utils/dateTime";
import { VND } from "../../../utils/formatVND";
function RegistrationList() {
    const [listRegistration, setListRegistration] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);

    const [regisById, setRegisById] = useState();

    const dispatch = useDispatch();
    const getAllRegistration = async () => {
        try {
            setLoading(true);
            const response = await registrationAPI.getAll();
            setListRegistration(response.data.data);
            setLoading(false);
        } catch (err) {
            throw new Error(err);
        }
    };
    const getRegisById = async (obj) => {
        try {
            const response = await registrationAPI.getResBy(obj);
            setRegisById(response.data.data);
        } catch (err) {
            throw new Error(err);
        }
    };

    useEffect(() => {
        getAllRegistration();
    }, []);

    //Gọi API
    // THÊM
    const handleCreate = async (obj) => {
        const data = await registrationAPI.create(obj);
        if (data.data.message === "Resgister Only Class Belong Course") {
            info("Bạn chỉ được đăng ký một lớp học thuộc khóa học này ");
        } else if (data.data.message === "Course Registed") {
            errorInfo("Dữ liệu tồn tại", "Khóa học này đã được đăng ký trước đó !");
        } else if (data.data.message === "Exits") {
            exist();
        } else if (data.data.message === "Create Successfully") {
            successDialog();
            getAllRegistration();
        }
    };
    // SỬA
    const handleUpdate = async (obj) => {
        const data = await registrationAPI.update(obj);
        if (data.data.message === "Update Successfully") {
            successDialog();
            getAllRegistration();
        }
    };
    //XÁC NHẬN THANH TOÁN
    const acceptPayment = async (obj) => {
        const data = await registrationAPI.acceptPayment(obj);
        if (data.data.message === "Accept Successfully") {
            successInfo("Hoàn tất thanh toán");
            getAllRegistration();
        }
    };

    const handleCancel = async (e, obj) => {
        const data = await registrationAPI.cancel(obj);
        if (data.data.message === "Update Successfully") {
            successInfo("Bạn đã hủy đăng ký này !");
        }
        getAllRegistration();
    };

    //XỬ LÝ DỮ LIỆU
    const handleDataCreate = () => {
        setOpen(true);
        dispatch(setDataRegistration([]));
    };

    const handleAddStore = (record) => {
        dispatch(setDataRegistration(record));
        getRegisById(record);
        setOpen1(true);
    };
    const handleAcceptPayment = (active, record) => {
        let data = {
            ...record,
            staffPayment: JSON.parse(getCookie("useradmin"))?.id,
        };
        acceptPayment(data);
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            align: "center",
        },
        {
            title: "Người đăng ký",
            dataIndex: "user",
            render: (user) => (
                <div style={{ width: "200px" }}>{user.firstName + " " + user.lastName}</div>
            ),
        },
        {
            title: "Ngày đăng ký",
            dataIndex: "regisDate",
            render: (regisDate) => (
                <div style={{ width: "250px" }}>{handleDatetime(regisDate)}</div>
            ),
        },
        {
            title: "Ngày thanh toán ",
            dataIndex: "paymentDate",
            render: (paymentDate) => (
                <div style={{ width: "250px" }}>
                    {paymentDate ? handleDatetime(paymentDate) : ""}
                </div>
            ),
        },
        {
            title: "Phương thức thanh toán",
            dataIndex: "method",
            render: (method, record) => (
                <div style={{ width: "150px" }}>{method === 0 ? "Tiền mặt" : "Chuyển khoản"}</div>
            ),
        },
        {
            title: "Tổng tiền ",
            dataIndex: "total",
            render: (total) => <div style={{ width: "150px" }}>{VND.format(total)}</div>,
        },
        {
            title: "Thanh toán",
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
                            onClick={(active) => handleAcceptPayment(active, record)}
                        >
                            Chờ xác nhận
                        </Button>
                    )}
                </div>
            ),
        },
        ,
        {
            title: "Hủy đăng ký",
            dataIndex: "activeCancel",
            align: "center",
            fixed: "right",
            render: (activeCancel, record) => (
                <div
                    style={{
                        width: "120px",
                    }}
                    className="mx-auto"
                >
                    {activeCancel ? (
                        <Button type="dashed" danger>
                            Đã hủy
                        </Button>
                    ) : (
                        <Popconfirm
                            title="Bạn có muốn hủy đăng ký?"
                            onConfirm={(activeCancel) => handleCancel(activeCancel, record)}
                        >
                            <Button type="primary" danger>
                                Hủy
                            </Button>
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

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.8 } }}
            >
                <div className="text-muted">
                    <div className="">
                        <p className="fs-4 fw-bold">DANH SÁCH PHIẾU ĐĂNG KÝ</p>
                        <Button className="bg-light" onClick={handleDataCreate}>
                            <FontAwesomeIcon icon={faPlus} className="text-dark" />
                        </Button>
                        <DetailRegisPrint open1={open1} setOpen1={setOpen1} regis={regisById} />
                        <DetailRegistration
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
                                    dataSource={listRegistration}
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

export default RegistrationList;
