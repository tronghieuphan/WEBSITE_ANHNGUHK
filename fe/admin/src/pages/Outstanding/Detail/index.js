import { Modal, Button, Select, Form, Input } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiImage } from "react-icons/fi";

import convertBase64Img from "../../../utils/convertBase64Img";
import userAPI from "../../../services/userAPI";
import typeAPI from "../../../services/typeAPI ";
function DetailOutstanding(props) {
    const { outstanding } = useSelector((state) => state.dataAdd);
    const { open, handleCreate, handleUpdate, setOpen } = props;
    const [form] = Form.useForm();
    const [imageUpload, setImage] = useState();
    const [listStudent, setListStudent] = useState([]);
    const [listType, setListType] = useState([]);
    //GET API
    const getAllStudent = async () => {
        try {
            const data = await userAPI.getAllTypeUser({ typeUser: "1" });
            setListStudent(data.data.data);
        } catch (err) {
            throw new Error(err);
        }
    };
    const getAllType = async () => {
        try {
            const data = await typeAPI.getAll();
            setListType(data.data.data);
        } catch (err) {
            throw new Error(err);
        }
    };
    useEffect(() => {
        form.setFieldsValue({
            id: outstanding.id,
            point: outstanding.point,
            studentId: outstanding.userId,
            typeId: outstanding.typeId,
            image: outstanding.image,
        });
    }, [outstanding]);
    useEffect(() => {
        getAllStudent();
        getAllType();
    }, []);
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImage(e.target.files[0]);
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        console.log("search:", value);
    };
    const handleSubmit = async (e) => {
        let obj = {
            ...e,
            image: await convertBase64Img(imageUpload),
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
                if (outstanding.id) {
                    handleUpdate(obj);
                }
                //CREATE
                else {
                    handleCreate(obj);
                    form.resetFields();
                    setImage();
                }
            }
        });
    };
    let Student = [];
    let Type = [];

    listStudent?.map((values, index) =>
        Student.push({ id: values.id, name: values.firstName + " " + values.lastName })
    );
    listType?.map((values, index) => Type.push({ id: values.id, name: values.nameType }));
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
                <Form layout="vertical" onFinish={handleSubmit} form={form}>
                    <Form.Item label="Mã nổi bật" name="id" hidden={outstanding.id ? false : true}>
                        <Input disabled />
                    </Form.Item>{" "}
                    <div className="row">
                        <Form.Item
                            label="Điểm"
                            className="col-md-4"
                            name="point"
                            rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mã học viên"
                            name="studentId"
                            className="col-md-4"

                            // rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                        >
                            <Select
                                showSearch
                                placeholder="Chọn học viên"
                                optionFilterProp="children"
                                onChange={handleChange}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                                options={Student.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Mã loại"
                            name="typeId"
                            className="col-md-4"

                            // rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                        >
                            <Select
                                showSearch
                                placeholder="Chọn loại"
                                optionFilterProp="children"
                                onChange={handleChange}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                                options={Type.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                }))}
                            />
                        </Form.Item>
                    </div>
                    <Form.Item label="Hình ảnh" name="image" className="img">
                        <div className="box-img d-flex justify-content-center align-items-center rounded-3 ">
                            {(imageUpload || outstanding?.id) && (
                                <img
                                    src={imageUpload?.preview || outstanding?.image}
                                    alt=""
                                    name="image"
                                    className="img-preview"
                                />
                            )}
                            {imageUpload || outstanding?.id ? (
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
                        <Button htmlType="submit">{outstanding.id ? "Lưu" : "Thêm"}</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default DetailOutstanding;
