import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Input, Form, Modal, Button, Badge } from "antd";
import { deleteSuccess, errorInfo, successDialog, info } from "../../../components/Dialog/Dialog";
import "./style.scss";
import Detail from "../Detail";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDataUser } from "../../../slices/dataAdd";
import userAPI from "../../../services/userAPI";
import setCookie from "../../../cookie/setCookie";
import removeCookie from "../../../cookie/removeCookie";
function InfoUser(props) {
    const { user, setValue } = props;
    const [load, setLoad] = useState(true);

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [form] = Form.useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const showModal = () => {
        setOpen1(true);
    };

    const handleUpdate = async (obj) => {
        const data = await userAPI.update(obj);
        setCookie("useradmin", JSON.stringify(data.data.data));
        if (data.data.message === "Update Successfully") {
            successDialog();
        }
        setOpen(false);
        setValue(!load);
    };
    const updateUser = () => {
        setOpen(true);
        dispatch(setDataUser(user));
    };

    const handleCancel = (e) => {
        setOpen1(false);
    };
    const handleSubmitPass = async (e) => {
        let obj = {
            ...e,
            userName: user.userName,
        };
        console.log(obj);
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
                deleteSuccess("Đổi mật khẩu thành công !");
                form.resetFields();
                setOpen1(false);
                removeCookie("useradmin");
                navigate("/");
            }
        }
    };

    return (
        <>
            <div className="col-md-4 ">
                <Badge.Ribbon
                    text={
                        <div>
                            {user.typeUser === "1"
                                ? "Học viên"
                                : user.typeUser === "2"
                                ? "Giảng viên"
                                : user.typeUser === "3"
                                ? "Nhân viên"
                                : user.typeUser === "4"
                                ? "ADMIN"
                                : ""}
                        </div>
                    }
                    color={
                        user.typeUser === "1"
                            ? "blue"
                            : user.typeUser === "2"
                            ? "yellow"
                            : user.typeUser === "3"
                            ? "green"
                            : user.typeUser === "4"
                            ? "red"
                            : ""
                    }
                >
                    <img src={user.image} alt="" style={{ width: "100%", height: "100%" }} />
                </Badge.Ribbon>
            </div>

            <div className="col-md-8 ">
                <div className="mt-3 d-clock m-auto" style={{ width: "90%" }}>
                    <div className="w-100">
                        <div className="infor">
                            <div className="row">
                                <p className=" col-md-7">
                                    <div className="fw-bold">Tên người dùng:</div> &nbsp;
                                    <div>{user.firstName + " " + user.lastName}</div>
                                </p>
                                <p className=" col-md-5">
                                    <div className="fw-bold">Giới tính:</div> &nbsp;{" "}
                                    <div>{user.gender ? "Nữ" : "Nam"}</div>
                                </p>
                            </div>
                            <div className="row">
                                <p className="col-md-7">
                                    <div className="fw-bold">Ngày sinh:</div> &nbsp;
                                    <div>{user.dateBirth}</div>
                                </p>
                                <p className="col-md-5">
                                    <div className="fw-bold">Số điện thoại:</div> &nbsp;
                                    <div>{user.phone}</div>
                                </p>
                            </div>

                            <p>
                                <div className="fw-bold">Email:</div> &nbsp;
                                <div>{user.email}</div>
                            </p>

                            <p>
                                <div
                                    className="fw-bold"
                                    style={{ textAlign: "justify", paddingLeft: "10px" }}
                                >
                                    Địa chỉ:
                                </div>
                                &nbsp;
                                <div>
                                    {(user.street === null ? " " : user.street + ", ") +
                                        user.ward +
                                        ", " +
                                        user.district +
                                        ", " +
                                        user.city}
                                </div>
                            </p>
                            {user.typeUser === "1" ? (
                                <>
                                    <p>
                                        <div className="fw-bold">Nơi công tác:</div> &nbsp;
                                        <div>{user.workPlace}</div>
                                    </p>
                                </>
                            ) : (
                                ""
                            )}
                            {user.typeUser === "2" ? (
                                <>
                                    <p>
                                        <div className="fw-bold">Bằng cấp:</div> &nbsp;
                                        <div>{user.degree}</div>
                                    </p>
                                    <p>
                                        <div className="fw-bold">Kinh nghiệm:</div> &nbsp;
                                        <div>{user.experience}</div>
                                    </p>
                                    <p>
                                        <div className="fw-bold">Chuyên môn:</div> &nbsp;
                                        <div>{user.specialize}</div>
                                    </p>
                                    <p>
                                        <div className="fw-bold">Mô tả:</div> &nbsp;{" "}
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: user.description,
                                            }}
                                        ></div>
                                    </p>
                                </>
                            ) : (
                                ""
                            )}
                            {user.typeUser === "3" ? (
                                <>
                                    <p>
                                        <div className="fw-bold">Vị trí:</div> &nbsp;{" "}
                                        <div>{user.position}</div>
                                    </p>
                                    <p>
                                        <div className="fw-bold">Phòng ban:</div> &nbsp;
                                        <div>{user.department}</div>
                                    </p>
                                </>
                            ) : (
                                ""
                            )}
                        </div>
                        <div></div>

                        <div className="row">
                            <Button
                                className=" col-md-1"
                                onClick={() => {
                                    navigate("/home");
                                }}
                            >
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </Button>
                            <div className=" col-md-5 text-end">
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
                            <Button type="primary" onClick={updateUser} className=" col-md-5">
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
