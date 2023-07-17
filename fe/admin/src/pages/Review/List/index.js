import { Table, Button, Popconfirm, Switch, Checkbox, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { successDialog, deleteSuccess } from "../../../components/Dialog/Dialog";
import reviewAPI from "../../../services/reviewAPI";

function ReviewList() {
    const [listReview, setListReview] = useState([]);
    console.log("listReview: ", listReview);
    const [loading, setLoading] = useState(false);

    const getAllReview = async () => {
        try {
            setLoading(true);
            const response = await reviewAPI.getAll();
            setListReview(response.data.data);
            setLoading(false);
        } catch (err) {
            throw new Error(err);
        }
    };

    useEffect(() => {
        getAllReview();
    }, []);

    // XỬ LÝ DELETE
    const handleDelete = async (record) => {
        const data = await reviewAPI.delete(record.id);
        if (data.data.message == "Delete Successfully") {
            deleteSuccess();
            getAllReview();
        }
    };

    // SỬA
    const handleUpdate = async (obj) => {
        const data = await reviewAPI.update(obj);
        if (data.data.message === "Update Successfully") {
            successDialog();
            getAllReview();
        }
    };
    const findTypeReview = async (e) => {
        if (e === 3) {
            getAllReview();
        } else {
            let data = await reviewAPI.find({ activeHidden: e });
            setListReview(data.data.data);
        }
    };
    const handleCheck = (checked, record) => {
        let obj = {
            id: record.id,
            active: checked,
        };
        handleUpdate(obj);
    };
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            align: "center",
        },
        {
            title: "Người dùng đánh giá",
            align: "center",
            dataIndex: "user",
            render: (user, record) => (
                <div>
                    {record.activeHidden ? "***********" : user?.firstName + " " + user?.lastName}
                </div>
            ),
        },
        {
            title: "Nội dung",
            dataIndex: "description",
            render: (description) => <div style={{ width: "500px" }}>{description}</div>,
        },
        {
            title: "Sao",
            dataIndex: "star",
            align: "center",
        },
        {
            title: "Trạng thái ẩn danh",
            dataIndex: "activeHidden",
            align: "center",

            render: (activeHidden) => (
                <div className="d-flex justify-content-center">
                    <Checkbox checked={activeHidden} />
                </div>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "active",
            align: "center",

            render: (active, record) => (
                <div className="d-flex justify-content-center">
                    <Switch
                        defaultChecked={active}
                        onClick={(checked) => handleCheck(checked, record)}
                        disabled={record.activeHidden ? true : false}
                    />
                </div>
            ),
        },
        {
            title: "Xóa",
            dataIndex: "",
            align: "center",
            render: (_, record) => (
                <Popconfirm title="Bạn có muốn xóa?" onConfirm={() => handleDelete(record)}>
                    <Button className="bg-light">
                        <FontAwesomeIcon icon={faTrashAlt} className="text-dark" />
                    </Button>
                </Popconfirm>
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
                    <div className="row">
                        <div className="col-md-8">
                            <p className="fs-4 fw-bold">DANH SÁCH ĐÁNH GIÁ</p>
                        </div>
                        <div className="col-md-4 text-end">
                            <Select
                                showSearch
                                placeholder="Lọc thông tin"
                                optionFilterProp="children"
                                onChange={findTypeReview}
                                filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                                options={[
                                    {
                                        value: 3,
                                        label: "Tất cả",
                                    },
                                    {
                                        value: 0,
                                        label: "Công khai",
                                    },
                                    {
                                        value: 1,
                                        label: "Ẩn danh",
                                    },
                                ]}
                            />
                        </div>
                        <hr className="w-100 " />

                        <div className="row">
                            <div className="col-md-12">
                                <Table
                                    columns={columns}
                                    dataSource={listReview}
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

export default ReviewList;
