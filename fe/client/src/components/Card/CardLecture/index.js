import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./style.scss";
function CardLecture(props) {
    let data = props.data;
    return (
        <>
            <Card className="card-lecture rounded-3 w-75">
                <Card.Img
                    variant="top"
                    src={data.img}
                    // style={{ width: "18rem", height: "100%" }}
                    className="d-block m-auto"
                />
                <div className="des-lecture">
                    <span className="career-lecture">{data.lecture}</span><br />
                    <span className="title-lecture">{data.name}</span><br />
                    <span className="des-detail-lecture">{data.description}</span>
                </div>
            </Card>
        </>
    );
}

export default CardLecture;
