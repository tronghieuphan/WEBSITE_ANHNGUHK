import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./style.scss";
import { useNavigate } from "react-router-dom";
function CardCourse(props) {
    const { data } = props;
    const navigate = useNavigate();
    return (
        <>
            <Card style={{ width: "24rem", border: "none" }} className="card-course py-3 m-5 rounded-3 ">
                <Card.Img
                    variant="top"
                    src={data.image}
                    style={{ width: "150px" }}
                    className="d-block m-auto"
                />
                <Card.Body>
                    <Card.Title className="text-center fw-bold fs-4 title-center" style={{ color: "#044DAE" }}>
                        {data.nameType}
                    </Card.Title>
                    <Card.Text className="text-center" style={{ color: "#7B7E81" }}>
                        {data.description}
                    </Card.Text>
                    <Button
                        variant="outline-primary"
                        className="d-block m-auto"
                        onClick={() => {
                            navigate(`/course/${data.id}`);
                        }}
                    >
                        Tìm hiểu
                    </Button>
                </Card.Body>
            </Card>
        </>
    );
}

export default CardCourse;
