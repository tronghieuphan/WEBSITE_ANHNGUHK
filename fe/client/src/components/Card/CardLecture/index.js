import Card from "react-bootstrap/Card";
import "./cardlecture_style.scss";
import { Modal } from "antd";
import { useState } from "react";
function CardLecture(props) {
    const { data } = props;
    const [open, setOpen] = useState(false);

    return (
        <>
            <Card
                className="card-lecture rounded-3 m-4"
                style={{ width: "15rem", height: "20rem" }}
                onClick={() => setOpen(true)}
            >
                <Card.Img
                    variant="top"
                    src={data?.image}
                    className="d-block m-auto geeks"
                    style={{ height: "100%" }}
                />
                <div className="des-lecture">
                    <span className="career-lecture">Giảng viên</span>
                    <br />
                    <span className="title-lecture">{data?.firstName + " " + data?.lastName}</span>
                    <br />
                    <span className="des-detail-lecture ">
                        <div className="des">
                            <div
                                style={{ color: "white" }}
                                dangerouslySetInnerHTML={{ __html: data?.description }}
                            ></div>
                        </div>
                    </span>
                </div>
            </Card>
            <Modal
                title={
                    <>
                        <div className="fs-4 fw-bold">Thông tin chi tiết giảng viên</div>
                        <hr />
                    </>
                }
                centered
                open={open}
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
                onCancel={() => setOpen(false)}
                width={1300}
            >
                <div>
                    <div className="row p-2">
                        <div className="col-md-4">
                            <img
                                src={data?.image}
                                className="d-block m-auto px-5 w-100 h-100 imgmodal"
                            />
                        </div>
                        <div
                            className="col-md-8 "
                            style={{
                                fontSize: "16px",
                                textAlign: "justify",
                                height: "fit-content",
                            }}
                        >
                            <div className="title-namelecture">
                                <div className="fs-5 fw-bold">Giáo viên</div>
                                <div className="fs-3 fw-bold">
                                    {data?.firstName + " " + data?.lastName}
                                </div>
                            </div>
                            <br />
                            <div className="title-namelecture">
                                <p className="text-danger fw-bold">Bằng cắp:</p>
                                <p>{data?.degree}</p>
                                <p>
                                    <span className="text-danger fw-bold">Kinh nghiệm:</span>
                                    <span>{data?.experience}</span>
                                </p>
                                <p>
                                    <span className="text-danger fw-bold">Chuyên các lớp:</span>
                                    <span>{data?.specialize}</span>
                                </p>
                                <p>
                                    <span
                                        className="text-decoration-none"
                                        dangerouslySetInnerHTML={{ __html: data?.description }}
                                    ></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default CardLecture;
