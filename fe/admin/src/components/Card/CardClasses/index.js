import Card from "react-bootstrap/Card";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./style.scss";

function CardClasses(props) {
    const { value, setIdClasses } = props;

    const navigate = useNavigate();
    const handleClick = () => {
        setIdClasses(value.id);
        navigate(`/listpointclass/${value.id}`);
    };
    return (
        <Card style={{ width: "12rem" }} className="m-3">
            <div className=" box-classes">
                <div className="p-2 content">
                    <h5 className="text-center" style={{ minHeight: "120px" }}>
                        {value.nameClasses}{" "}
                    </h5>
                    <div>
                        Thứ: <span>{value.weekdayId + ","}</span>
                    </div>
                    <div>
                        Ngày BĐ: <span>{value.startDate}</span>
                    </div>
                    <div>
                        Ngày KT: <span>{value.endDate}</span>
                    </div>
                    <div>
                        Thời gian:
                        <br /> <span>{value.startHour} </span>-<span> {value.endHour}</span>
                    </div>
                    <div>
                        <Button onClick={handleClick}> Xem danh sách </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default CardClasses;
