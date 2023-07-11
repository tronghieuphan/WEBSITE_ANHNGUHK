import Card from "react-bootstrap/Card";
import "./style.scss";

function CardCalender(props) {
    const { value } = props;

    return (
        <Card style={{ width: "100%" }}>
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
                </div>
            </div>
        </Card>
    );
}

export default CardCalender;
