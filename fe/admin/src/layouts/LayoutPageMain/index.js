import {
    UserOutlined,
    BookOutlined,
    FormOutlined,
    AppstoreOutlined,
    ContainerOutlined,
    PieChartOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./style.scss";
import logo from "../../assets/image/logo.png";
import AvatarDrop from "../../components/Avatar";
import getCookie from "../../cookie/getCookie";
const { Header, Sider, Content } = Layout;

function LayoutPageMain({ children }) {
    const user = getCookie("useradmin") ? JSON.parse(getCookie("useradmin")) : null;
    const [staffConsult, setValeTypeConsult] = useState(false);
    const [staffEdu, setValeTypeEdu] = useState(false);
    const [lecture, setValeTypeLecture] = useState(false);
    const [admin, setValeTypeAdmin] = useState(false);

    //phân loại người dùng
    const handlePreUser = () => {
        if (user?.typeUser === "3" && user?.department === "Tư vấn") {
            setValeTypeConsult(true);
            setValeTypeEdu(false);
            setValeTypeLecture(false);
            setValeTypeAdmin(false);
        } else if (user?.typeUser === "3" && user?.department === "Đào tạo") {
            setValeTypeConsult(false);
            setValeTypeEdu(true);
            setValeTypeLecture(false);
            setValeTypeAdmin(false);
        } else if (user?.typeUser === "4") {
            setValeTypeConsult(false);
            setValeTypeEdu(false);
            setValeTypeLecture(false);
            setValeTypeAdmin(true);
        } else if (user?.typeUser === "2") {
            setValeTypeConsult(false);
            setValeTypeEdu(false);
            setValeTypeLecture(true);
            setValeTypeAdmin(false);
        }
    };
    useEffect(() => {
        handlePreUser();
    }, []);

    const [collapsed, setCollapsed] = useState(false);
    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }
    const items = [
        getItem(
            <NavLink to="/home" style={{ textDecoration: "none", fontWeight: "bold" }}>
                Trang chủ
            </NavLink>,
            "sub1",
            <HomeOutlined />
        ),
        admin &&
            getItem(
                <NavLink to="/dashboard" style={{ textDecoration: "none", fontWeight: "bold" }}>
                    Thống kê
                </NavLink>,
                "sub20",
                <PieChartOutlined />
            ),

        getItem(<div className="fw-bold">QUẢN LÝ NGƯỜI DÙNG</div>, "sub2", <UserOutlined />, [
            (admin || staffEdu || staffConsult) &&
                getItem(
                    <NavLink to="/list-user" style={{ textDecoration: "none", fontWeight: "400" }}>
                        Thông tin người dùng
                    </NavLink>,
                    "1"
                ),
            (admin || staffEdu || lecture) &&
                getItem(
                    <NavLink to="/list-point" style={{ textDecoration: "none", fontWeight: "400" }}>
                        Thông tin điểm
                    </NavLink>,
                    "3"
                ),
        ]),
        (admin || staffEdu) &&
            getItem(<div className="fw-bold">QUẢN LÝ HỌC TẬP</div>, "sub3", <BookOutlined />, [
                getItem(
                    <NavLink
                        to="/list-course"
                        style={{ textDecoration: "none", fontWeight: "400" }}
                    >
                        Thông tin khóa học
                    </NavLink>,
                    "4"
                ),
                getItem(
                    <NavLink
                        to="/list-classes"
                        style={{ textDecoration: "none", fontWeight: "400" }}
                    >
                        Thông tin lớp học
                    </NavLink>,
                    "5"
                ),
            ]),
        (staffConsult || admin) &&
            getItem(<div className="fw-bold">QUẢN LÝ ĐĂNG KÝ</div>, "sub4", <FormOutlined />, [
                getItem(
                    <NavLink
                        to="/list-consult"
                        style={{ textDecoration: "none", fontWeight: "400" }}
                    >
                        Thông tin đăng ký tư vấn
                    </NavLink>,
                    "6"
                ),
                getItem(
                    <NavLink
                        to="/list-registration"
                        style={{ textDecoration: "none", fontWeight: "400" }}
                    >
                        Thông tin phiếu đăng ký
                    </NavLink>,
                    "7"
                ),
            ]),
        (admin || staffEdu) &&
            getItem(<div className="fw-bold">QUẢN LÝ DANH MỤC</div>, "sub5", <AppstoreOutlined />, [
                getItem(
                    <NavLink to="/list-type" style={{ textDecoration: "none", fontWeight: "400" }}>
                        Thông tin loại khóa học
                    </NavLink>,
                    "8"
                ),
                getItem(
                    <NavLink
                        to="/list-weekday"
                        style={{ textDecoration: "none", fontWeight: "400" }}
                    >
                        Thông tin thứ
                    </NavLink>,
                    "9"
                ),
                getItem(
                    <NavLink
                        to="/list-classify"
                        style={{ textDecoration: "none", fontWeight: "400" }}
                    >
                        Thông tin đối tượng
                    </NavLink>,
                    "10"
                ),
                getItem(
                    <NavLink
                        to="/list-outstanding"
                        style={{ textDecoration: "none", fontWeight: "400" }}
                    >
                        Thông tin học viên nổi bật
                    </NavLink>,
                    "11"
                ),
            ]),
        admin &&
            getItem(<div className="fw-bold">QUẢN LÝ DỊCH VỤ</div>, "sub6", <ContainerOutlined />, [
                getItem(
                    <NavLink
                        to="/list-discount"
                        style={{ textDecoration: "none", fontWeight: "400" }}
                    >
                        Thông tin khuyến mãi
                    </NavLink>,
                    "12"
                ),
                getItem(
                    <NavLink
                        to="/list-document"
                        style={{ textDecoration: "none", fontWeight: "400" }}
                    >
                        Thông tin tài liệu
                    </NavLink>,
                    "13"
                ),
                getItem(
                    <NavLink
                        to="/list-review"
                        style={{ textDecoration: "none", fontWeight: "400" }}
                    >
                        Thông tin đánh giá
                    </NavLink>,
                    "14"
                ),
            ]),
    ];

    return (
        <Layout
            style={{
                minHeight: "100vh",
            }}
        >
            <Sider
                breakpoint="lg"
                width={300}
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
                trigger={null}
                collapsible
                collapsedWidth={0}
                collapsed={collapsed}
                className="bg-light b-menu"
            >
                <div className="demo-logo-vertical" />
                {collapsed ? (
                    ""
                ) : (
                    <div className="d-block text-center mx-auto my-3">
                        <img src={logo} width={200} />
                    </div>
                )}
                <Menu theme="light" mode="inline" items={items}></Menu>
            </Sider>

            <Layout className="bg-frame">
                <Header
                    className="my-3 mx-4 d-flex align-items-center rounded-3 p-header"
                    style={{ backgroundColor: "#fff" }}
                >
                    <div className="w-100 d-flex justify-content-between align-items-center">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: "16px",
                                width: 40,
                                height: 40,
                                backgroundColor: "#0D6EFD",
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        />
                        <AvatarDrop />
                    </div>
                </Header>
                <Content
                    className=" mx-4 my-3 py-4 px-3 rounded-3 b-content"
                    style={{ backgroundColor: "#fff" }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}
export default LayoutPageMain;
