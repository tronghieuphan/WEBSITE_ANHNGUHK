import { Modal, Button, Form, Input, Select } from "antd";
import { useState, useEffect } from "react";
import { FiImage } from "react-icons/fi";
import Swal from "sweetalert2";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useSelector } from "react-redux";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import addressAPI from "../../../services/addressAPI";
import "./style.scss";
import convertBase64Img from "../../../utils/convertBase64Img";
import { errorInfo } from "../../../components/Dialog/Dialog";
function Detail(props) {
    const { open, handleUpdate, setOpen } = props;
    const { user } = useSelector((state) => state.dataAdd);
    const [imageUser, setImageUser] = useState();
    //usestate
    const [city, listCity] = useState([]);
    const [district, listDistrict] = useState([]);
    const [ward, listWard] = useState([]);
    const [imageUpload, setImage] = useState();
    const [valueEditor, setValueEditor] = useState();
    const [typeUserDetail, setTypeUserDetail] = useState();
    const [description, setDiscription] = useState();
    const [dateBirth, setDateBirth] = useState(true);

    const [form] = Form.useForm();
    useEffect(() => {
        setDiscription(user.description);
        setTypeUserDetail(user.typeUser);
        form.setFieldsValue({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender ? "Nữ" : "Nam",
            phone: user.phone,
            dateBirth: user.dateBirth,
            email: user.email,
            street: user.street,
            ward: user.ward,
            district: user.district,
            city: user.city,
            workPlace: user.workPlace,
            position: user.position,
            degree: user.degree,
            image: user.image,
            experience: user.experience,
            specialize: user.specialize,
            description: user.description,
            typeUser: user.typeUser === "0" ? "Khách hàng thành viên" : user.typeUser,
            userName: user.userName,
            department: user.department,
        });
    }, [user]);
    useEffect(() => {
        setImageUser(user.image);
    }, [user]);
    //Xử lý hình ảnh
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        file.preview = URL?.createObjectURL(file);
        setImage(e.target.files[0]);
    };

    //Lây API Thành phố
    const getAllCity = async () => {
        try {
            const response = await addressAPI.getAll_Province();
            listCity(response.data);
        } catch (err) {
            throw new Error(err);
        }
    };
    //Lây API Quan
    const getAllDistrict = async (code) => {
        try {
            const response = await addressAPI.getAll_District(code);
            listDistrict(response.data.districts);
        } catch (err) {
            throw new Error(err);
        }
    };
    //Lây API Thành phố
    const getAllWard = async (e) => {
        try {
            const response = await addressAPI.getAll_Ward(e);
            listWard(response.data.wards);
        } catch (err) {
            throw new Error(err);
        }
    };
    const handleDateBirth = (e) => {
        let date = new Date().getTime();
        let dateBirthPick = new Date(e.target.value).getTime();
        if (date <= dateBirthPick) {
            Swal.fire({
                icon: "error",
                title: "Ngày sinh không hợp lệ",
                showConfirmButton: false,
                timer: 1000,
                customClass: {
                    title: "fs-5 text-error",
                },
            });
            setDateBirth(false);
        } else {
            setDateBirth(true);
        }
    };

    const onChange = (e, obj) => {
        getAllDistrict(obj.id);
    };
    const onChangeDistrict = (e, obj) => {
        getAllWard(obj.id);
    };
    const onSearch = (value) => {
        console.log("search:", value);
    };
    useEffect(() => {
        setDiscription(user?.description);
        getAllCity();
    }, []);
    const handleTypeUser = (value) => {
        setTypeUserDetail(value);
    };

    // Lấy API Thành Phố
    let arraycity = [];
    let arraydistrict = [];
    let arrayward = [];
    city.map((values, index) => arraycity.push({ name: values.name, code: values.code }));
    district.map((values, index) => arraydistrict.push({ name: values.name, code: values.code }));
    ward.map((values, index) => arrayward.push({ name: values.name, code: values.code }));
    const handleSubmit = async (e) => {
        if (!dateBirth) {
            errorInfo("Ngày sinh không hợp lệ");
        } else {
            let obj = {};
            if (!user.id) {
                obj = {
                    ...e,
                    image: await convertBase64Img(imageUpload),
                    description: valueEditor,
                };
            } else if (imageUpload) {
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
                    handleUpdate(obj);
                }
            });
        }
    };

    return (
        <div>
            <Modal
                title={<div className="fs-4 fw-bold">Cập nhật thông tin </div>}
                centered
                open={open}
                okButtonProps={{
                    style: {
                        display: "none",
                    },
                }}
                cancelButtonProps={{
                    style: {
                        display: "none",
                    },
                }}
                onCancel={() => setOpen(false)}
                width={1300}
            >
                <Form layout="vertical" onFinish={handleSubmit} form={form}>
                    <Form.Item label="Mã người dùng" name="id" hidden={true}>
                        <Input disabled />
                    </Form.Item>
                    <div className="row">
                        <div className="col-md-4 f-flex justify-content-center">
                            <Form.Item
                                label="Loại người dùng"
                                name="typeUser"
                                className="col-md-12"
                                rules={[
                                    { required: true, message: "Vui lòng chọn loại nhân viên !" },
                                ]}
                            >
                                <Select
                                    disabled={true}
                                    showSearch
                                    placeholder="Chọn loại người dùng"
                                    optionFilterProp="children"
                                    onChange={handleTypeUser}
                                    filterOption={(input, option) =>
                                        (option?.label ?? "")
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                    }
                                    options={[
                                        {
                                            value: "1",
                                            label: "Học viên",
                                        },
                                        {
                                            value: "2",
                                            label: "Giảng viên",
                                        },
                                        {
                                            value: "3",
                                            label: "Nhân viên",
                                        },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item
                                name="image"
                                className="img d-flex justify-content-center my-3"
                            >
                                <div className="box-img1 d-flex justify-content-center align-items-center rounded-3 ">
                                    {(imageUpload || user?.id) && (
                                        <img
                                            src={imageUpload?.preview || user?.image || imageUser}
                                            alt=""
                                            name="image"
                                            className="img-preview"
                                        />
                                    )}
                                    {imageUpload || user?.id ? (
                                        ""
                                    ) : (
                                        <>
                                            <div className="fs-5 text-image px-3 w-75">
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
                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                <Form.Item
                                    label="Họ lót"
                                    name="firstName"
                                    className="col-md-6"
                                    rules={[{ required: true, message: "Vui lòng nhập họ lót!" }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Tên"
                                    name="lastName"
                                    className="col-md-6"
                                    rules={[{ required: true, message: "Vui lòng nhập tên !" }]}
                                >
                                    <Input />
                                </Form.Item>
                            </div>

                            <div className="row">
                                <Form.Item
                                    label="Giới tính"
                                    name="gender"
                                    className="col-md-4"
                                    rules={[
                                        { required: true, message: "Vui lòng chọn giới tính !" },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        placeholder="Chọn giới tính"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            (option?.label ?? "")
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        options={[
                                            {
                                                value: "false",
                                                label: "Nam",
                                            },
                                            {
                                                value: "true",
                                                label: "Nữ",
                                            },
                                        ]}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Ngày sinh"
                                    name="dateBirth"
                                    className="col-md-4"
                                    rules={[
                                        { required: true, message: "Vui lòng chọn ngày sinh !" },
                                    ]}
                                >
                                    <Input type="date" onChange={handleDateBirth} />
                                </Form.Item>
                                <Form.Item
                                    label="Số điện thoại"
                                    name="phone"
                                    className="col-md-4"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng nhập số điện thoại !",
                                        },
                                    ]}
                                >
                                    <Input type="tel" />
                                </Form.Item>
                            </div>

                            <Form.Item
                                label="Email"
                                name="email"
                                className="col-md-12"
                                rules={[{ required: true, message: "Vui lòng nhập email !" }]}
                            >
                                <Input type="email" />
                            </Form.Item>

                            <div className="row">
                                <Form.Item
                                    label="Thành phố"
                                    name="city"
                                    className="col-md-4"
                                    rules={[
                                        { required: true, message: "Vui lòng chọn thành phố !" },
                                    ]}
                                >
                                    <Select
                                        className="w-100"
                                        showSearch
                                        placeholder="Chọn thành phố, tỉnh"
                                        optionFilterProp="children"
                                        onChange={onChange}
                                        onSearch={onSearch}
                                        filterOption={(input, option) =>
                                            (option?.label ?? "")
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        options={arraycity.map((item) => ({
                                            value: item.name,
                                            label: item.name,
                                            id: item.code,
                                        }))}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Quận, huyện"
                                    name="district"
                                    className="col-md-4"
                                    rules={[{ required: true, message: "Vui lòng chọn quận !" }]}
                                >
                                    <Select
                                        className="w-100"
                                        showSearch
                                        placeholder="Chọn quận, huyện"
                                        optionFilterProp="children"
                                        onChange={onChangeDistrict}
                                        onSearch={onSearch}
                                        filterOption={(input, option) =>
                                            (option?.label ?? "")
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        options={arraydistrict.map((item) => ({
                                            value: item.name,
                                            label: item.name,
                                            id: item.code,
                                        }))}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Phường, xã"
                                    name="ward"
                                    className="col-md-4"
                                    rules={[{ required: true, message: "Vui lòng chọn xã !" }]}
                                >
                                    <Select
                                        className=" w-100"
                                        showSearch
                                        placeholder="Chọn phường, xã"
                                        optionFilterProp="children"
                                        onSearch={onSearch}
                                        filterOption={(input, option) =>
                                            (option?.label ?? "")
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        options={arrayward.map((item) => ({
                                            value: item.name,
                                            label: item.name,
                                        }))}
                                    />
                                </Form.Item>
                            </div>
                            <Form.Item label="Số nhà" name="street" className="col-md-12">
                                <Input />
                            </Form.Item>
                        </div>
                        <Form.Item
                            label="Tên đăng nhập"
                            name="userName"
                            className="col-md-12"
                            rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập !" }]}
                        >
                            <Input readOnly={user.id ? true : false} />
                        </Form.Item>
                        {typeUserDetail === "1" || typeUserDetail === undefined ? (
                            <Form.Item
                                label="Nơi công tác"
                                name="workPlace"
                                className="col-md-12"
                                rules={[{ required: true, message: "Vui lòng nhập nơi công tác!" }]}
                            >
                                <Input />
                            </Form.Item>
                        ) : typeUserDetail === "2" ? (
                            <>
                                <div className="row">
                                    <Form.Item
                                        label="Bằng cấp"
                                        name="degree"
                                        className="col-md-4"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Vui lòng nhập bằng cấp !",
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Kinh nghiệm"
                                        name="experience"
                                        className="col-md-4"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Vui lòng nhập kinh nghiệm !",
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Chuyên môn"
                                        name="specialize"
                                        className="col-md-4"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Vui lòng nhập chuyên môn !",
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                                <Form.Item
                                    label="Mô tả"
                                    name="description"
                                    className="col-md-12"
                                    rules={[{ required: true, message: "Vui lòng nhập mô tả !" }]}
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
                            </>
                        ) : (
                            <>
                                <div className="row">
                                    <Form.Item
                                        label="Vị trí"
                                        name="position"
                                        className="col-md-6"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Vui lòng nhập vị trí!",
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Phòng ban"
                                        name="department"
                                        className="col-md-6"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Vui lòng nhập phòng ban !",
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                            </>
                        )}
                    </div>

                    <Form.Item>
                        <div className="row d-flex justify-content-center">
                            <Button className="col-md-2 mx-1" htmlType="submit">
                                {user.id ? "Lưu" : "Thêm"}
                            </Button>
                            <Button
                                className="col-md-2 mx-1"
                                htmlType="submit"
                                onClick={() => {
                                    form.resetFields();
                                }}
                            >
                                Làm mới
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Detail;
