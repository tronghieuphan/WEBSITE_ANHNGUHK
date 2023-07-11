import { FcFlashOn } from "react-icons/fc";
import { FaBookReader } from "react-icons/fa";
import lectureimg from "../../../assets/image/lecture.png";
import { Rate } from "antd";
import TitlePage from "../../../components/TitlePage";
import Button from "react-bootstrap/Button";
import Iframe from "react-iframe";
import SliderDoccument from "../../../components/Slide/SlideDocument";
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import documentAPI from "../../../services/documentAPI";
import getCookie from "../../../cookie/getCookie";
import Swal from "sweetalert2";
import setCookie from "../../../cookie/setCookie";
function DetailDocument() {
    const { nameDocumentID, idType } = useParams();
    const [detailDocument, setDetailDocument] = useState({});
    const [preview, setPreview] = useState();
    const [listDocType, setListDocType] = useState([]);

    let a = preview?.replace("view?usp=drivesdk", "preview");
    const navigate = useNavigate();

    const user = getCookie("user") ? JSON.parse(getCookie("user")) : null;
    const tilte = {
        label: "THÔNG TIN CHI TIẾT",
        style: "TÀI LIỆU",
        img: lectureimg,
    };
    const increase = async () => {
        console.log(123);
        let a = await documentAPI.increase({ nameDocument: nameDocumentID });
    };
    const handLoad = () => {
        if (user === null) {
            Swal.fire({
                title: "Bạn vui lòng đăng nhập để được tải sách",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Tôi đồng ý !",
                customClass: {
                    title: "fs-5 text-info",
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    let obj = {
                        code: "downloaddocument",
                        nameDocument: nameDocumentID,
                    };
                    navigate("/login");
                    setCookie("document", JSON.stringify(obj));
                }
            });
        }
    };
    const findDocument = async () => {
        let data = await documentAPI.findName({ datafind: nameDocumentID });
        setDetailDocument(data.data.dataone);
        setPreview(data.data.dataone.fileview);
    };
    let getDocumentByType = async () => {
        const data = await documentAPI.findAllDocumentByType({ datafind: idType });
        setListDocType(data.data.data);
    };
    useEffect(() => {
        findDocument();
        getDocumentByType();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    return (
        <>
            <TitlePage data={tilte} />
            <div className="container-fluid w-100 tablet-layout-detail-document">
                <div className="row mx-5">
                    <div className="col-md-5 ml-5 w-auto mx-auto ">
                        <div className=" mt-5 ">
                            <img src={detailDocument?.image} alt="" className="imgdocument" />
                        </div>
                    </div>
                    <div className="col-md-7 ml-5 tablet-content-infor">
                        <div className=" mt-5 line">
                            <p className="fs-4 fw-bold line-title">
                                {detailDocument?.nameDocument}
                            </p>
                            <p>
                                <span>Level: </span>
                                <span className="fw-bold"> {detailDocument?.level}+ </span>
                            </p>
                            <p>
                                <span>Ngày phát hành: </span>
                                <span className="fw-bold"> {detailDocument?.releaseDate} </span>
                            </p>
                            {/* <p>
                                <span> Độ sát đề: </span>

                                <Rate disabled defaultValue={detailDocument.similarTopic} />
                            </p> */}
                            <p>
                                <span> Danh mục: </span>
                                <span className="fw-bold">
                                    Luyện thi {detailDocument?.type?.nameType}
                                </span>
                            </p>
                            <p>
                                <span> Tác giả: </span>
                                <span className="fw-bold"> {detailDocument?.author}</span>
                            </p>
                            <p>
                                <span> Đã có: </span>
                                <span
                                    className="fst-italic"
                                    style={{
                                        fontStyle: "italic",
                                        fontSize: "14px",
                                    }}
                                >
                                    {detailDocument?.download} lượt tải về
                                </span>
                            </p>
                            {user !== null ? (
                                <a
                                    href={detailDocument?.filepdf}
                                    download={true}
                                    className="text-decoration-none"
                                >
                                    <Button
                                        variant="primary"
                                        className="d-block m-auto"
                                        onClick={increase}
                                    >
                                        DOWNLOAD
                                    </Button>
                                </a>
                            ) : (
                                <Button
                                    variant="primary"
                                    className="d-block m-auto"
                                    onClick={handLoad}
                                >
                                    DOWNLOAD
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
                <div style={{ margin: "8% 10% 5% 10%", border: "1px solid #dfdfdf" }}>
                    <div className=" fw-bold fs-5 information text-light">Thông tin sách</div>
                    <div
                        style={{ margin: " 50px", marginTop: "20px" }}
                        dangerouslySetInnerHTML={{
                            __html: detailDocument?.description,
                        }}
                    ></div>
                </div>
                <div className="m-4">
                    <p className="fw-bold fs-5 d-flex align-items-center justify-content-center ">
                        <FaBookReader />
                        &nbsp; PREVIEW
                    </p>
                    <Iframe src={a} className="m-auto file" display="block" position="relative" />
                </div>
                <p className="text-left m-3 fw-bold fs-5">
                    <FcFlashOn /> SÁCH CÙNG CHUYÊN MỤC <FcFlashOn />
                </p>
                <div
                    style={{ backgroundColor: "#E5EEFF", borderRadius: "20px", width: "95%" }}
                    className="m-auto"
                >
                    <SliderDoccument listDocType={listDocType} />
                </div>
            </div>
            <br />
            <br />
            <br />
        </>
    );
}

export default DetailDocument;
