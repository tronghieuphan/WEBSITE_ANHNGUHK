import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Rate } from "antd";
import "./style.scss";
import { Link } from "react-router-dom";
import getCookie from "../../../cookie/getCookie";

function CardDocument(props) {
    const { data } = props;
    const user = getCookie("user") ? JSON.parse(getCookie("user")) : null;

    return (
        <>
            <div className="py-3 box-card-document">
                <Card
                    style={{ border: "none" }}
                    className="card-document p-3 rounded-3 m-auto width"
                >
                    <div className="d-flex width-1">
                        <img src={data.image} className="d-block m-auto size-img-document" />
                        <Card.Body>
                            <div
                                className="text-start title-name-document "
                                style={{ color: "#044DAE" }}
                            >
                                {data.nameDocument}
                            </div>
                            <div className="content-document-size">
                                <div>
                                    <span className="label-line">Level:</span>
                                    <span className="tilte-level">{data.level}</span>
                                </div>

                                <div>
                                    <span className="label-line"> Độ sát đề </span>
                                    <Rate disabled defaultValue={data.similarTopic} />
                                </div>
                                <div>
                                    <span className="label-line">Nhà sản xuất:</span>
                                    <span className="tilte-level">{data.author}</span>
                                </div>
                            </div>
                            <Link
                                to={`${data.file}`}
                                download
                                className="text-decoration-none btn-down"
                            >
                                <Link
                                    to={`/document/detail/${data.typeId}/${data.nameDocument}`}
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button variant="outline-primary" className="d-block m-auto ">
                                        Download
                                    </Button>
                                </Link>
                            </Link>
                        </Card.Body>
                    </div>
                </Card>
            </div>
        </>
    );
}

export default CardDocument;
