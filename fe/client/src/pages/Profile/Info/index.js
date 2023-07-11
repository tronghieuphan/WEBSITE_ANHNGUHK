import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Input, Form, Modal, Button, Badge } from "antd";
import { errorInfo, info, successDialog, successInfo } from "../../../components/Dialog/Dialog";
import "./style.scss";
import Detail from "../Detail";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDataUser } from "../../../slices/dataAdd";
import userAPI from "../../../services/userAPI";
import setCookie from "../../../cookie/setCookie";
import removeCookie from "../../../cookie/removeCookie";
import handleDatetime from "../../../utils/dateTime";
import pointAPI from "../../../services/pointAPI";
function InfoUser(props) {
    const { user, setValue } = props;
    const [load, setLoad] = useState(true);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [openCouserRes, setOpenCoursRes] = useState(false);
    const [openPoint, setOpenPoint] = useState(false);
    const [point, setPoint] = useState();
    const [studentCourseRes, setStudentCourseRes] = useState();
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const showModal = () => {
        setOpen1(true);
    };

    const handleStudentRes = async () => {
        let data = await userAPI.studentRes({ id: user.id });
        setStudentCourseRes(data.data.data);
    };
    const handleCancel = (e) => {
        setOpen1(false);
        setOpenCoursRes(false);
    };
    const handleCancelPoint = () => {
        setOpenPoint(false);
    };
    const handleSubmitPass = async (e) => {
        let obj = {
            ...e,
            userName: user.userName,
        };
        if (e.passWord !== e.reNewPassword) {
            info("Thông tin không hợp lệ", "Mật khẩu nhập lại không trùng khớp !");
        } else {
            let data = await userAPI.changePass(obj);
            if (data.data.message === "Not Exists") {
                errorInfo("Lỗi thông tin", "Tài khoản không tồn tại");
            } else if (data.data.message === "Change Fail") {
                errorInfo("Lỗi thông tin", "Mật khẩu cũ không chính xác");
            } else if (data.data.message === "Not Change") {
                errorInfo("Lỗi thông tin", "Mật khẩu mới trùng với mật khẩu cũ");
            } else {
                successInfo("Đổi mật khẩu thành công !");
                setOpen1(false);
                removeCookie("user");
                navigate("/login");
                form.resetFields();
            }
        }
    };
    const handleUpdate = async (obj) => {
        const data = await userAPI.update(obj);
        if (data.data.message === "Update Successfully") {
            setCookie("user", JSON.stringify(data.data.data));
            successDialog();
        }
        const find = await userAPI.findById({ id: obj?.id });
        if (find.data.message === "Find Successfully") {
            setCookie("user", JSON.stringify(find.data.data));
        }
        setOpen(false);
        setValue(!load);
    };
    const handleViewPoint = async (a) => {
        setOpenPoint(true);
        let obj = {
            studentId: user?.id,
            courseId: a.studentCourse.detailRegistration.courseId,
        };
        let data = await pointAPI.getPointStudentClass(obj);
        setPoint(data.data.point);
    };
    const updateUser = () => {
        setOpen(true);
        dispatch(setDataUser(user));
    };

    useEffect(() => {
        handleStudentRes();
    }, []);
    return (
        <>
            <div className="col-md-4 ">
                <Badge.Ribbon
                    text={
                        <div>
                            {user?.typeUser === "0"
                                ? "Thành viên"
                                : user?.typeUser === "1"
                                ? "Học viên"
                                : user?.typeUser === "2"
                                ? "Giảng viên"
                                : user?.typeUser === "3"
                                ? "Nhân viên"
                                : user?.typeUser === "4"
                                ? "ADMIN"
                                : ""}
                        </div>
                    }
                    color={
                        user?.typeUser === "1"
                            ? "blue"
                            : user?.typeUser === "2"
                            ? "yellow"
                            : user?.typeUser === "3"
                            ? "green"
                            : user?.typeUser === "4"
                            ? "red"
                            : ""
                    }
                >
                    <img src={user?.image} alt="" className="w-100 h-100 border" />
                </Badge.Ribbon>
            </div>

            <div className="col-md-8 ">
                <div className="mt-3 d-clock m-auto" style={{ width: "90%" }}>
                    <div className="w-100">
                        <div className="infor">
                            <div className="row">
                                <p className=" col-md-7">
                                    <div className="fw-bold">Tên người dùng:</div> &nbsp;
                                    <div>{user?.firstName + " " + user?.lastName}</div>
                                </p>
                                <p className=" col-md-5">
                                    <div className="fw-bold">Giới tính:</div> &nbsp;{" "}
                                    <div>{user?.gender ? "Nữ" : "Nam"}</div>
                                </p>
                            </div>
                            <div className="row">
                                <p className="col-md-7">
                                    <div className="fw-bold">Ngày sinh:</div> &nbsp;
                                    <div>{user?.dateBirth}</div>
                                </p>
                                <p className="col-md-5">
                                    <div className="fw-bold">Số điện thoại:</div> &nbsp;
                                    <div>{user?.phone}</div>
                                </p>
                            </div>

                            <p>
                                <div className="fw-bold">Email:</div> &nbsp;
                                <div>{user?.email}</div>
                            </p>

                            <p>
                                <div className="fw-bold">Địa chỉ:</div>
                                &nbsp;
                                <div>
                                    {(user?.street === null ? " " : user?.street + ", ") +
                                        user?.ward +
                                        ", " +
                                        user?.district +
                                        ", " +
                                        user?.city}
                                </div>
                            </p>
                            {user?.typeUser === "1" ? (
                                <>
                                    <p>
                                        <div className="fw-bold">Nơi công tác:</div> &nbsp;
                                        <div>{user?.workPlace}</div>
                                    </p>
                                </>
                            ) : (
                                ""
                            )}
                            {user?.typeUser === "2" ? (
                                <>
                                    <p>
                                        <div className="fw-bold">Bằng cấp:</div> &nbsp;
                                        <div>{user?.degree}</div>
                                    </p>
                                    <p>
                                        <div className="fw-bold">Kinh nghiệm:</div> &nbsp;
                                        <div>{user?.experience}</div>
                                    </p>
                                    <p>
                                        <div className="fw-bold">Chuyên môn:</div> &nbsp;
                                        <div>{user?.specialize}</div>
                                    </p>
                                    <p>
                                        <div className="fw-bold">Mô tả:</div> &nbsp;{" "}
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: user?.description,
                                            }}
                                        ></div>
                                    </p>
                                </>
                            ) : (
                                ""
                            )}
                            {user?.typeUser === "3" ? (
                                <>
                                    <p>
                                        <div className="fw-bold">Vị trí:</div> &nbsp;{" "}
                                        <div>{user?.position}</div>
                                    </p>
                                    <p>
                                        <div className="fw-bold">Phòng ban:</div> &nbsp;
                                        <div>{user?.department}</div>
                                    </p>
                                </>
                            ) : (
                                ""
                            )}
                        </div>
                        <div></div>

                        <div className="d-flex">
                            <Button
                                className="mx-2"
                                onClick={() => {
                                    navigate("/");
                                }}
                            >
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </Button>
                            <Button className="mx-2" onClick={() => setOpenCoursRes(true)}>
                                Xem khóa học đã đăng ký
                            </Button>
                            <Modal
                                className="h-50"
                                title={
                                    <>
                                        <div className="text-center fs-4">
                                            Các khóa học bạn đã đăng ký
                                        </div>
                                        <hr className="w-100" />
                                    </>
                                }
                                open={openCouserRes}
                                onCancel={handleCancel}
                                cancelButtonProps={{}}
                                footer={null}
                                width={700}
                            >
                                <div>
                                    {studentCourseRes?.map((item) => (
                                        <div
                                            className="row d-flex box-registed mx-2 my-4 p-3 justify-content-between"
                                            key={item.studentCourse.id}
                                        >
                                            <div className="col-md-4 d-flex align-items-center">
                                                {item.studentCourse.nameCourse}
                                            </div>
                                            <div className="col-md-6 d-flex align-items-center">
                                                {handleDatetime(item.dateRes)}
                                            </div>
                                            <div className="col-md-2">
                                                <Button
                                                    htmlType="submit"
                                                    className="bg-primary text-light fw-bold d-block m-auto"
                                                    onClick={() => handleViewPoint(item)}
                                                >
                                                    Điểm
                                                </Button>
                                            </div>
                                            <Modal
                                                className="h-50"
                                                title={
                                                    <>
                                                        <div className="text-center">Điểm số</div>
                                                        <hr className="w-100" />
                                                    </>
                                                }
                                                open={openPoint}
                                                onCancel={handleCancelPoint}
                                                cancelButtonProps={{}}
                                                footer={null}
                                            >
                                                {point === null ? (
                                                    "Khóa học chưa cập nhập điểm"
                                                ) : (
                                                    <div className="box-point">
                                                        <div>{point?.numberPoint}</div>
                                                        <div>
                                                            Đánh giá:
                                                            <span
                                                                className={
                                                                    point?.result === "1"
                                                                        ? "text-success"
                                                                        : "text-danger"
                                                                }
                                                            >
                                                                {point?.result === "1"
                                                                    ? " Đạt"
                                                                    : "Không đạt"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </Modal>
                                        </div>
                                    ))}
                                </div>
                            </Modal>

                            <div className="mx-2">
                                <Button type="primary" onClick={showModal}>
                                    ĐỔI MẬT KHẤU
                                </Button>
                                <Modal
                                    className="h-50"
                                    title={
                                        <>
                                            <div className="text-center">
                                                MỜI BẠN NHẬP THÔNG TIN
                                            </div>
                                            <hr className="w-100" />
                                        </>
                                    }
                                    open={open1}
                                    onCancel={handleCancel}
                                    cancelButtonProps={{}}
                                    footer={null}
                                >
                                    <Form onFinish={handleSubmitPass} form={form}>
                                        <Form.Item label="Nhập mật khẩu cũ" name="oldPassword">
                                            <Input type="password" />
                                        </Form.Item>
                                        <Form.Item label="Nhập mật khẩu mới" name="passWord">
                                            <Input type="password" />
                                        </Form.Item>
                                        <Form.Item
                                            label="Nhập lại mật khẩu mới"
                                            name="reNewPassword"
                                        >
                                            <Input type="password" />
                                        </Form.Item>
                                        <Form.Item className="text-center">
                                            <Button
                                                htmlType="submit"
                                                className="bg-primary text-light fw-bold"
                                            >
                                                Xác nhận
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Modal>
                            </div>
                            <Button type="primary" onClick={updateUser} className="mx-2">
                                Cập nhập thông tin
                            </Button>
                        </div>
                        <Detail
                            open={open}
                            setOpen={setOpen}
                            user={user}
                            handleUpdate={handleUpdate}
                        />
                    </div>
                </div>
                <br />
                <br />
            </div>
        </>
    );
}

export default InfoUser;
