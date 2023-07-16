import { Table, Button, Popconfirm, Tooltip, Switch, message, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { successDialog, deleteSuccess, exist } from "../../../components/Dialog/Dialog";
import { useDispatch } from "react-redux";
import courseAPI from "../../../services/courseAPI";
import { setDataCourse } from "../../../slices/dataAdd";
import DetailCourse from "../Detail";
import { VND } from "../../../utils/formatVND";
import typeAPI from "../../../services/typeAPI ";

function CourseList() {
    const [listCourse, setListCourse] = useState([]);
    const [listType, setListType] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

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
    const getAllType = async () => {
        try {
            setLoading(true);
            const response = await typeAPI.getAll();
            setListType(response.data.data);
            setLoading(false);
        } catch (err) {
            throw new Error(err);
        }
    };
    useEffect(() => {
        getAllCourse();
        getAllType();
    }, []);

    // XỬ LÝ DELETE
    const handleDelete = async (record) => {
        const data = await courseAPI.delete(record.id);
        if (data.data.message === "Delete Successfully") {
            deleteSuccess();
            getAllCourse();
        }
    };

    // THÊM
    const handleCreate = async (obj) => {
        setLoading(true);
        const data = await courseAPI.create(obj);
        if (data.data.message === "Course Exist") {
            exist();
        } else if (data.data.message === "Create Successfully") {
            successDialog();
            getAllCourse();
        }
        setLoading(false);
    };

    // SỬA
    const handleUpdate = async (obj) => {
        const data = await courseAPI.update(obj);
        if (data.data.message === "Update Successfully") {
            successDialog();
            getAllCourse();
        }
        setOpen(false);
    };
    const handleDataCreate = () => {
        setOpen(true);
        dispatch(setDataCourse([]));
    };
    const handleAddStore = (record) => {
        dispatch(setDataCourse(record));
        setOpen(true);
    };

    const handleChange = async (key, obj) => {
        let data;
        if (key === "1") {
            data = await getAllCourse();
        } else {
            setLoading(true);
            data = await courseAPI.getCourseBeLongType({ datafind: key });
            setListCourse(data.data.data);
            setLoading(false);
        }
        message.success(`Bạn đã chọn ${obj.label}`);
    };
    const items = [{ id: "1", nameType: "Tất cả" }];
    listType?.map((item) => {
        items.push({ id: item.id, nameType: item.nameType });
    });

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            align: "center",
            fixed: "left",
        },

        {
            title: "Tên khóa học",
            dataIndex: "nameCourse",
            fixed: "left",
            render: (nameCourse) => (
                <div
                    style={{
                        width: "150px",
                    }}
                >
                    {nameCourse}
                </div>
            ),
        },
        {
            title: "Số bài học",
            dataIndex: "lesson",
            render: (lesson) => (
                <div
                    style={{
                        width: "60px",
                    }}
                >
                    {lesson}
                </div>
            ),
        },
        {
            title: "Học phí",
            dataIndex: "price",
            render: (price) => (
                <div
                    style={{
                        width: "200px",
                    }}
                >
                    {VND.format(price)}
                </div>
            ),
        },
        {
            title: "Mô tả đối tượng",
            dataIndex: "desClassify",
            render: (desClassify) => (
                <Tooltip
                    placement="topLeft"
                    title={<div dangerouslySetInnerHTML={{ __html: desClassify }}></div>}
                >
                    <div className="des" style={{ width: "300px" }}>
                        <div dangerouslySetInnerHTML={{ __html: desClassify }}></div>
                    </div>
                </Tooltip>
            ),
        },
        {
            title: "Mô tả thời gian",
            dataIndex: "desTime",
            render: (desTime) => (
                <Tooltip
                    placement="topLeft"
                    title={<div dangerouslySetInnerHTML={{ __html: desTime }}></div>}
                >
                    <div className="des" style={{ width: "300px" }}>
                        <div dangerouslySetInnerHTML={{ __html: desTime }}></div>
                    </div>
                </Tooltip>
            ),
        },
        {
            title: "Mô tả học phí",
            dataIndex: "desPrice",
            render: (desPrice) => (
                <Tooltip
                    placement="topLeft"
                    title={<div dangerouslySetInnerHTML={{ __html: desPrice }}></div>}
                >
                    <div className="des" style={{ width: "300px" }}>
                        <div dangerouslySetInnerHTML={{ __html: desPrice }}></div>
                    </div>
                </Tooltip>
            ),
        },
        {
            title: "Mô tả mục tiêu",
            dataIndex: "desTarget",
            render: (desTarget) => (
                <Tooltip
                    placement="topLeft"
                    title={<div dangerouslySetInnerHTML={{ __html: desTarget }}></div>}
                >
                    <div className="des" style={{ width: "300px" }}>
                        <div dangerouslySetInnerHTML={{ __html: desTarget }}></div>
                    </div>
                </Tooltip>
            ),
        },
        {
            title: "Listening",
            dataIndex: "listening",
            render: (listening) => (
                <Tooltip
                    placement="topLeft"
                    title={<div dangerouslySetInnerHTML={{ __html: listening }}></div>}
                >
                    <div className="des" style={{ width: "300px" }}>
                        <div dangerouslySetInnerHTML={{ __html: listening }}></div>
                    </div>
                </Tooltip>
            ),
        },
        {
            title: "Reading",
            dataIndex: "reading",
            render: (reading) => (
                <Tooltip
                    placement="topLeft"
                    title={<div dangerouslySetInnerHTML={{ __html: reading }}></div>}
                >
                    <div className="des" style={{ width: "300px" }}>
                        <div dangerouslySetInnerHTML={{ __html: reading }}></div>
                    </div>
                </Tooltip>
            ),
        },
        {
            title: "Writing",
            dataIndex: "writing",
            render: (writing) => (
                <Tooltip
                    placement="topLeft"
                    title={<div dangerouslySetInnerHTML={{ __html: writing }}></div>}
                >
                    <div className="des" style={{ width: "300px" }}>
                        <div dangerouslySetInnerHTML={{ __html: writing }}></div>
                    </div>
                </Tooltip>
            ),
        },
        {
            title: "Speaking",
            dataIndex: "speaking",
            render: (speaking) => (
                <Tooltip
                    placement="topLeft"
                    title={<div dangerouslySetInnerHTML={{ __html: speaking }}></div>}
                >
                    <div className="des" style={{ width: "300px" }}>
                        <div dangerouslySetInnerHTML={{ __html: speaking }}></div>
                    </div>
                </Tooltip>
            ),
        },
        {
            title: "Grammer",
            dataIndex: "grammer",
            render: (grammer) => (
                <Tooltip
                    placement="topLeft"
                    title={<div dangerouslySetInnerHTML={{ __html: grammer }}></div>}
                >
                    <div className="des" style={{ width: "300px" }}>
                        <div dangerouslySetInnerHTML={{ __html: grammer }}></div>
                    </div>
                </Tooltip>
            ),
        },
        {
            title: "Vocabulary",
            dataIndex: "vocabulary",
            render: (vocabulary) => (
                <Tooltip
                    placement="topLeft"
                    title={<div dangerouslySetInnerHTML={{ __html: vocabulary }}></div>}
                >
                    <div className="des" style={{ width: "300px" }}>
                        <div dangerouslySetInnerHTML={{ __html: vocabulary }}></div>
                    </div>
                </Tooltip>
            ),
        },
        {
            title: "Mã đối tượng",
            dataIndex: "classify",
            render: (classify) => <div style={{ width: "80px" }}>{classify?.nameClassify}</div>,
        },
        {
            title: "Loại khóa học",
            dataIndex: "type",
            render: (type) => <div style={{ width: "80px" }}>{type?.nameType}</div>,
        },
        {
            title: "Khuyến mãi áp dụng",
            dataIndex: "discount",
            render: (discount) => (
                <div style={{ width: "80px" }}>{discount?.percent ? discount?.percent : "0"}%</div>
            ),
        },

        {
            title: "Trạng thái",
            dataIndex: "active",
            align: "center",
            render: (active, record) => (
                <div
                    style={{
                        width: "100px",
                        textAlign: "center",
                    }}
                >
                    <Switch checked={{ active }} />
                </div>
            ),
        },
        {
            title: "Xóa",
            dataIndex: "",
            align: "center",
            fixed: "right",
            render: (_, record) => (
                <Popconfirm title="Bạn có muốn xóa?" onConfirm={() => handleDelete(record)}>
                    <Button className="bg-light">
                        <FontAwesomeIcon icon={faTrashAlt} className="text-dark" />
                    </Button>
                </Popconfirm>
            ),
        },
        {
            title: "Xem",
            dataIndex: "",
            align: "center",
            fixed: "right",
            render: (record) => (
                <Button className="bg-light" onClick={() => handleAddStore(record)}>
                    <FontAwesomeIcon icon={faEdit} className="text-dark" />
                </Button>
            ),
        },
    ];

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.8 } }}
            >
                <div className="text-muted">
                    <div className="">
                        <p className="fs-4 fw-bold">DANH SÁCH KHÓA HỌC</p>
                        <div className="row">
                            <div className="col-md-8">
                                <Button className="bg-light" onClick={handleDataCreate}>
                                    <FontAwesomeIcon icon={faPlus} className="text-dark" />
                                </Button>
                            </div>
                            <div className="col-md-4 text-end">
                                <Select
                                    defaultValue="Chọn loại khóa học"
                                    onChange={handleChange}
                                    options={items.map((item) => ({
                                        label: item.nameType,
                                        value: item.id,
                                    }))}
                                />
                            </div>
                        </div>

                        <DetailCourse
                            handleCreate={handleCreate}
                            handleUpdate={handleUpdate}
                            open={open}
                            setOpen={setOpen}
                        />
                        <hr className="w-100 " />
                        <div className="row">
                            <div className="col-md-12">
                                <Table
                                    columns={columns}
                                    dataSource={listCourse}
                                    bordered={true}
                                    loading={loading}
                                    scroll={{ x: true }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default CourseList;
