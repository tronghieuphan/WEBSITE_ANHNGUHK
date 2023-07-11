import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { MdOutlineSchool } from "react-icons/md";
import { HiOutlineUserCircle } from "react-icons/hi";
import { Image } from "antd";
import "./style.scss";
function CardPointStudent(props) {
    const { data } = props;
    return (
        <Card
            style={{ width: "26rem", border: "none" }}
            className="card-point py-2 px-3 rounded-3 m-0 "
        >
            <div className="rounded-3 geeks">
                <Image style={{ width: "100%" }} variant="top" src={data?.image} />
                <Card.Body>
                    <div className="d-flex mt-2">
                        <div className="w-75 p-0">
                            <div style={{ color: "#1677FF", fontWeight: "bold" }}>
                                <HiOutlineUserCircle color="#1677FF" />{" "}
                                {data?.user?.firstName + " " + data?.user?.lastName}
                            </div>
                            <div>
                                <MdOutlineSchool /> {data?.user?.workPlace}
                            </div>
                        </div>
                        <div className="w-25 text-end">
                            <div style={{ color: "red", fontWeight: "bold" }}>{data?.point}</div>
                            <div style={{ fontSize: "15px" }}>{data?.type?.nameType}</div>
                        </div>
                    </div>
                </Card.Body>
            </div>
        </Card>
    );
}

export default CardPointStudent;
