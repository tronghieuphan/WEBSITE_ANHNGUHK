import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    TiHomeOutline,
    TiDocumentText,
    TiThLargeOutline,
    TiMessage,
    TiGroupOutline,
} from "react-icons/ti";
import { BiTimeFive, BiBook, BiStar, BiUser } from "react-icons/bi";
import logo from "../../assets/image/logo.png";
import "./style.scss";
import typeAPI from "../../services/typeAPI ";
function Menubar() {
    const [click, setClick] = useState(false);
    const [listType, setValueType] = useState([]);
    console.log("listType: ", listType);
    const clickMenu = () => {
        setClick(!click);
    };
    let tick = [
        { icon: <TiDocumentText style={{ width: "50px" }} size={20} /> },
        { icon: <TiThLargeOutline style={{ width: "50px" }} size={20} /> },
        { icon: <TiMessage style={{ width: "50px" }} size={20} /> },
    ];
    const getAllType = async () => {
        const data = await typeAPI.getAll();
        setValueType(data.data.data);
    };

    useEffect(() => {
        getAllType();
    }, []);
    return (
        <>
            <div className="box-border">
                <div className="d-flex box-menu">
                    <div className={click ? "menu-click " : "menu"}>
                        <div className="scoll">
                            <Link to="/">
                                <div className="p-3">
                                    <img src={logo} alt="" className="img-menu d-block m-auto" />
                                </div>
                            </Link>
                            <div className="menu-bar">
                                <ul>
                                    <li>
                                        <NavLink to="/" className="link-menu">
                                            <div className="d-flex align-items-center">
                                                <TiHomeOutline
                                                    style={{ width: "50px" }}
                                                    size={20}
                                                />
                                                <span>Trang chủ</span>
                                            </div>
                                        </NavLink>
                                    </li>

                                    {listType.map((item, index) => {
                                        return (
                                            <li key={item.id}>
                                                <NavLink
                                                    to={`/course/${item?.id}`}
                                                    className="link-menu"
                                                >
                                                    <div className="d-flex align-items-center">
                                                        {tick[index]?.icon}
                                                        <span>Chương trình {item?.nameType}</span>
                                                    </div>
                                                </NavLink>
                                            </li>
                                        );
                                    })}
                                    <li>
                                        <NavLink to="/review" className="link-menu">
                                            <div className="d-flex align-items-center">
                                                <BiStar style={{ width: "50px" }} size={20} />
                                                <span>Điểm & Review</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/lecture" className="link-menu">
                                            <div className="d-flex align-items-center">
                                                <TiGroupOutline
                                                    style={{ width: "50px" }}
                                                    size={20}
                                                />
                                                <span>Đội ngũ giảng viên</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/document" className="link-menu">
                                            <div className="d-flex align-items-center">
                                                <BiBook style={{ width: "50px" }} size={20} />
                                                <span>Góc học tập</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/about" className="link-menu">
                                            <div className="d-flex align-items-center">
                                                <BiUser style={{ width: "50px" }} size={20} />
                                                <span>Về chúng tôi</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                            <hr className="w-75 d-block m-auto" />
                            <p className="fw-bold p-3 text-center">
                                Quận 8 :
                                <a
                                    className="text-decoration-none fw-normal "
                                    href="https://goo.gl/maps/XnFD4tazY4oUT16E8"
                                    style={{ textDecoration: "none" }}
                                >
                                    180 Cao Lỗ, phường 4, quận 8, thành phố Hồ Chí Minh
                                </a>
                            </p>
                        </div>
                    </div>
                    <div
                        className={click ? "box-icon-click d-flex" : "box-icon d-flex"}
                        onClick={clickMenu}
                    >
                        <div className="icon">
                            <FontAwesomeIcon icon={faBars} color="white" />
                        </div>
                        <span className="fw-bold d-flex align-items-center px-2">Menu</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Menubar;
