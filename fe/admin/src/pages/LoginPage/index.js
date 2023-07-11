import "./style.scss";
import logo from "../../assets/image/logoheader.png";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { toast } from "react-toastify";
import userAPI from "../../services/userAPI";
import setCookie from "../../cookie/setCookie";
import getCookie from "../../cookie/getCookie";

function LoginPage() {
    const user = getCookie("useradmin") ? JSON.parse(getCookie("useradmin")) : null;
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (e, res) => {
        if (e.userName === undefined || e.passWord === undefined) {
            toast.error("Nhập thông tin đầy đủ nào");
        } else {
            let a = await userAPI.login(e);
            if (a.data.message === "Username Not Exist") {
                toast.error("Tài khoản không tồn tại");
            } else {
                if (a.data.message === "Fail Password") {
                    toast.error("Mật khẩu không chính xác");
                } else {
                    let obj;
                    if (a.data.data.typeUser === "3" && a.data.data.department === "Đào tạo")
                        obj = {
                            ...a.data.data,
                            codeUser: 1,
                        };
                    else {
                        obj = {
                            ...a.data.data,
                            codeUser: 0,
                        };
                    }
                    setCookie("useradmin", JSON.stringify(obj));
                    toast.success("Đăng nhập thàng công");
                    navigate(`/home`);
                }
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
                    <div className="p-5">
                        <h3 className="color-text1">Xin chào bạn đến với HK EDU !</h3>
                        <p className="color-text2">
                            Hãy đăng nhập để được trãi nghiệm website một cách tốt nhất
                        </p>
                        <br />
                        <Form onFinish={handleSubmit} layout="vertical">
                            <Form.Item
                                name="userName"
                                label={<span className="fs-6">Tên đăng nhập</span>}
                                className="fw-bold"
                            >
                                <Input className="w-100 py-2" id="standard-basic" />
                            </Form.Item>

                            <Form.Item
                                name="passWord"
                                label={<span className="fs-6">Mật khẩu</span>}
                                className="fw-bold"
                            >
                                <Input className="w-100 py-2" type="password" />
                            </Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                className="w-100 fw-bold"
                            >
                                Đăng nhập
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
