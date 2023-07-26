import "../style.scss";
import { Form, Input, Button } from "antd";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../../assets/image/logoheader.png";
import { toast } from "react-toastify";
import userAPI from "../../../services/userAPI";
import setCookie from "../../../cookie/setCookie";
import getCookie from "../../../cookie/getCookie";
import removeCookie from "../../../cookie/removeCookie";
function LoginPage() {
    const navigate = useNavigate();
    const document = getCookie("document") ? JSON.parse(getCookie("document")) : null;
    const course = getCookie("course") ? JSON.parse(getCookie("course")) : null;
    const review = getCookie("review") ? JSON.parse(getCookie("review")) : null;

    const handleSubmit = async (e) => {
        let checkType = await userAPI.findBy({ datafind: e.userName });
        if (checkType.data.data[0]?.typeUser === "4") {
            toast.error("Tài khoản không tồn tại !");
        } else {
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
                        setCookie("user", JSON.stringify(a.data.data));
                        toast.success("Đăng nhập thàng công");
                        if (document?.code === "downloaddocument") {
                            navigate(
                                `/document/detail/${document?.typeId}/${document?.nameDocument}`
                            );
                            removeCookie("document");
                        } else if (course?.code === "rescourse") {
                            navigate(`/course/${course?.typeId}`);
                            removeCookie("course");
                        } else if (review?.code === "pagereview") {
                            navigate(`/review`);
                            removeCookie("review");
                        } else {
                            navigate(`/`);
                        }
                    }
                }
            }
        }
    };

    // function handleCallbackResponse(response) {
    //     console.log("Encoded JWT: ", response.credential);
    // }
    // useEffect(() => {
    //     window.google.accounts.id.initialize({
    //         client_id: "59771199504-4lhgeaiihog6244csassi0n7hb99qlvr.apps.googleusercontent.com",
    //         cookiepolicy: 'single_host_origin',
    //         callback: handleCallbackResponse,
    //     });
    //     window.google.accounts.id.renderButton(document.getElementById("signInDiv"));
    // }, []);
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
                        <br />
                        <Form onFinish={handleSubmit} layout="vertical">
                            <Form.Item
                                name="userName"
                                label={<span className="fs-6">Tên đăng nhập</span>}
                                className="fw-bold col-md-12"
                            >
                                <Input className="w-100 py-2" id="standard-basic" />
                            </Form.Item>

                            <Form.Item
                                name="passWord"
                                label={<span className="fs-6">Mật khẩu</span>}
                                className="fw-bold col-md-12"
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
                        {/* <div id="signInDiv"></div> */}
                        <div className="pt-3  row w-75 m-auto">
                            <div className="col-md-6 text-end"> Bạn chưa có tài khoản? </div>
                            <Link className="text-decoration-none col-md-6" to="/register">
                                <div className="fw-bold text-start "> Tạo tài khoản</div>
                            </Link>
                        </div>
                        <p className="text-center">
                            <Link className="text-decoration-none" to="/forgetpass">
                                <div className="fw-bold pt-2  text-decoration-underline ">
                                    Quên mật khẩu ?
                                </div>
                            </Link>
                        </p>
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

export default LoginPage;
