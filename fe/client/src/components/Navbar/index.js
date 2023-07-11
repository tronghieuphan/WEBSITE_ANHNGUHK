import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../../assets/image/logoheader.png";
import logofix from "../../assets/image/logo.png";
import { Dropdown } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Avatar } from "antd";
import { useEffect } from "react";
import typeAPI from "../../services/typeAPI ";
import removeCookie from "../../cookie/removeCookie";
import getCookie from "../../cookie/getCookie";
import "./style.scss";
function NavbarMenu() {
    const navigate = useNavigate();
    const user = getCookie("user") ? JSON.parse(getCookie("user")) : null;
    const [fix, setFix] = useState(false);
    const [listType, setListType] = useState();
    function setFixed() {
        if (window.pageYOffset >= 32.503883361816406) {
            setFix(true);
        } else {
            setFix(false);
        }
    }
    window.addEventListener("scroll", setFixed);

    const getAllType = async () => {
        try {
            const response = await typeAPI.getAll();
            setListType(response.data.data);
        } catch (err) {
            throw new Error(err);
        }
    };
    useEffect(() => {
        getAllType();
    }, []);
    let items = [];
    listType?.map((item) => items.push({ key: item.id, label: item.nameType }));

    const dr_user = [
        {
            key: "1",
            label: "Profile",
        },
        {
            key: "2",
            label: "Logout",
        },
    ];
    const handleClick = (key) => {
        navigate(`/course/${key.key}`);
    };
    const onClick = ({ key }) => {
        if (key === "1") {
            navigate("/profile");
        } else if (key === "2") {
            navigate("/");
            removeCookie("user");
        }
    };
    return (
        <>
            <div style={{ width: "100%" }}>
                <div className={fix ? "nav-fixed" : "nav-header"}>
                    <Navbar expand="xl">
                        <Container fluid>
                            <Navbar.Brand href="#">
                                {fix ? (
                                    <img src={logofix} alt="" className="img-navbar-fix" />
                                ) : (
                                    <img src={logo} alt="" className="img-navbar" />
                                )}
                            </Navbar.Brand>
                            <Navbar.Toggle
                                aria-controls="offcanvasNavbar-expand-xl"
                                className="text-center"
                            />
                            <Navbar.Offcanvas
                                id="offcanvasNavbar-expand-xl"
                                aria-labelledby="offcanvasNavbarLabel-expand-xl"
                                placement="end"
                            >
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title id="offcanvasNavbarLabel-expand-xl">
                                        <Link to="/">
                                            <div className="p-3 d-flex justify-content-center ">
                                                <img
                                                    src="https://res.cloudinary.com/dt2bxtoc3/image/upload/v1685297009/img-web/logo_rba9o7.png"
                                                    alt=""
                                                    className="img-menu d-block m-auto"
                                                />
                                            </div>
                                        </Link>
                                    </Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <Nav className="justify-content-end flex-grow-1 pe-3 nav-menu text-center">
                                        <Dropdown
                                            arrow
                                            autoAdjustOverflow
                                            menu={{
                                                items: items,
                                                onClick: handleClick,
                                            }}
                                            placement="bottom"
                                            className="text-center"
                                        >
                                            <Link onClick={(e) => console.log(e)}>Khóa học</Link>
                                        </Dropdown>
                                        <Link to="/review">Review & Nổi bật</Link>
                                        <Link to="/document">Góc tài liệu</Link>
                                        <Link to="/about">Về chúng tôi</Link>
                                        {user?.id ? (
                                            <div className="btnlogin">
                                                <Dropdown
                                                    arrow
                                                    autoAdjustOverflow
                                                    menu={{
                                                        items: dr_user,
                                                        onClick,
                                                    }}
                                                    placement="bottom"
                                                >
                                                    {user?.image ? (
                                                        <Avatar
                                                            className="border"
                                                            size="large"
                                                            src={user?.image}
                                                        />
                                                    ) : (
                                                        <Avatar
                                                            size="large"
                                                            className="fs-4 fw-bold"
                                                        >
                                                            {user?.lastName}
                                                        </Avatar>
                                                    )}
                                                </Dropdown>
                                            </div>
                                        ) : (
                                            <Link to="/login">
                                                <button>Đăng nhập</button>
                                            </Link>
                                        )}
                                    </Nav>
                                </Offcanvas.Body>
                            </Navbar.Offcanvas>
                        </Container>
                    </Navbar>
                </div>
            </div>
        </>
    );
}
export default NavbarMenu;
