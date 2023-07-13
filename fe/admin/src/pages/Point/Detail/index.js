import { Modal, Button, Form, Input, Select, Checkbox } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import userAPI from "../../../services/userAPI";
import classesAPI from "../../../services/classesAPI";
function DetailPoint(props) {
    const { point } = useSelector((state) => state.dataAdd);
    const { open, handleCreate, handleUpdate, setOpen } = props;
    const [form] = Form.useForm();

    const [listClasses, setListClasses] = useState([]);
    const [listStudent, setListStudent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cblisten, setCbListen] = useState(false);
    const [cbreading, setCbReading] = useState(false);
    const [cbwriting, setCbWriting] = useState(false);
    const [cbspeaking, setCbSpeaking] = useState(false);
    const getAllStudent = async () => {
        try {
            setLoading(true);
            const response = await userAPI.getAllTypeUser({ typeUser: 1 });
            setListStudent(response.data.data);
            setLoading(false);
        } catch (err) {
            throw new Error(err);
        }
    };
    const getAllClasses = async () => {
        try {
            setLoading(true);
            const response = await classesAPI.getAll();
            setListClasses(response.data.data);
            setLoading(false);
        } catch (err) {
            throw new Error(err);
        }
    };
    useEffect(() => {
        getAllStudent();
        getAllClasses();
    }, []);
    useEffect(() => {
        form.setFieldsValue({
            id: point.id,
            numberPoint: point.numberPoint,
            result: point.result,
            skillListening: point.skillListening,
            skillReading: point.skillReading,
            skillSpeaking: point.skillSpeaking,
            skillWriting: point.skillWriting,
            classesId: point.classesId,
            studentId: point.studentId,
        });
    }, [point]);

    const handleSubmit = (e) => {
        console.log(e);
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
                if (point.id) {
                    handleUpdate(e);
                }
                //CREATE
                else {
                    handleCreate(e);
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
                    <Form.Item label="Mã đối tượng" name="id" hidden={point.id ? false : true}>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="studentId" label="Tên học viên">
                        <Select
                            showSearch
                            placeholder="Chọn học viên"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                            }
                            options={listStudent?.map((item) => ({
                                value: item.id,
                                label: item.firstName + " " + item.lastName,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item name="classesId" label="Lớp học">
                        <Select
                            showSearch
                            placeholder="Chọn lớp học"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                            }
                            options={listClasses?.map((item) => ({
                                value: item.id,
                                label: item.nameClasses,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item label="Điểm số" name="numberPoint">
                        <Input type="number" readOnly="true" />
                    </Form.Item>
                    <hr />
                    <p>Điểm số chi tiết</p>
                    {point.skillReading === 0 ? (
                        <Checkbox onChange={() => setCbReading(!cbreading)}>Reading Skill</Checkbox>
                    ) : (
                        ""
                    )}
                    {cbreading || point.skillReading !== 0 ? (
                        <Form.Item
                            label="Kỹ năng đọc"
                            name="skillReading"
                            rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                        >
                            <Input type="number" />
                        </Form.Item>
                    ) : (
                        ""
                    )}
                    {point.skillListening === 0 ? (
                        <Checkbox onChange={() => setCbListen(!cblisten)}>Listening Skill</Checkbox>
                    ) : (
                        ""
                    )}
                    {cblisten || point.skillListening !== 0 ? (
                        <Form.Item
                            label="Kỹ năng nghe"
                            name="skillListening"
                            rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                        >
                            <Input type="number" />
                        </Form.Item>
                    ) : (
                        ""
                    )}{" "}
                    {point.skillWriting === 0 ? (
                        <Checkbox onChange={() => setCbWriting(!cbwriting)}>Writing Skill</Checkbox>
                    ) : (
                        ""
                    )}
                    {cbwriting || point.skillWriting !== 0 ? (
                        <Form.Item
                            label="Kỹ năng viết"
                            name="skillWriting"
                            rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                        >
                            <Input type="number" />
                        </Form.Item>
                    ) : (
                        ""
                    )}
                    {point.skillWriting === 0 ? (
                        <Checkbox onChange={() => setCbSpeaking(!cbspeaking)}>
                            Speaking Skill
                        </Checkbox>
                    ) : (
                        ""
                    )}
                    {cbspeaking || point.skillSpeaking !== 0 ? (
                        <Form.Item
                            label="Kỹ năng nói"
                            name="skillSpeaking"
                            rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                        >
                            <Input type="number" />
                        </Form.Item>
                    ) : (
                        ""
                    )}
                    <hr />
                    <Form.Item name="result" label="Đánh giá">
                        <Select
                            showSearch
                            placeholder="Chọn đánh giá"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                            }
                            options={[
                                {
                                    value: "1",
                                    label: "Đạt",
                                },
                                {
                                    value: "0",
                                    label: "Không đạt",
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit">{point.id ? "Lưu" : "Thêm"}</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default DetailPoint;
