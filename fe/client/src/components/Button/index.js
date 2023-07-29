import "./style.scss";
import { Modal, Form, Input, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { VND } from "../../utils/formatVND";
import getCookie from "../../cookie/getCookie";
import Swal from "sweetalert2";
import consultAPI from "../../services/consultAPI";
import { info, infoRes } from "../Dialog/Dialog";
import timeDataArrive from "../../utils/data";
function BtnRegister(props) {
    const [open, setOpen] = useState(false);
    // const [valueRegis, setValueRegis] = useState();
    const [date, setDate] = useState(false);
    const [checkStaff, setCheckStaff] = useState([]);
    const [spinload, setSpinLoad] = useState(false);
    const { record, data } = props;
    const [form] = Form.useForm();
    const user = getCookie("user") ? JSON.parse(getCookie("user")) : null;

    const handleCreate = async (obj) => {
        setSpinLoad(true);
        const data = await consultAPI.create(obj);
        setSpinLoad(false);
        if (data.data.message === "Create Successfully") {
            infoRes(
                "Bạn đã đăng ký khóa học thành công, vui lòng đến trung tâm đúng lịch hẹn. Xin cảm ơn !"
            );
            // setValueRegis(data.data.data);
        }
    };
    const handleClick = (value) => {
        console.log(value);
    };

    const handleDateArrive = async (e) => {
        // let datenow = new Date().getTime();
        // let datechoose = new Date(e.target.value).getTime();
        let datenow = new Date();
        let datechoose = new Date(e.target.value);
        let datenow_day = datenow.getDate();
        let datenow_month = datenow.getMonth();
        let datenow_year = datenow.getFullYear();
        let datechoose_day = datechoose.getDate();
        let datechoose_month = datechoose.getMonth();
        let datechoose_year = datechoose.getFullYear();
        if (datenow_month === datechoose_month) {
            if (
                datenow_day > datechoose_day ||
                // datenow_month > datechoose_month ||
                datenow_year > datechoose_year
                // datechoose < datenow
            ) {
                info("Ngày hẹn không hợp lý");
                setDate(false);
            } else {
                setDate(true);
                let a = await consultAPI.checkStaff({ dateArrive: e.target.value });
                setCheckStaff(a.data.data);
            }
        } else {
            setDate(true);
            let a = await consultAPI.checkStaff({ dateArrive: e.target.value });
            setCheckStaff(a.data.data);
        }
        // if (
        //     datenow_day > datechoose_day ||
        //     // datenow_month > datechoose_month ||
        //     datenow_year > datechoose_year
        //     // datechoose < datenow
        // ) {
        //     info("Ngày hẹn không hợp lý");
        //     setDate(false);
        // } else {
        //     setDate(true);
        //     let a = await consultAPI.checkStaff({ dateArrive: e.target.value });
        //     setCheckStaff(a.data.data);
        // }
    };

    //Xy ly hien thị so luong đc đki tu vấn
    let handleAddKey = [];
    // Duêtỵ tạo khóa cho khung giờ key
    timeDataArrive.map((item) => {
        let slip = item.split(":");
        let x = parseInt(slip[0] + slip[2]);
        handleAddKey.push({ key: x, time: item });
    });

    let listTime = [];
    //kiểm tra nếu nếu dữ liệu lấy ra có độ dài bằng 0 thì lất tất
    if (checkStaff.length === 0) {
        listTime = handleAddKey;
    } else {
        //nếu khác 0 thì duyệt lấy các phần tử khác
        checkStaff.map((item) => {
            handleAddKey.map((item1) => {
                if (item.key !== item1.key) {
                    listTime.push(item1);
                }
            });
        });
    }
    // mảng gồm các mã do be xuất lên
    let existKey = checkStaff.map(function (item) {
        return item.key;
    });
    let filterArray = listTime.filter(function (item) {
        return existKey.indexOf(item.key) === -1;
    });

    // gộp các dữ liệu trùng
    const uniqueSet = new Set(filterArray);

    const listEx = [...uniqueSet];

    // /////////////////////////////
    const handleSubmit = (e) => {
        if (date === false) {
            info("Ngày chọn không hợp lý");
        } else {
            let obj = {
                ...e,
                classesId: record.id,
                userId: user.id,
            };
            console.log(obj);
            Swal.fire({
                title: "BẠN CÓ CÓ XÁC NHẬN ĐĂNG KÝ TƯ VẤN?",
                confirmButtonText: "Tôi đồng ý",
                showCancelButton: true,
                cancelButtonText: "Chưa sẵn sàng",
                customClass: {
                    title: "fs-5 text-dark",
                    confirmButton: "bg-primary shadow-none",
                    cancelButton: "bg-warning shadow-none",
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    handleCreate(obj);
                }
            });
        }
    };
    useEffect(() => {
        form.setFieldsValue({
            name: user?.firstName + " " + user?.lastName,
            phone: user?.phone,
            email: user?.email,
        });
    }, [user]);
    return (
        <>
            <div className="text-center">
                <button className="btn-choose-course" onClick={() => setOpen(true)}>
                    Chọn
                </button>
            </div>

            <Modal
                title={<div className="text-center fw-bold fs-4 my-3">ĐĂNG KÝ TƯ VẤN MIỄN PHÍ</div>}
                centered
                open={open}
                okButtonProps={{
                    style: {
                        display: "none",
                    },
                }}
                cancelButtonProps={{
                    style: {
                        display: "none",
                    },
                }}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <Spin tip="Đang xử lý" spinning={spinload}>
                    <div
                        style={{ backgroundColor: "#F3F8FF" }}
                        className="p-3 rounded-3 box-frame-regis"
                    >
                        <Form onFinish={handleSubmit} layout="vertical" form={form}>
                            <div className="row m-auto">
                                <div className="col-md-4">
                                    <div className="fw-bold text-center">Khóa học đăng ký</div>
                                    <hr />
                                    <div>
                                        <div className="w-85 my-3 mx-auto">
                                            <div className="p-4 rounded-3 box-regis">
                                                <p className="fs-5 fw-bold text-center text-primary">
                                                    {data?.nameCourse}
                                                </p>
                                                <p>
                                                    <span className="px-2 fw-bold">
                                                        Khai giảng:
                                                    </span>
                                                    <span>{record?.startDate}</span>
                                                </p>

                                                <p>
                                                    <span className="px-2 fw-bold">Lịch học:</span>
                                                    <span>{record?.weekdayId + " "}</span>
                                                </p>
                                                <p>
                                                    <span className="px-2 fw-bold">Giờ học:</span>
                                                    <span>{record?.hour}</span>
                                                </p>

                                                <p>
                                                    <span className="px-2 fw-bold">Học phí:</span>
                                                    <span className="text-danger fw-bold">
                                                        {VND.format(data?.price)}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-8">
                                    <div className="fw-bold text-center">Thông tin học viên</div>
                                    <hr />
                                    <div className="w-75 m-3 mx-auto">
                                        <Form.Item name="name">
                                            <Input placeholder="Họ và tên" />
                                        </Form.Item>
                                        <Form.Item name="phone">
                                            <Input placeholder="Số điện thoại" />
                                        </Form.Item>
                                        <Form.Item name="email">
                                            <Input placeholder="Email" />
                                        </Form.Item>
                                        <Form.Item
                                            name="target"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Vui lòng nhập thông tin !",
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Mục tiêu cần đạt" />
                                        </Form.Item>
                                        <Form.Item
                                            name="timeComplete"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Vui lòng nhập thông tin !",
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Hoàn thành trong (VD: 1 tháng, 2 tháng,...)" />
                                        </Form.Item>
                                        <hr />
                                        <div className="row">
                                            <Form.Item
                                                name="dateArrive"
                                                label="Ngày bạn sẽ đến:"
                                                className={date ? "col-md-6" : "col-md-12"}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Vui lòng chọn lịch hẹn !",
                                                    },
                                                ]}
                                            >
                                                <Input type="date" onChange={handleDateArrive} />
                                            </Form.Item>
                                            {date ? (
                                                <Form.Item
                                                    name="timeArrive"
                                                    label="Vào lúc:
                                                
                                                ."
                                                    className="col-md-6"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Mời bạn chọn giờ !",
                                                        },
                                                    ]}
                                                >
                                                    <Select
                                                        showSearch
                                                        placeholder="Chọn khung giờ bạn muốn"
                                                        optionFilterProp="children"
                                                        onChange={handleClick}
                                                        filterOption={(input, option) =>
                                                            (option?.label ?? "")
                                                                .toLowerCase()
                                                                .includes(input.toLowerCase())
                                                        }
                                                        options={listEx.map((item) => ({
                                                            label: item.time,
                                                            value: item.time,
                                                        }))}
                                                    />
                                                </Form.Item>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="w-75 m-auto my-3" />
                            <div className="text-center">
                                <Form.Item name="">
                                    <button
                                        type="submit"
                                        className="text-center w-25 m-auto  "
                                        style={{
                                            backgroundColor: "#ff2222",
                                            padding: "15px 20px",
                                            fontWeight: "bold",
                                            color: "white",
                                            border: "none",
                                            fontSize: "17px",
                                            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                                            borderRadius: "30px",
                                        }}
                                    >
                                        Đăng ký
                                    </button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </Spin>
            </Modal>
        </>
    );
}

export default BtnRegister;
