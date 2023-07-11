import logo from "../../assets/image/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchool } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./style.scss";
function Footer() {
    return (
        <>
            <div className="d-flex justify-content-between px-5 footer-label-information tablet-footer-label">
                <div className="text-white p-3 tablet-labeb-title">
                    <FontAwesomeIcon icon={faSchool} className="px-3 fs-4 " />
                    <span className="fs-5">Xem thông tin chi tiết của trung tâm chúng tôi</span>
                </div>
                <div className="d-flex align-items-center table-footer-link">
                    <Link className="text-decoration-none" to="/about">
                        <div
                            className="px-4 py-2 text-light fw-bold border border-light rounded-pill fs-6"
                            style={{ backgroundColor: "#086EE8" }}
                        >
                            Xem chi tiết
                        </div>
                    </Link>
                </div>
            </div>

            <div
                style={{
                    background: "#F5FCFF",
                }}
                className="container-fluid text-dark pt-3"
            >
                <div className="row px-xl-5 pt-3">
                    <div className="col-lg-12 col-md-12 mb-3 pr-3 pr-xl-5 text-center">
                        <img src={logo} alt="" className=" rounded mx-auto d-block footer_logo" />
                        <p>-----</p>
                        <div style={{ fontWeight: "600" }}>
                            <p className="mb-2 font-weight-bold">Giảng viên hướng dẫn</p>
                            <p className="mb-4">ThS. </p>
                            <p className="mb-2 font-weight-bold">Sinh viên thực hiện:</p>
                            <p className="mb-2">Phan Trọng Hiếu - DH51903591</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div
                    style={{ background: "#005BC9 ", fontWeight: "600" }}
                    className=" text-white p-3 text-center "
                >
                    <div className="text-footerm-bottom">
                        ©2023 Tên dự án : WEBSITE TRUNG TÂM ANH NGỮ HK - Đồ án: LUẬN VĂN TỐT NGHIỆP{" "}
                        <br />
                        Trường Đại Học Công Nghệ Sài Gòn - Số điện thoại:0829 333 808 - Email:
                        phantronghieu.16613@gmail.com <br />
                        Người quản lý nội dung: Phan Trọng Hiếu
                    </div>
                </div>
            </div>
        </>
    );
}
export default Footer;
