import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./style.scss";
function CardCourse(props) {
    let data = props.data;
    console.log(data);
    return (
        <>
            <Card style={{ width: "24rem", border: "none" }} className="card-course py-4 px-3 rounded-3">
                <Card.Img
                    variant="top"
                    src={data.img}
                    style={{ width: "150px" }}
                    className="d-block m-auto"
                />
                <Card.Body>
                    <Card.Title className="text-center fw-bold fs-4" style={{ color: "#044DAE" }}>
                        {data.name}
                    </Card.Title>
                    <Card.Text className="text-center" style={{ color: "#7B7E81" }}>
                        {data.description}
                    </Card.Text>
                    <Button variant="outline-primary" className="d-block m-auto">
                        Tìm hiểu
                    </Button>
                </Card.Body>
            </Card>
        </>
    );
}

export default CardCourse;
