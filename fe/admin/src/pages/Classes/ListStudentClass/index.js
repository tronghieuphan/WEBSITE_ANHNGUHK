import { Table, Button, Tooltip, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faFileExport,
    faRectangleList,
    faEnvelope,
    faArrowRightArrowLeft,
    faL,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import classesAPI from "../../../services/classesAPI";
import handleOnExport from "../../../utils/exportXLSX";
import { info, successInfo } from "../../../components/Dialog/Dialog";
import pointAPI from "../../../services/pointAPI";
import CardClassesMove from "../../../components/Card/CardClassesMove";
import Swal from "sweetalert2";

function StudentClassesList() {
    const [loading, setLoading] = useState(true);
    const [listStudent, setListStudent] = useState([]);
    const [infoClasses, setInfoClasses] = useState();
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);

    const [detailStudent, setDetailStudent] = useState("");
    const [listClassesActive, setListClassesActive] = useState([]);

    const { idClasses } = useParams();
    const navigate = useNavigate();
    const getAllStudentClasses = async () => {
        try {
            setLoading(true);
            const response = await classesAPI.getListStudentClasses({ datafind: idClasses });
            setListStudent(response.data.data);
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

    const handleCreatePoint = async () => {
        let data = await pointAPI.create({ data: idClasses });
        if (data.data.message === "Create Successfully") {
            successInfo("Tạo danh sách điểm thành công !");
        } else {
            info("Danh sách gặp trục trặc");
        }
    };

    const handCancel = () => {
        Swal.fire({
            title: "Bạn có chắc chắn ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                let obj = {
                    code: "3",
                    studentId: detailStudent.id,
                    classesId: idClasses,
                };
                let data = await classesAPI.move(obj);
                if (data.data.message === "Cancel Successfully") {
                    successInfo("Bạn đã hủy phiếu đăng ký");
                    setOpen1(false);
                    getAllStudentClasses();
                }
            }
        });
    };
    const handleShow = async (record) => {
        setDetailStudent(record);
        let data = await classesAPI.move({ code: "1", idClasses: idClasses });
        setListClassesActive(data.data.data);
        setOpen1(true);
    };
    const handleMove = async (obj) => {
        let info = {
            code: "2",
            idStudent: detailStudent.id,
            idClassesOld: idClasses,
            ...obj,
        };
        let data = await classesAPI.move(info);
        if (data.data.message === "Move Successfully") {
            successInfo("Đã thay đổi lớp học cho học viên");
        }
        getAllStudentClasses();
    };
    useEffect(() => {
        getAllStudentClasses();
        getInfoClasses();
    }, [idClasses]);

    const handleExportFile = () => {
        let obj = {
            list: listStudent,
            name:
                "DANH SÁCH SINH VIÊN" +
                infoClasses.nameClasses +
                " " +
                infoClasses.startDate +
                " " +
                infoClasses.endDate,
        };
        handleOnExport(obj);
    };
    const handleSendMailAll = async () => {
        let data = await classesAPI.sendMailAll({ datafind: idClasses });
        if (data.data.message === "Send Successfully") {
            successInfo("Gửi thành công");
        } else {
            info("Thông tin chưa được xử lý");
        }
    };
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            align: "center",
            fixed: "left",
        },
        {
            title: "Họ lót",
            dataIndex: "firstName",
            render: (firstName) => <div style={{ width: "150px" }}>{firstName}</div>,
        },
        {
            title: "Tên",
            dataIndex: "lastName",
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            align: "center",
            render: (gender) => (
                <div style={{ width: "50px" }}>{gender === true ? "Nữ" : "Nam"}</div>
            ),
        },
        {
            title: "Ngày sinh",
            dataIndex: "dateBirth",
            align: "center",
            render: (dateBirth) => <div style={{ width: "100px" }}>{dateBirth}</div>,
        },
        {
            title: "Email",
            dataIndex: "email",
            render: (email) => (
                <div style={{ width: "200px" }} className="des-hidden">
                    {email}
                </div>
            ),
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
        },
        {
            title: "Tài khoản",
            dataIndex: "userName",
        },
        {
            title: "Số nhà",
            dataIndex: "street",
            render: (street) => <div style={{ width: "100px" }}>{street}</div>,
        },
        {
            title: "Phường/xã",
            dataIndex: "ward",
            render: (ward) => <div style={{ width: "100px" }}>{ward}</div>,
        },
        {
            title: "Quận/huyện",
            dataIndex: "district",
            render: (district) => <div style={{ width: "100px" }}>{district}</div>,
        },
        {
            title: "Tỉnh/thành ",
            dataIndex: "city",
            render: (city) => <div style={{ width: "100px" }}>{city}</div>,
        },
        {
            title: "Nơi công tác",
            dataIndex: "workPlace",
            align: "center",
            render: (street) => (
                <div style={{ width: "150px" }} className="des-hidden">
                    {street}
                </div>
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
            title: "Chuyển lớp",
            dataIndex: "",
            align: "center",
            fixed: "right",
            render: (record) => (
                <Button className="bg-light" onClick={() => handleShow(record)}>
                    <FontAwesomeIcon icon={faArrowRightArrowLeft} className="text-dark" />
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
                        <p className="fs-4 fw-bold">
                            DANH SÁCH SINH VIÊN LỚP {infoClasses?.nameClasses}
                        </p>
                        <Button
                            className="bg-light mx-2"
                            onClick={() => {
                                navigate("/list-classes");
                            }}
                        >
                            Quay lại
                        </Button>

                        <Button className="bg-light">
                            <FontAwesomeIcon icon={faPlus} className="text-dark" />
                        </Button>
                        <Tooltip placement="top" title="Tạo danh sách điểm">
                            <Button className="bg-light mx-2" onClick={handleCreatePoint}>
                                <FontAwesomeIcon icon={faRectangleList} className="text-dark" />
                            </Button>
                        </Tooltip>
                        <Tooltip placement="top" title="Gửi lịch học">
                            <Button className="bg-light" onClick={handleSendMailAll}>
                                <FontAwesomeIcon icon={faEnvelope} className="text-dark" />
                            </Button>
                        </Tooltip>
                        <Tooltip placement="top" title="Xuất danh sách">
                            <Button className="bg-light mx-2" onClick={handleExportFile}>
                                <FontAwesomeIcon icon={faFileExport} className="text-dark" />
                            </Button>
                        </Tooltip>
                        <Modal
                            title={
                                <>
                                    <div className="fs-4 fw-bold text-center">Xử lý thông tin</div>
                                    <hr />
                                </>
                            }
                            centered
                            open={open1}
                            okButtonProps={{
                                style: {
                                    display: "none",
                                },
                            }}
                            cancelButtonProps={{
                                style: {
                                    visibility: "hidden",
                                },
                            }}
                            className="my-1 "
                            onCancel={() => setOpen1(false)}
                            width={500}
                        >
                            <div className="row">
                                <div className="col-md-6">
                                    <Button
                                        className="mx-1 w-100"
                                        type="primary"
                                        danger
                                        onClick={handCancel}
                                    >
                                        Hủy đăng ký
                                    </Button>
                                </div>
                                <div className="col-md-6">
                                    <Button
                                        className="mx-1 w-100"
                                        type="primary"
                                        onClick={() => setOpen(true)}
                                    >
                                        Chuyển lớp
                                    </Button>
                                </div>
                            </div>
                        </Modal>
                        <Modal
                            title={
                                <>
                                    <div className="fs-4 fw-bold">Danh sách lớp học đang mở</div>
                                    <hr />
                                </>
                            }
                            centered
                            open={open}
                            okButtonProps={{
                                style: {
                                    display: "none",
                                },
                            }}
                            cancelButtonProps={{
                                style: {
                                    visibility: "hidden",
                                },
                            }}
                            className="my-3 "
                            onCancel={() => {
                                setOpen(false);
                                setOpen1(false);
                            }}
                            width={1000}
                        >
                            <div className="row">
                                {listClassesActive.map((item) => {
                                    return (
                                        <>
                                            <div className="col-md-3" key={item.id}>
                                                <CardClassesMove
                                                    classesActive={item}
                                                    handleMove={handleMove}
                                                />
                                            </div>
                                        </>
                                    );
                                })}
                            </div>
                        </Modal>
                        <hr className="w-100 " />
                        <div className="row">
                            <div className="col-md-12">
                                <Table
                                    columns={columns}
                                    dataSource={listStudent}
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

export default StudentClassesList;
