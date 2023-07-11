import { Modal, Button, Form, Input, Rate } from "antd";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import getCookie from "../../../cookie/getCookie";
const { TextArea } = Input;

function DetailReview(props) {
    const { type } = useSelector((state) => state.dataAdd);
    const { open, handleCreate, setOpen } = props;

    const handleSubmit = async (e) => {
        let obj = {
            studentId: JSON.parse(getCookie("user")).id,
            ...e,
        };
        console.log(obj);
        Swal.fire({
            title: "BẠN CÓ MUỐN LƯU THÔNG TIN?",
            confirmButtonText: "Lưu",
            showCancelButton: true,
            cancelButtonText: "Hủy",
            customClass: {
                title: "fs-5 text-dark",
                confirmButton: "bg-primary shadow-none",
                cancelButton: "bg-warning shadow-none",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                //CREATE
                {
                    handleCreate(obj);
                    setOpen(false);
                }
            }
        });
    };

    return (
        <>
            <Modal
                title={
                    <>
                        <div className="fs-4 fw-bold">Đánh giá trung tâm</div>
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
                width={600}
            >
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item label="Nội dúng đánh giá" name="description">
                        <TextArea
                            placeholder="Nhập ý kiến..."
                            autoSize={{
                                minRows: 4,
                                maxRows: 6,
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Mức độ hài lòng"
                        name="star"
                        rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                    >
                        <Rate allowHalf defaultValue={0} onChange={(e) => console.log(e)} />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit">{type.id ? "Lưu" : "Thêm"}</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default DetailReview;
