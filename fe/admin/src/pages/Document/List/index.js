import { Table, Button, Popconfirm, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faPlus, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { successDialog, deleteSuccess, exist } from "../../../components/Dialog/Dialog";
import { useDispatch } from "react-redux";
import documentAPI from "../../../services/documentAPI";
import { setDataDocument } from "../../../slices/dataAdd";
import DetailDocument from "../Detail";
import "./style.scss";
import SearchData from "../../../components/Search";
function DocumentList() {
    const [listDocument, setListDocument] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [datafind, setDataFind] = useState("");
    const dispatch = useDispatch();
    const getAllDocument = async () => {
        try {
            setLoading(true);
            const response = await documentAPI.getAll();
            setListDocument(response.data.data);
            setLoading(false);
        } catch (err) {
            throw new Error(err);
        }
    };

    useEffect(() => {
        getAllDocument();
    }, []);

    // XỬ LÝ DELETE
    const handleDelete = async (record) => {
        const data = await documentAPI.delete(record.id);
        if (data.data.message === "Delete Successfully") {
            deleteSuccess();
            getAllDocument();
        }
    };

    // THÊM
    const handleCreate = async (obj) => {
        setLoading(true);
        const data = await documentAPI.create(obj);
        if (data.data.message === "Document Exist") {
            exist();
        } else if (data.data.message === "Create Successfully") {
            successDialog();
            getAllDocument();
        }
        setLoading(false);
    };

    // SỬA
    const handleUpdate = async (obj) => {
        const data = await documentAPI.update(obj);
        if (data.data.message === "Update Successfully") {
            successDialog();
            getAllDocument();
        }
    };
    // Tim
    const handleFind = async () => {

        const data = await documentAPI.findAllDocumentByName({ nameDocument: datafind });
        setListDocument(data.data.data);
    };
    useEffect(() => {
        handleFind();
    }, [datafind]);
    const handleDataCreate = () => {
        setOpen(true);
        dispatch(setDataDocument([]));
    };
    const handleAddStore = (record) => {
        dispatch(setDataDocument(record));
        setOpen(true);
    };
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            align: "center",
            fixed: "left",
        },

        {
            title: "Tên đối tượng",
            dataIndex: "nameDocument",
            fixed: "left",
            render: (nameDocument) => (
                <div
                    style={{
                        width: "150px",
                    }}
                >
                    {nameDocument}
                </div>
            ),
        },
        {
            title: "Ngày xuất bản",
            dataIndex: "releaseDate",
            render: (releaseDate) => (
                <div
                    style={{
                        width: "100px",
                    }}
                >
                    {releaseDate}
                </div>
            ),
        },
        {
            title: "File PDF",
            dataIndex: "filepdf",
            render: (filepdf) => (
                <div
                    style={{
                        width: "100px",
                    }}
                >
                    <Tooltip placement="topLeft" title={filepdf}>
                        <div className="des-link">
                            <a href={filepdf}>{filepdf}</a>
                        </div>
                    </Tooltip>
                </div>
            ),
        },
        {
            title: "Độ sát đề",
            dataIndex: "similarTopic",
            render: (similarTopic) => (
                <div
                    style={{
                        width: "50px",
                    }}
                >
                    {similarTopic}
                </div>
            ),
        },
        {
            title: "Mức độ",
            dataIndex: "level",
            render: (level) => (
                <div
                    style={{
                        width: "80px",
                    }}
                >
                    {level}
                </div>
            ),
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            render: (description) => (
                <Tooltip
                    placement="topLeft"
                    title={<div dangerouslySetInnerHTML={{ __html: description }}></div>}
                >
                    <div className="des" style={{ width: "300px" }}>
                        <div dangerouslySetInnerHTML={{ __html: description }}></div>
                    </div>
                </Tooltip>
            ),
        },
        {
            title: "Tên loại",
            dataIndex: "type.nameType",
            render: (nameType) => (
                <div
                    style={{
                        width: "80px",
                    }}
                >
                    {nameType}
                </div>
            ),
        },
        {
            title: "Lượt tải về",
            dataIndex: "download",
            render: (download) => (
                <div
                    style={{
                        width: "100px",
                    }}
                >
                    {download}
                </div>
            ),
        },
        {
            title: "Hình ảnh",
            dataIndex: "image",
            align: "center",
            fixed: "right",
            render: (image) => (
                <div>
                    <img src={image} className="d-block mx-auto" width={70} height={100} />
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
                        <p className="fs-4 fw-bold">DANH SÁCH TÀI LIỆU</p>
                        <div className="row">
                            <div className="col-md-7">
                                <Button className="bg-light" onClick={handleDataCreate}>
                                    <FontAwesomeIcon icon={faPlus} className="text-dark" />
                                </Button>
                            </div>
                            <div className="col-md-5 text-end">
                                <SearchData setDataFind={setDataFind} />
                            </div>
                        </div>
                        <DetailDocument
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
                                    dataSource={listDocument}
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

export default DocumentList;
