import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../../assets/image/logoheader.png";
import logofix from "../../assets/image/logo.png";

import { useState } from "react";

import { NavLink } from "react-router-dom";
import "./style.scss";
function NavbarMenu() {
    const [fix, setFix] = useState(false);
    function setFixed() {
        if (window.pageYOffset >= 32.503883361816406) {
            setFix(true);
        } else {
            setFix(false);
        }
    }
    console.log(window.pageYOffset);
    window.addEventListener("scroll", setFixed);

    return (
        <>
            <div style={{ width: "100%" }}>
                <div className={fix ? "nav-fixed" : "nav-header"}>
                    <Navbar  expand="xl">
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
                                        Offcanvas
                                    </Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <Nav className="justify-content-end flex-grow-1 pe-3 nav-menu">
                                        <Nav.Link href="#action1">Khóa học</Nav.Link>
                                        <Nav.Link href="#action2">Thời khóa biểu</Nav.Link>
                                        <Nav.Link href="#action3">Tài liệu</Nav.Link>
                                        <Nav.Link href="#action4">Tin tức</Nav.Link>
                                        <NavLink to="/">
                                            <button>Đăng nhập</button>
                                        </NavLink>
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
