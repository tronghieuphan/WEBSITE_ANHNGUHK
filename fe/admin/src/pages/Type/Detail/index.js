import { Modal, Button, Form, Input } from "antd";
import { useSelector } from "react-redux";
import { FiImage } from "react-icons/fi";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import convertBase64Img from "../../../utils/convertBase64Img";
import "./style.scss";
const { TextArea } = Input;

function DetailTypez(props) {
    const { type } = useSelector((state) => state.dataAdd);
    const { open, handleCreate, handleUpdate, setOpen } = props;
    const [imageUpload, setImage] = useState();

    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            id: type.id,
            nameType: type.nameType,
            description: type.description,
            image: type.image,
        });
    }, [type]);
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        let obj = {};
        if (!document.id) {
            obj = {
                ...e,
                image: await convertBase64Img(imageUpload),
            };
        } else {
            obj = e;
        }
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
                if (type.id) {
                    handleUpdate(obj);
                }
                //CREATE
                else {
                    handleCreate(obj);
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
                    <Form.Item label="Mã loại khóa học" name="id" hidden={type.id ? false : true}>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Tên loại khóa học"
                        name="nameType"
                        rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Mô tả loại khóa học" name="description">
                        <TextArea
                            placeholder="Nhập thông tin..."
                            autoSize={{
                                minRows: 4,
                                maxRows: 6,
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="Hình ảnh" name="image" className="img">
                        <div className="box-img d-flex justify-content-center align-items-center rounded-3 ">
                            {(imageUpload || document?.id) && (
                                <img
                                    src={imageUpload?.preview || document?.image}
                                    alt=""
                                    name="image"
                                    className="img-preview"
                                />
                            )}
                            {imageUpload || document?.id ? (
                                ""
                            ) : (
                                <>
                                    <div className="fs-2 text-image">
                                        <FiImage className="mx-2" />
                                        <span className="fw-bold">Chọn ảnh</span>
                                    </div>{" "}
                                </>
                            )}
                            <Input
                                type="file"
                                placeholder="Chọn hình ảnh"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e)}
                            />
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit">{type.id ? "Lưu" : "Thêm"}</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default DetailTypez;
