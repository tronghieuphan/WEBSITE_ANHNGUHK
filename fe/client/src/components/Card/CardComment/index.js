import { Avatar, Rate, Button, Modal } from "antd";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import "./style.scss";
function CardComment(props) {
    let data = props.data;
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };
    return (
        <>
            <Card className="py-4 px-3 rounded-4 d-block m-auto w-rem">
                <div className="mx-3">
                    <div className="row">
                        <div className="col-md-2 ">
                            <div className="d-flex justify-content-center align-items-center h-100">
                                <Avatar
                                    size={60}
                                    src={<img src={data?.user?.image} alt="avatar" />}
                                />
                            </div>
                        </div>
                        <div className="col-md-8 infor-comment">
                            <Rate allowHalf disabled defaultValue={data?.star} className="star" />

                            <div className="title-name">
                                {data?.user?.firstName + " " + data?.user?.lastName}
                            </div>
                            <div className="title-uni">{data?.user?.workPlace}</div>
                        </div>
                        <div className="col-md-2 btn-view">
                            
                            <Button className="text-end mt-2" onClick={showModal}>
                                Xem
                            </Button>
                        </div>
                    </div>
                    <div className="des">{data?.description}</div>{" "}
                   
                </div>

                <Modal
                    title={
                        <>
                            <div className="fs-5">Nội dung chi tiết</div>
                            <hr />
                        </>
                    }
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
                >
                    <p>{data.description}</p>
                </Modal>
            </Card>
        </>
    );
}

export default CardComment;
