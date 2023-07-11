import { Modal, Button, Table } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import * as htmlToImage from "html-to-image";

import "./style.scss";
import handleDatetime from "../../../utils/dateTime";
import { VND } from "../../../utils/formatVND";
import userAPI from "../../../services/userAPI";
import registrationAPI from "../../../services/registrationAPI";
function DetailRegPrint(props) {
    const { registration } = useSelector((state) => state.dataAdd);
    const { open1, setOpen1, regis } = props;
    const [staffRegis, setStaffRegis] = useState();
    const [staffPayMent, setStaffPayMent] = useState();
    const ref = useRef();
    var node = document.getElementById("regis");

    const sendMail = async (obj) => {
        const data = await registrationAPI.sendMail(obj);
        if (data.data.message == "Send Successfully") {
            Swal.fire({
                icon: "success",
                title: "Vui lòng kiểm tra Email !",
                showConfirmButton: false,
                timer: 1000,
                customClass: {
                    title: "fs-5 text-success",
                },
            });
        }
    };
    const handlExportHTMLtoImage = () => {
        htmlToImage
            .toPng(node)
            .then(function (dataUrl) {
                let obj = {
                    email: regis?.studentId,
                    image: dataUrl,
                };
                sendMail(obj);
            })
            .catch(function (error) {
                console.error("oops, something went wrong!", error);
            });
    };

    const handlePrint = useReactToPrint({
        content: () => ref.current,
        documentTitle: "emp-data",
        onafterprint: () => alert("Print Success"),
    });
    let price = 0;
    let amount = 0;
    let discount = 0;

    regis?.courses?.forEach((item, index) => {
        amount += item.detailRegistration.amountCourse;
        price += item.price;
        discount += item.detailRegistration.priceDiscount;
    });

    const findStaff = async () => {
        if (regis) {
            let res = await userAPI.findById({ id: regis.staffRegis });
            setStaffRegis(res.data.data);
            let payment = await userAPI.findById({ id: regis.staffPayment });
            setStaffPayMent(payment.data.data);
        }
    };

    useEffect(() => {
        findStaff();
    }, [regis]);
    return (
        <>
            <Modal
                title={
                    <>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="fs-4 fw-bold">Thông tin chi tiết phiếu đăng ký</div>
                            <div style={{ margin: "0px 20px" }}>
                                <Button className="bg-light mx-2" onClick={handlExportHTMLtoImage}>
                                    <FontAwesomeIcon
                                        icon={faEnvelopeOpenText}
                                        className="text-dark"
                                    />
                                </Button>
                                <Button className="bg-light" onClick={handlePrint}>
                                    <FontAwesomeIcon icon={faPrint} className="text-dark" />
                                </Button>
                            </div>
                        </div>
                        <hr />
                    </>
                }
                centered
                open={open1}
                okButtonProps={{
                    style: {
                        display: "none",
                    },
                }}
                cancelButtonProps={{
                    style: {
                        visibility: "hidden",
                    },
                }}
                onCancel={() => setOpen1(false)}
                width={1000}
                confirmLoading={true}
            >
                <div className="box-regis" id="regis">
                    <div ref={ref} className="content" style={{ width: "100%", height: "100%" }}>
                        <div className="d-flex w-100 align-items-center">
                            <img
                                src="https://res.cloudinary.com/dt2bxtoc3/image/upload/v1685297009/img-web/logo_rba9o7.png"
                                alt=""
                                className="ml-2"
                                style={{ width: "150px", height: "70px" }}
                            />
                            <div className="label-regis w-75">
                                <div>TRUNG TÂM ANH NGỮ HKEDU</div>
                                <div>Chương trình tiếng anh chuẩn quốc tế</div>
                                <div>180 Cao Lỗ, phường 4, quận 8, TP Hồ Chí Minh</div>
                            </div>
                            <div className="text-end fst-italic">MAPDK:{regis?.id}</div>
                        </div>
                        <div className="my-4 fw-bold fs-4 text-center"> PHIẾU ĐĂNG KÝ KHÓA HỌC</div>
                        <div className="title-customer">THÔNG TIN KHÁCH HÀNG</div>
                        <div className="info row w-100">
                            <div className="col-md-4">
                                <div>
                                    Họ tên:
                                    <span>
                                        {regis?.user.firstName + " " + regis?.user.lastName}
                                    </span>
                                </div>
                                <div>
                                    Số điện thoại:<span>{regis?.user.phone}</span>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div>
                                    Ngày sinh:<span>{regis?.user.dateBirth}</span>
                                </div>
                                <div>
                                    Email:
                                    <span style={{ textTransform: "none" }}>
                                        {regis?.user.email}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div>
                                    Giời tính:<span>{regis?.user.gender ? "Nữ" : "Nam"}</span>
                                </div>
                                <div>
                                    Nơi làm việc:<span>{regis?.user.workPlace}</span>
                                </div>
                            </div>
                        </div>
                        <div className="title-customer">THÔNG TIN KHÓA HỌC</div>
                        <table border={1} className="table">
                            <tr>
                                <th>STT</th>
                                <th>Tên KH</th>
                                <th>Học phí</th>
                                <th>Số lượng</th>
                                <th>Ưu đãi</th>
                                <th>Thành tiền</th>
                            </tr>
                            {regis?.courses.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.nameCourse}</td>
                                    <td>{VND.format(item.price)}</td>
                                    <td>{item.detailRegistration.quantity}</td>
                                    <td>{VND.format(item.detailRegistration.priceDiscount)}</td>
                                    <td>{VND.format(item.detailRegistration.amountCourse)}</td>
                                </tr>
                            ))}

                            <tr>
                                <td colSpan="5" style={{ padding: "5px", fontStyle: "italic" }}>
                                    TỔNG TIỀN
                                </td>
                                <td style={{ fontStyle: "italic" }}>{VND.format(amount)}</td>
                            </tr>
                        </table>
                        <div style={{ color: "#015FF1", fontWeight: "bold" }}>
                            THÔNG TIN HỌC PHÍ (*):
                        </div>
                        <div className="info">
                            <div className="row ">
                                <div className="col-md-5 fst-italic">
                                    Tổng số khóa học đăng ký:<span> {regis?.courses.length}</span>
                                    <br />
                                    Tổng tiền gốc:<span> {VND.format(price)}</span>
                                    <br />
                                    Tổng tiền ưu đãi:<span> {VND.format(discount)}</span>
                                    <br />
                                    Tổng tiền cần thanh toán:
                                    <span className="fs-6"> {VND.format(amount)}</span>
                                </div>
                                <div className="col-md-3">
                                    Hình thức thanh toán:
                                    <br />
                                    <span>
                                        {regis?.method === "0"
                                            ? "THANH TOÁN TIỀN MẶT"
                                            : "CHUYỂN KHOẢN"}
                                    </span>
                                </div>

                                <div className="col-md-4 text-center">
                                    Thời gian thanh toán:
                                    <br />
                                    <span>
                                        {regis?.paymentDate
                                            ? handleDatetime(regis?.paymentDate)
                                            : "CHƯA THANH TOÁN"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            ...................................................
                        </div>
                        <div>
                            <br />
                            <div className="d-flex mx-2 justify-content-between text-center">
                                <div>
                                    <p className="m-0 fw-bold">Nhân viên lập phiếu</p>
                                    <div className="fst-italic">(Ký, họ tên)</div>
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <div className="fw-bold">
                                        {staffRegis?.firstName + " " + staffRegis?.lastName}
                                    </div>
                                </div>
                                <div>
                                    <p className="m-0 fw-bold">Học viên</p>
                                    <div className="fst-italic">(Ký, họ tên)</div>
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <div className="fw-bold">
                                        {regis?.user.firstName + " " + regis?.user.lastName}
                                    </div>
                                </div>
                                <div>
                                    <p className="m-0 fw-bold">Nhân viên thanh toán</p>
                                    <div className="fst-italic">(Ký, họ tên)</div>
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <div className="fw-bold">
                                        {staffPayMent
                                            ? staffPayMent?.firstName + " " + staffPayMent?.lastName
                                            : ""}
                                    </div>
                                </div>{" "}
                                <div>
                                    <p className="m-0 fw-bold">Giám đốc</p>
                                    <div className="fst-italic">(Đóng dấu)</div>
                                    <img
                                        src="https://res.cloudinary.com/dt2bxtoc3/image/upload/v1685789747/img-web/HK_Edu_150_100_px_300_200_px_1680_1050_px_likxhc.png"
                                        alt=""
                                        style={{ width: "100px" }}
                                    />
                                    <div className="fw-bold">HK EDU</div>
                                </div>
                            </div>
                            <br />
                            <br />
                            <br />

                            <div className="fst-italic" style={{ fontSize: "12px" }}>
                                Ngày lập phiếu ĐK: <span>{handleDatetime(regis?.regisDate)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default DetailRegPrint;
