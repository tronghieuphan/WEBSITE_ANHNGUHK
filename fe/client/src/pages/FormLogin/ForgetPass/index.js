import "../style.scss";
import { Form, Input, Button, Modal } from "antd";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../../assets/image/logoheader.png";
import userAPI from "../../../services/userAPI";
import { useState } from "react";
import { errorInfo, info, successInfo } from "../../../components/Dialog/Dialog";

function ForgetPass() {
    const navigate = useNavigate();
    const [userEmail, setValueUser] = useState();
    const [open1, setOpen1] = useState(false);

    const handleSubmit = async (e) => {
        const data = await userAPI.forgetPass(e);
        if (data.data.message === "Find Successfully") {
            setValueUser(data.data.codeEmail);
            successInfo("Vui lòng kiểm tra email !");
        } else {
            errorInfo("Email không chính xác!");
        }
    };
    const handleSubmitVerify = async (e) => {
        let obj = {
            code: e.code1 + e.code2 + e.code3 + e.code4 + e.code5 + e.code6,
        };
        if (obj.code !== userEmail.data.code) {
            info("Thông tin không hợp lệ", "Mã xác nhận chưa chính xác !");
        } else {
            setOpen1(true);
        }
    };
    const handleCancel = (e) => {
        setOpen1(false);
    };
    const handleSubmitPass = async (e) => {
        let obj = {
            ...e,
            email: userEmail.data.email,
        };
        if (e.passWord !== e.reNewPassword) {
            info("Thông tin không hợp lệ", "Mật khẩu nhập lại không trùng khớp !");
        } else {
            let data = await userAPI.changePassForget(obj);
            if (data.data.message === "Not Exists") {
                errorInfo("Lỗi thông tin", "Tài khoản không tồn tại");
            } else {
                successInfo("Đặt lại mật khẩu thành công !");
                setOpen1(false);
                navigate("/login");
            }
        }
    };
    return (
        <>
            <div className="content-center bg-login">
                <div className="box">
                    <div className="bg-icon p-4 mt-4">
                        <img
                            src={logo}
                            alt=""
                            className="rounded mx-auto d-block "
                            style={{ width: "250px", height: "80px" }}
                        />
                    </div>
                    <div className="px-5 py-4">
                        <h3 className="color-text1">Xin chào bạn đến với HK EDU !</h3>
                        <p className="color-text2">
                            Hãy đăng nhập để được trãi nghiệm website một cách tốt nhất{" "}
                        </p>
                        <hr className="w-75 m-auto my-3" />
                        {userEmail ? (
                            <Form onFinish={handleSubmitVerify} layout="vertical">
                                <p className="fw-bold fs-6">Vui lòng nhập mã xác nhận:</p>
                                <div className="d-flex nowrap w-75 m-auto">
                                    <Form.Item name="code1" className="fw-bold m-1 ">
                                        <Input maxlength="1" className="text-center" />
                                    </Form.Item>
                                    <Form.Item name="code2" className="fw-bold m-1 ">
                                        <Input maxlength="1" className="text-center" />
                                    </Form.Item>
                                    <Form.Item name="code3" className="fw-bold m-1 ">
                                        <Input maxlength="1" className="text-center" />
                                    </Form.Item>
                                    <Form.Item name="code4" className="fw-bold m-1 ">
                                        <Input maxlength="1" className="text-center" />
                                    </Form.Item>
                                    <Form.Item name="code5" className="fw-bold m-1 ">
                                        <Input maxlength="1" className="text-center" />
                                    </Form.Item>
                                    <Form.Item name="code6" className="fw-bold m-1 ">
                                        <Input maxlength="1" className="text-center" />
                                    </Form.Item>
                                </div>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="my-3 w-100 fw-bold "
                                >
                                    Xác nhận
                                </Button>
                            </Form>
                        ) : (
                            <Form onFinish={handleSubmit} layout="vertical">
                                <Form.Item
                                    name="email"
                                    label={<span className="fs-6">Nhập email đã đăng ký:</span>}
                                    className="fw-bold"
                                >
                                    <Input className="w-100 py-2" id="standard-basic" />
                                </Form.Item>

                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="w-100 fw-bold"
                                >
                                    Gửi mã xác nhận
                                </Button>
                            </Form>
                        )}

                        <Modal
                            className="h-50"
                            title={
                                <>
                                    <div className="text-center">MỜI BẠN NHẬP THÔNG TIN</div>
                                    <hr className="w-100" />
                                </>
                            }
                            open={open1}
                            onCancel={handleCancel}
                            cancelButtonProps={{}}
                            footer={null}
                        >
                            <Form onFinish={handleSubmitPass}>
                                <Form.Item label="Nhập mật khẩu mới" name="passWord">
                                    <Input type="password" />
                                </Form.Item>
                                <Form.Item label="Nhập lại mật khẩu mới" name="reNewPassword">
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
                        <p className="pt-3 text-start">
                            <Link className="text-decoration-none" to="/">
                                <div className="fw-bold ">Quay lại trang chủ</div>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgetPass;
