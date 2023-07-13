import { Table, Button, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faFileExport,
    faRectangleList,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import classesAPI from "../../../services/classesAPI";
import handleOnExport from "../../../utils/exportXLSX";
import { info, successInfo } from "../../../components/Dialog/Dialog";
import pointAPI from "../../../services/pointAPI";

function StudentClassesList() {
    const [loading, setLoading] = useState(true);
    const [listStudent, setListStudent] = useState([]);
    const [infoClasses, setInfoClasses] = useState();

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
