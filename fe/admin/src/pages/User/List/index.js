import { Tabs } from "antd";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { successDialog, deleteSuccess, exist, errorInfo } from "../../../components/Dialog/Dialog";
import { useDispatch } from "react-redux";
import { setDataUser } from "../../../slices/dataAdd";
import userAPI from "../../../services/userAPI";
import TableUser from "../../../components/Table";
import DetailUser from "../Detail";
import getCookie from "../../../cookie/getCookie";
import SearchData from "../../../components/Search";
function UserList() {
    const user = getCookie("useradmin") ? JSON.parse(getCookie("useradmin")) : null;
    const [staffConsult, setValeTypeConsult] = useState(false);
    const [staffEdu, setValeTypeEdu] = useState(false);
    const [admin, setValeTypeAdmin] = useState(false);
    const [listUser, setListUser] = useState([]);
    const [typeUser, setTypeUser] = useState({ typeUser: user?.codeUser });
    const [datafind, setDataFind] = useState("");

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    //phân loại người dùng
    const handlePreUser = () => {
        if (user?.typeUser === "3" && user?.department === "Tư vấn") {
            setValeTypeConsult(true);
            setValeTypeEdu(false);
            setValeTypeAdmin(false);
        } else if (user?.typeUser === "3" && user?.department === "Đào tạo") {
            setValeTypeConsult(false);
            setValeTypeEdu(true);
            setValeTypeAdmin(false);
        } else if (user?.typeUser === "4" && user?.department === "Quản trị") {
            setValeTypeConsult(false);
            setValeTypeEdu(false);
            setValeTypeAdmin(true);
        }
    };

    const getAll_TypeUser = async (obj) => {
        try {
            setLoading(true);
            const response = await userAPI.getAllTypeUser(obj);
            setListUser(response.data.data);
            setLoading(false);
        } catch (err) {
            throw new Error(err);
        }
    };
    const findUser = async (obj) => {
        setLoading(true);
        const response = await userAPI.findUserType(obj);
        setListUser(response.data.data);
        setLoading(false);
    };
    useEffect(() => {
        handlePreUser();
    }, []);
    useEffect(() => {
        getAll_TypeUser(typeUser);
    }, [typeUser]);
    useEffect(() => {
        findUser({ typeUser: typeUser.typeUser, datafind: datafind });
    }, [datafind]);
    // XỬ LÝ DELETE
    const handleDelete = async (record) => {
        const data = await userAPI.delete(record.id);
        if (data.data.message === "Delete Successfully") {
            deleteSuccess();
            getAll_TypeUser(typeUser);
        }
    };
    // THÊM
    const handleCreate = async (obj) => {
        const data = await userAPI.create(obj);
        if (data.data.message === "Phone Exist") {
            errorInfo("Số điện thoại đã tồn tại");
        } else if (data.data.message === "Email Exist") {
            errorInfo("Email đã tồn tại");
        } else if (data.data.message === "Username Exist") {
            errorInfo("Tên đăng nhập đã tồn tại");
        } else if (data.data.message === "Create Successfully") {

            successDialog();
            getAll_TypeUser(typeUser);
        }
    };
    // SỬA
    const handleUpdate = async (obj) => {
        const data = await userAPI.update(obj);
        if (data.data.message === "Update Successfully") {
            successDialog();
            getAll_TypeUser(typeUser);
        }
        setOpen(false);
    };
    const handleDataCreate = () => {
        setOpen(true);
        dispatch(setDataUser([]));
    };
    const handleAddStore = (record) => {
        dispatch(setDataUser(record));
        setOpen(true);
    };
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "1",
            align: "center",
            fixed: "left",
        },
        {
            title: "Họ lót",
            key: "2",
            dataIndex: "firstName",
            render: (firstName) => <div style={{ width: "150px" }}>{firstName}</div>,
        },
        {
            title: "Tên",
            key: "3",
            dataIndex: "lastName",
        },
        {
            title: "Giới tính",
            dataIndex: "gender",
            key: "4",
            align: "center",
            render: (gender) => (
                <div style={{ width: "50px" }}>{gender === true ? "Nữ" : "Nam"}</div>
            ),
        },
        {
            title: "Ngày sinh",
            dataIndex: "dateBirth",
            key: "5",
            align: "center",
            render: (dateBirth) => <div style={{ width: "100px" }}>{dateBirth}</div>,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "6",
            render: (email) => (
                <div style={{ width: "200px" }} className="des-hidden">
                    {email}
                </div>
            ),
        },
        {
            title: "Số điện thoại",
            key: "7",
            dataIndex: "phone",
        },
        {
            title: "Tài khoản",
            key: "8",
            dataIndex: "userName",
        },
        {
            title: "Số nhà",
            key: "9",
            dataIndex: "street",
            render: (street) => <div style={{ width: "200px" }}>{street}</div>,
        },
        {
            title: "Phường/xã",
            dataIndex: "ward",
            key: "10",
            render: (ward) => <div style={{ width: "180px" }}>{ward}</div>,
        },
        {
            title: "Quận/huyện",
            key: "11",
            dataIndex: "district",
            render: (district) => <div style={{ width: "180px" }}>{district}</div>,
        },
        {
            title: "Tỉnh/thành ",
            key: "12",
            dataIndex: "city",
            render: (city) => <div style={{ width: "180px" }}>{city}</div>,
        },
    ];

    let listarrtypeUser;
    if (admin) {
        listarrtypeUser = [
            {
                label: `Khách hàng thành viên`,
                blok: 0,
            },
            {
                label: `Học viên`,
                blok: 1,
            },
            {
                label: `Giảng viên`,
                blok: 2,
            },
            {
                label: `Nhân viên`,
                blok: 3,
            },
            {
                label: `Quản trị viên`,
                blok: 4,
            },
        ];
    } else if (staffConsult) {
        listarrtypeUser = [
            {
                label: `Khách hàng thành viên`,
                blok: 0,
            },
            {
                label: `Học viên`,
                blok: 1,
            },
        ];
    } else if (staffEdu) {
        listarrtypeUser = [
            {
                label: `Học viên`,
                blok: 1,
            },
            {
                label: `Giảng viên`,
                blok: 2,
            },
        ];
    }

    const onChange = (key) => {
        let obj = {
            typeUser: key,
        };
        setTypeUser(obj);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.8 } }}
            >
                <div className="text-muted">
                    <div className="">
                        <p className="fs-4 fw-bold">THÔNG TIN NGƯỜI DÙNG</p>
                        <div className="row">
                            <div className="col-md-8">
                                <Button className="bg-light" onClick={handleDataCreate}>
                                    <FontAwesomeIcon icon={faPlus} className="text-dark" />
                                </Button>
                            </div>
                            <div className="col-md-4 text-end">
                                <SearchData setDataFind={setDataFind} />
                            </div>
                        </div>
                        <hr className="w-100 " />
                        <DetailUser
                            handleCreate={handleCreate}
                            handleUpdate={handleUpdate}
                            open={open}
                            setOpen={setOpen}
                        />
                        <Tabs
                            defaultActiveKey="1"
                            items={listarrtypeUser?.map((item) => ({
                                key: item.blok,
                                label: item.label,
                                children: (
                                    <div className="w-100">
                                        <div className="w-100">
                                            <TableUser
                                                columns={columns}
                                                listUser={listUser}
                                                type={typeUser}
                                                loading={loading}
                                                handleAddStore={handleAddStore}
                                                handleDelete={handleDelete}
                                                getAllTypeUser={getAll_TypeUser}
                                            />
                                        </div>
                                    </div>
                                ),
                            }))}
                            tabPosition="bottom"
                            onChange={onChange}
                        />
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default UserList;
