import { Modal, Button, Form, Input, Select } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import userAPI from "../../../services/userAPI";
import courseAPI from "../../../services/courseAPI";
import getCookie from "../../../cookie/getCookie";
import registrationAPI from "../../../services/registrationAPI";
import "./style.scss";

function DetailRegistration(props) {
    const [loading, setLoading] = useState(false);
    const { registration } = useSelector((state) => state.dataAdd);
    const { open, handleCreate, handleUpdate, setOpen } = props;

    //Student
    const [listStudent, setListStudent] = useState([]);
    const [idStudent, setIdStudent] = useState();

    //Course
    const [listCourse, setListCourse] = useState([]);
    // const [idCourse, setIdCourse] = useState();
    const [form] = Form.useForm();

    const [courseClasses, setCourseClasses] = useState();
    const [listCourseClasses, setListCourseClasses] = useState();

    //Classes

    const getAllStudent = async () => {
        try {
            setLoading(true);
            const response = await userAPI.getAllTypeUser({ typeUser: [0, 1] });
            setListStudent(response.data.data);
            setLoading(false);
        } catch (err) {
            throw new Error(err);
        }
    };

    const getStudent = async (obj) => {
        try {
            setLoading(true);
            const response = await userAPI.getUserBy({ datafind: obj });
            setIdStudent(response.data.data);
            setLoading(false);
        } catch (err) {
            throw new Error(err);
        }
    };
    //
    const getAllCourse = async () => {
        try {
            setLoading(true);
            const response = await courseAPI.getAll();
            setListCourse(response.data.data);

            setLoading(false);
        } catch (err) {
            throw new Error(err);
        }
    };
    //
    useEffect(() => {
        getAllStudent();
        getAllCourse();
    }, []);

    useEffect(() => {
        form.setFieldsValue({
            id: registration.id,
        });
    }, [registration]);

    // //Load khi chọn khóa học
    // useEffect(() => {
    //     form.setFieldsValue({
    //         price: idCourse?.price,
    //         priceDiscount: idCourse?.priceDiscount,
    //         amount: idCourse?.amount,
    //     });
    // }, [idCourse]);

    //Load khi chọn học viên
    useEffect(() => {
        form.setFieldsValue({
            phone: idStudent?.phone,
            dateBirth: idStudent?.dateBirth,
            email: idStudent?.email,
            gender: idStudent?.gender === 1 ? "Nữ" : idStudent?.gender === 0 ? "Nam" : "",
        });
    }, [idStudent]);

    const handleChangeStudent = (value) => {
        getStudent(value);
    };

    const onChange = async (value) => {
        let data = await registrationAPI.checkClassesCourse(value);
        setListCourseClasses(data.data.data);
    };

    const handleSubmit = async (e) => {
        let data = {
            ...e,
            staffRegis: JSON.parse(getCookie("useradmin"))?.id,
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
                if (registration.id) {
                    handleUpdate(data);

                    form.resetFields();
                }
                //CREATE
                else {
                    handleCreate(data);
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
                        <div className="fs-4 fw-bold text-center">Lập phiếu đăng ký</div>
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
                width={1200}
            >
                <Form layout="vertical" onFinish={handleSubmit} form={form} className="px-4">
                    <Form.Item
                        label="Mã phiếu đăng ký"
                        name="id"
                        hidden={registration.id ? false : true}
                    >
                        <Input disabled />
                    </Form.Item>
                    <div className="py-1 px-3 my-2 fw-bold fs-6 bd-title">THÔNG TIN KHÁCH HÀNG</div>
                    <div className="row">
                        <Form.Item
                            label="Tên học viên"
                            name="studentId"
                            rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                            className="col-md-8"
                        >
                            <Select
                                className="w-100"
                                showSearch
                                style={{
                                    width: 200,
                                }}
                                placeholder="Chọn loại"
                                optionFilterProp="children"
                                onChange={handleChangeStudent}
                                filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                                options={listStudent?.map((item) => ({
                                    value: item.id,
                                    label:
                                        item.firstName + " " + item.lastName + " - " + item.phone,
                                    obj: item,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item label="Số điện thoại" name="phone" className="col-md-4">
                            <Input readOnly />
                        </Form.Item>
                    </div>
                    <div className="row">
                        <Form.Item label="Ngày sinh" name="dateBirth" className="col-md-4">
                            <Input readOnly />
                        </Form.Item>
                        <Form.Item label="Giới tính" name="gender" className="col-md-4">
                            <Input readOnly />
                        </Form.Item>

                        <Form.Item label="Email" name="email" className="col-md-4">
                            <Input readOnly />
                        </Form.Item>
                    </div>
                    <div className="bd-title">
                        <div className=" px-3 my-2 fw-bold fs-6">THÔNG TIN KHÓA HỌC </div>
                    </div>
                    <div className="row">
                        <Form.Item
                            label="Tên khóa học"
                            name="courseId"
                            rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                            className="col-md-12 "
                        >
                            <Select
                                showSearch
                                placeholder="Chọn khóa học"
                                optionFilterProp="children"
                                mode="tags"
                                onChange={onChange}
                                filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                                options={listCourse?.map((item) => ({
                                    value: item.id,
                                    label: item.nameCourse,
                                }))}
                            />
                        </Form.Item>
                       
                    </div>
                    {listCourseClasses ? (
                        <Form.Item label="Danh sách lớp học" name="classesId" className="w-100">
                            <Select
                                mode="tags"
                                options={listCourseClasses?.map((item) => ({
                                    label: item?.nameCourse,
                                    options: item?.listClass.map((item1) => ({
                                        label:
                                            item1.nameClasses +
                                            " / " +
                                            "Ngày bắt đầu: " +
                                            item1.startDate +
                                            " / " +
                                            "Ngày kết thúc: " +
                                            item1.endDate +
                                            " / " +
                                            "Thời gian: " +
                                            item1.startHour +
                                            " - " +
                                            item1.endHour,
                                        value: item1.id,
                                    })),
                                }))}
                            />
                        </Form.Item>
                    ) : (
                        ""
                    )}
                    <div className="py-1 px-3 my-2 fw-bold fs-6 bd-title">THÔNG TIN GHI CHÚ</div>
                    <div className="row">
                        <Form.Item label="Hình thức thanh toán" name="method" className="col-md-3">
                            <Select
                                showSearch
                                placeholder="Chọn phương thức thanh toán"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                                options={[
                                    {
                                        value: "0",
                                        label: "Thanh toán tiền mặt",
                                    },
                                    {
                                        value: "1",
                                        label: "Chuyển khoản",
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item label="Ghi chú" name="note" className="col-md-9">
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <Form.Item className="col-md-1">
                            <Button htmlType="submit" type="primary">
                                {registration.id ? "Lưu" : "Thêm"}
                            </Button>
                        </Form.Item>
                        <Form.Item className="col-md-1">
                            <Button
                                onClick={() => {
                                    form.resetFields();
                                    setCourseClasses(false);
                                }}
                            >
                                Làm mới
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    );
}

export default DetailRegistration;
