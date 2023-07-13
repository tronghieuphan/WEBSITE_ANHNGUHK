import { Modal, Button, Select, Form, Input } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const { TextArea } = Input;

function DetailConsult(props) {
    const { consult } = useSelector((state) => state.dataAdd);
    const { open, handleUpdate, setOpen } = props;
    const [value, setValue] = useState("");
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            id: consult.id,
            note: consult.note,
            pointTest: consult.pointTest,
            level: consult.level,
        });
    }, [consult]);
    const handleSubmit = async (e) => {
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
                handleUpdate(e);
            }
        });
    };
    return (
        <>
            <Modal
                title={
                    <>
                        <div className="fs-4 fw-bold">Thông tin chi tiết</div>
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
                width={800}
                className="px-3"
            >
                <Form onFinish={handleSubmit} layout="vertical" form={form}>
                    <Form.Item label="Ghi chú thông tin" name="note">
                        <TextArea
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Nhập thông tin"
                            autoSize={{
                                minRows: 3,
                                maxRows: 5,
                            }}
                        />
                    </Form.Item>
                    <div className="row">
                        <Form.Item label="Mã tư vấn" name="id" hidden={true}>
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label="Điểm bài test" name="pointTest" className="col-md-6">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Đánh giá" name="level" className="col-md-6">
                            <Input />
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <Button htmlType="submit" className="d-block m-auto">
                            Lưu thông tin
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default DetailConsult;
