import Card from "react-bootstrap/Card";
import { Button } from "antd";
import "./style.scss";

function CardClassesMove(props) {
    const { classesActive, handleMove } = props;

    const handleMoveStudent = () => {
        handleMove(classesActive);
    };
    return (
        <Card style={{ width: "12rem" }} className="m-3">
            <div className=" box-classes">
                <div className="p-2 content">
                    <h5 className="text-center" style={{ minHeight: "120px" }}>
                        {classesActive?.nameClasses}{" "}
                    </h5>
                    <div>
                        Thứ: <span>{classesActive?.weekdayId + ","}</span>
                    </div>
                    <div>
                        Ngày BĐ: <span>{classesActive?.startDate}</span>
                    </div>
                    <div>
                        Ngày KT: <span>{classesActive?.endDate}</span>
                    </div>
                    <div>
                        Thời gian:
                        <br /> <span>{classesActive?.startHour} </span>-
                        <span> {classesActive?.endHour}</span>
                    </div>

                    <div>
                        Số lượng: <span>{classesActive?.quantity} </span>
                    </div>
                    <div>
                        Số lượng đã đăng ký: <span>{classesActive?.quantityRes} </span>
                    </div>

                    <div className="text-center ">
                        <Button type="primary" className="" onClick={handleMoveStudent}>
                            Chuyển lớp
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default CardClassesMove;
