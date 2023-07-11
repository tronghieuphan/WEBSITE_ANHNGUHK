import { Modal, Button, Form, Input } from "antd";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";
function DetailWeekday(props) {
    const { weekday } = useSelector((state) => state.dataAdd);
    const { open, handleCreate, handleUpdate, setOpen } = props;
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            id: weekday.id,
            nameWeekday: weekday.nameWeekday,
        });
    }, [weekday]);
    const handleSubmit = (e) => {
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
                //UPDATE
                if (weekday.id) {
                    handleUpdate(e);
                }
                //CREATE
                else {
                    handleCreate(e);
                    form.resetFields();

                }
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
                width={600}
            >
                <Form layout="vertical" onFinish={handleSubmit} form={form}>
                <Form.Item label="Mã thứ" name="id" hidden={weekday.id ? false : true}>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Tên thứ"
                        name="nameWeekday"
                        rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit">{weekday.id ? "Lưu" : "Thêm"}</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default DetailWeekday;
