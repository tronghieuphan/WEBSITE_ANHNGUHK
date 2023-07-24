import { Modal, Button, Form, Input, Select } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import courseAPI from "../../../services/courseAPI";
import weekdayAPI from "../../../services/weekdayAPI";
import userAPI from "../../../services/userAPI";
import { error, info } from "../../../components/Dialog/Dialog";
import classesAPI from "../../../services/classesAPI";
import CardCalender from "../../../components/Card/CardCalender";

function DetailClasses(props) {
    //Nhận props
    const { open, handleCreate, handleUpdate, setOpen } = props;

    //REDUX
    const { classes } = useSelector((state) => state.dataAdd);
    //FORM
    const [form] = Form.useForm();
    //useState
    const [loading, setLoading] = useState(false);
    const [open1, setOpen1] = useState(false);

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [booleanDate, setBooleanDate] = useState();
    const [listWeekday, setListWeekday] = useState([]);
    const [listLecture, setListLecture] = useState([]);
    const [listCourse, setListCourse] = useState([]);

    const [listCalenderLec, setListCalenderLec] = useState();

    const [timeStart, setTimeStart] = useState();
    const [timeEnd, setTimeEnd] = useState();
    const [time, setTime] = useState(false);

    //GET API

    const getAllWeekday = async () => {
        try {
            const data = await weekdayAPI.getAll();
            setListWeekday(data.data.data);
        } catch (err) {
            throw new Error(err);
        }
    };
    const getAllLecture = async () => {
        try {
            const data = await userAPI.getAllTypeUser({ typeUser: 2 });
            setListLecture(data.data.data);
        } catch (err) {
            throw new Error(err);
        }
    };

    const getAllCourse = async () => {
        try {
            const data = await courseAPI.getAll();
            setListCourse(data.data.data);
        } catch (err) {
            throw new Error(err);
        }
    };
    useEffect(() => {
        getAllWeekday();
        getAllLecture();
        getAllCourse();
    }, []);

    const handleStartDate = (e) => {
        
        let start_Date = new Date(e.target.value).getTime();
        let date_Current = new Date().getTime();
        if (
            start_Date === date_Current ||
            start_Date < date_Current ||
            start_Date > endDate ||
            start_Date === endDate
        ) {
            error("Ngày bắt đầu không hợp lệ !");
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

    const handleTime = (e) => {
        if (e.target.value < timeStart) {
            info("Thời gian không hợp lý !");
            setTime(false);
        } else {
            setTimeEnd(e.target.value);
            setTime(true);
        }
    };
    useEffect(() => {
        form.setFieldsValue({
            id: classes.id,
            nameClasses: classes.nameClasses,
            startDate: classes.startDate,
            endDate: classes.endDate,
            courseId: classes.courseId,
            lectureId: classes.lectureId,
            nameWeekday: classes.weekdayId,
            startHour: classes.startHour,
            endHour: classes.endHour,
            quantity: classes.quantity,
            quantityMin: classes.quantityMin,
        });
    }, [classes]);

    const handleChange = async (value) => {
        let data = await classesAPI.getListLecClas({ id: value });
        setListCalenderLec(data.data.data);
    };
    const onSearch = (value) => {
        console.log("search:", value);
    };
    const handleSubmit = async (e) => {
        if (startDate === undefined || endDate === undefined) {
            error("Hãy chọn ngày hợp lý!");
        } else if (booleanDate === "NBDKHL") {
            error("Ngày bắt đầu không hợp lệ !");
        } else if (booleanDate === "NKTKHL") {
            error("Ngày kết thúc không hợp lệ !");
        } else if (time === false) {
            error("Thời gian không hợp lệ");
        } else {
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
                    if (classes?.id) {
                        setLoading(true);
                        handleUpdate(e);
                        setLoading(false);
                    }
                    //CREATE
                    else {
                        setLoading(true);
                        handleCreate(e);
                        setLoading(false);
                    }
                }
            });
        }
    };
    // //SET DATA SELECT
    let Weekday = [];
    let Lecture = [];
    let Course = [];

    listWeekday?.map((values, index) => Weekday.push({ id: values.id, name: values.nameWeekday }));

    listLecture?.map((values, index) =>
        Lecture.push({ id: values.id, name: values.firstName + " " + values.lastName })
    );
    listCourse?.map((values, index) => Course.push({ id: values.id, name: values.nameCourse }));

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
                className="my-3 "
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <Form layout="vertical" onFinish={handleSubmit} form={form} className="px-3">
                    <Form.Item label="Mã lớp học" name="id" hidden={classes?.id ? false : true}>
                        <Input disabled />
                    </Form.Item>
                    <div className="row">
                        <Form.Item
                            label="Tên lớp học"
                            name="nameClasses"
                            className="col-md-8"
                            rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Số lượng học viên"
                            name="quantity"
                            className="col-md-2"
                            rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                        >
                            <Input type="number" min={0} />
                        </Form.Item>
                        <Form.Item
                            label="Số lượng tối thiệu"
                            name="quantityMin"
                            className="col-md-2"
                            rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                        >
                            <Input type="number" min={0} />
                        </Form.Item>
                    </div>
                    <div className="row d-flex justify-content-between">
                        <Form.Item
                            label="Ngày bắt đầu"
                            name="startDate"
                            className="col-md-6"
                            rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                            onChange={(e) => handleStartDate(e)}
                        >
                            <Input type="date" placeholder="dd-mm-yyyy" value={startDate} />
                        </Form.Item>
                        <Form.Item
                            label="Ngày kết thúc"
                            name="endDate"
                            className="col-md-6"
                            rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                            onChange={(e) => handleEndDate(e)}
                        >
                            <Input type="date" placeholder="dd-mm-yyyy" value={endDate} />
                        </Form.Item>
                    </div>
                    <div className="row">
                        <Form.Item
                            label="Thứ"
                            name="nameWeekday"
                            className="col-md-6"

                            // rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                        >
                            <Select
                                showSearch
                                placeholder="Chọn buổi học"
                                optionFilterProp="children"
                                mode="tags"
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                                options={Weekday?.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Giờ bắt đầu"
                            name="startHour"
                            className="col-md-3"
                            rules={[{ required: true, message: "Vui lòng chọn thông tin !" }]}
                        >
                            <Input type="time" onChange={(e) => setTimeStart(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            label="Giờ kết thúc"
                            name="endHour"
                            className="col-md-3"
                            rules={[{ required: true, message: "Vui lòng chọn thông tin !" }]}
                        >
                            <Input type="time" onChange={handleTime} />
                        </Form.Item>
                    </div>
                    <div className="row d-flex align-items-center">
                        <Form.Item
                            label="Khóa học"
                            name="courseId"
                            className="col-md-6"

                            // rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                        >
                            <Select
                                showSearch
                                placeholder="Chọn khóa học"
                                optionFilterProp="children"
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                                options={Course?.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Giảng viên"
                            name="lectureId"
                            className="col-md-5"

                            // rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                        >
                            <Select
                                showSearch
                                placeholder="Chọn giảng viên"
                                optionFilterProp="children"
                                onChange={handleChange}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                                options={listLecture?.map((item) => ({
                                    value: item.id,
                                    label: item.firstName + " " + item.lastName,
                                }))}
                            />
                        </Form.Item>
                        <Button className="col-md-1" onClick={() => setOpen1(true)}>
                            <FontAwesomeIcon icon={faEye} className="text-dark" />
                        </Button>
                    </div>

                    <Form.Item>
                        <Button htmlType="submit" className="d-block mx-auto">
                            {classes?.id ? "Lưu" : "Thêm"}
                        </Button>
                    </Form.Item>
                </Form>

                <Modal
                    className="h-50"
                    title={
                        <>
                            <div className="text-center fs-6">
                                Lịch giảng dạy của giảng viên <br />
                                <div className="text-center fs-4 fw-bold">
                                    {listCalenderLec?.lecture}
                                </div>
                            </div>
                            <hr className="w-100" />
                        </>
                    }
                    open={open1}
                    onCancel={() => setOpen1(false)}
                    cancelButtonProps={{}}
                    footer={null}
                    width={700}
                >
                    <div className="row">
                        {listCalenderLec === undefined ? (
                            "Vui lòng chọn giảng viên !"
                        ) : (
                            <>
                                {listCalenderLec?.data.map((item) => (
                                    <div className="col-md-4">
                                        <CardCalender value={item} />
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </Modal>
            </Modal>
        </>
    );
}

export default DetailClasses;
