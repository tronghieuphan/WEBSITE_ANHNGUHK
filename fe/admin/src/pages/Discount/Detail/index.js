import { Modal, Button, Form, Input, Empty } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
function DetailDiscount(props) {
    const { discount } = useSelector((state) => state.dataAdd);
    const { open, handleCreate, handleUpdate, setOpen } = props;
    const [valueEditor, setValueEditor] = useState();
    const [booleanDate, setBooleanDate] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [description, setDescription] = useState();

    const [form] = Form.useForm();
    useEffect(() => {
        setDescription(discount.description);
        form.setFieldsValue({
            id: discount.id,
            nameDiscount: discount.nameDiscount,
            percent: discount.percent,
            code: discount.code,
            startDate: discount.startDate,
            endDate: discount.endDate,
            description: discount.description,
            active: discount.active,
        });
    }, [discount]);

    const handleStartDate = (e) => {
        let start_Date = new Date(e.target.value).getTime();
        let date_Current = new Date().getTime();
        if (
            start_Date === date_Current ||
            start_Date < date_Current ||
            start_Date > endDate ||
            start_Date === endDate
        ) {
            Swal.fire({
                icon: "error",
                text: "Ngày bắt đầu không hợp lệ !",
            });
            setBooleanDate("NBDKHL");
            setStartDate();
            return;
        } else {
            setStartDate(start_Date);
            setBooleanDate("NBDHL");
            return;
        }
    };
    const handleEndDate = (e) => {
        let date_Current = new Date().getTime();
        let end_Date = new Date(e.target.value).getTime();
        if (
            end_Date === startDate ||
            end_Date < startDate ||
            end_Date === date_Current ||
            end_Date < date_Current
        ) {
            Swal.fire({
                icon: "error",
                text: "Ngày kết thúc không hợp lệ !",
            });
            setBooleanDate("NKTKHL");
            setEndDate();
            return;
        } else {
            setBooleanDate("NKTHL");
            setEndDate(end_Date);
            return;
        }
    };

    const handleSubmit = (e) => {
        if (startDate === undefined || endDate === undefined) {
            Swal.fire({
                icon: "error",
                text: "Hãy chọn ngày hợp lý!",
            });
        } else if (booleanDate === "NBDKHL") {
            Swal.fire({
                icon: "error",
                text: "Ngày bắt đầu không hợp lệ !",
            });
        } else if (booleanDate === "NKTKHL") {
            Swal.fire({
                icon: "error",
                text: "Ngày kết thúc không hợp lệ !",
            });
        } else {
            let obj = {
                ...e,
                description: valueEditor,
            };
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
                    if (discount.id) {
                        handleUpdate(obj);
                    }
                    //CREATE
                    else {
                        handleCreate(obj);
                        form.resetFields();

                    }
                }
            });
        }
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
                width={1000}
            >
                <Form layout="vertical" onFinish={handleSubmit} form={form} className="px-4">
                    <Form.Item label="Mã khuyến mãi" name="id" hidden={discount.id ? false : true}>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Tên khuyến mãi"
                        name="nameDiscount"
                        rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                    >
                        <Input />
                    </Form.Item>
                    <div className="row">
                        <Form.Item
                            label="Phần trăm"
                            name="percent"
                            className="col-md-3"
                            rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Code"
                            name="code"
                            className="col-md-3"
                            rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Ngày bắt đầu"
                            name="startDate"
                            className="col-md-3"
                            rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                        >
                            <Input type="date" onChange={(e) => handleStartDate(e)} />
                        </Form.Item>
                        <Form.Item
                            label="Ngày kết thúc"
                            name="endDate"
                            className="col-md-3"
                            rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                        >
                            <Input type="date" onChange={(e) => handleEndDate(e)} />
                        </Form.Item>
                    </div>
                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                    >
                        <CKEditor
                            editor={ClassicEditor}
                            data={description || ""}
                            onReady={(editor) => {
                                editor.editing.view.change((writer) => {
                                    writer.setStyle(
                                        "height",
                                        "200px",
                                        editor.editing.view.document.getRoot()
                                    );
                                });
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setValueEditor(data);
                            }}
                        />
                    </Form.Item>
                    <Form.Item className="text-center">
                        <Button htmlType="submit">{discount.id ? "Lưu" : "Thêm"}</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default DetailDiscount;
