import "../style.scss";
import logo from "../../../assets/image/logoheader.png";
import { Form, Input, Button, Select } from "antd";
import { useState, useEffect } from "react";
import addressAPI from "../../../services/addressAPI";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import userAPI from "../../../services/userAPI";
import { errorInfo, info, successDialog, successInfo } from "../../../components/Dialog/Dialog";
import { toast } from "react-toastify";
function RegisterPage() {
    const navigate = useNavigate();
    const [dateBirth, setDateBirth] = useState(true);
    const [verifyPw, setVerifyPw] = useState(false);
    const [city, listCity] = useState([]);
    const [district, listDistrict] = useState([]);
    const [ward, listWard] = useState([]);

    const handleDateBirth = (e) => {
        let date = new Date().getTime();
        let dateBirthPick = new Date(e.target.value).getTime();
        if (date <= dateBirthPick) {
            errorInfo("Thông tin không hợp lệ", "Ngày sinh không hợp lệ");
            setDateBirth(false);
        } else {
            setDateBirth(true);
        }
    };
    const verifyPass = (e) => {
        let pass = e.target.value;
        if (pass.length < 8) {
            // toast.info("Mật khẩu phải chứ từ 8 ký tự");
            setVerifyPw(false);
        } else {
            setVerifyPw(true);
        }
    };
    const handleRegister = async (e) => {
        let obj = {
            ...e,
            imageava:
                "https://res.cloudinary.com/dt2bxtoc3/image/upload/v1688332267/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-_c5yurm.png",
        };
        if (!verifyPw) {
            toast.info("Mật khẩu phải chứa từ 8 ký tự");
        } else {
            if (!dateBirth) {
                errorInfo("Ngày sinh không hợp lệ", "");
            } else {
                if (e.rePassWord != e.passWord) {
                    info("Lỗi thông tin", "Mật khẩu nhập lại không chính xác!");
                } else {
                    const data = await userAPI.create(obj);
                    if (data.data.message === "Email Exist") {
                        errorInfo("Lỗi thông tin", "Email này đã được đăng ký trước đó !");
                    } else if (data.data.message === "Phone Exist") {
                        errorInfo("Lỗi thông tin", "Số điện thoại đã được đăng ký trước đó !");
                    } else if (data.data.message === "Username Exist") {
                        errorInfo(
                            "Lỗi thông tin",
                            "Tên đăng nhập đã được sử dụng. Bạn hãy lựa chọn 1 tên khác !"
                        );
                    } else if (data.data.message === "Create Successfully") {
                        successInfo("Đăng ký tài khoản thành công !");
                        navigate("/login");
                    }
                }
            }
        }
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
        getAllCity();
    }, []);
    // Lấy API Thành Phố
    let arraycity = [];
    let arraydistrict = [];
    let arrayward = [];
    city.map((values, index) => arraycity.push({ name: values.name, code: values.code }));
    district.map((values, index) => arraydistrict.push({ name: values.name, code: values.code }));
    ward.map((values, index) => arrayward.push({ name: values.name, code: values.code }));
    return (
        <>
            <div className="content-center bg-login">
                <div className="box">
                    <div className="bg-icon p-4 mt-4">
                        <img
                            src={logo}
                            alt=""
                            className="rounded mx-auto d-block "
                            style={{ width: "250px", height: "80px" }}
                        />
                    </div>
                    <div className="p-5">
                        <h3 className="color-text1">Xin chào bạn đến với HK EDU!</h3>
                        <p className="color-text2">Hãy nhập thông tin để đăng ký tài khoản nào</p>

                        <Form onFinish={handleRegister} layout="vertical" size="lagre">
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Item
                                        className="fw-bold"
                                        label="Họ lót"
                                        name="firstName"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Vui lòng nhập họ lót !",
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                                <div className="col-md-6">
                                    <Form.Item
                                        name="lastName"
                                        className="fw-bold"
                                        label="Tên"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Vui lòng nhập tên !",
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                            </div>
                            <Form.Item
                                className="fw-bold"
                                label="Tên đăng nhập"
                                name="userName"
                                rules={[
                                    { required: true, message: "Vui lòng nhập tên đăng nhập !" },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="passWord"
                                className="fw-bold"
                                label="Mật khẩu"
                                rules={[{ required: true, message: "Vui lòng nhập mật khẩu !" }]}
                            >
                                <Input type="password" onChange={verifyPass} />
                            </Form.Item>
                            <Form.Item
                                name="rePassWord"
                                className="fw-bold"
                                label="Nhập lại mật khẩu"
                            >
                                <Input
                                    type="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng xác nhận lại mật khẩu !",
                                        },
                                    ]}
                                />
                            </Form.Item>
                            <div className="row ">
                                <div className="col-md-6">
                                    <Form.Item
                                        label="Giới tính"
                                        name="gender"
                                        className="fw-bold"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Vui lòng chọn giới tính !",
                                            },
                                        ]}
                                    >
                                        <Select
                                            className="w-100"
                                            showSearch
                                            style={{
                                                width: 160,
                                            }}
                                            placeholder="Giới tính"
                                            optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                (option?.label ?? "")
                                                    .toLowerCase()
                                                    .includes(input.toLowerCase())
                                            }
                                            options={[
                                                {
                                                    value: "0",
                                                    label: "Nam",
                                                },
                                                {
                                                    value: "1",
                                                    label: "Nữ",
                                                },
                                            ]}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="col-md-6 ">
                                    <Form.Item
                                        label="Ngày sinh"
                                        name="dateBirth"
                                        className="fw-bold"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Vui lòng chọn ngày sinh!",
                                            },
                                        ]}
                                    >
                                        <Input type="date" onChange={handleDateBirth} />
                                    </Form.Item>
                                </div>
                            </div>
                            <Form.Item
                                className="fw-bold"
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: "Vui lòng nhập địa chỉ email !" },
                                ]}
                            >
                                <Input type="email" />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                className="fw-bold"
                                label="Số điện thoại"
                                rules={[
                                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                                ]}
                            >
                                <Input type="tel" />
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
                            <Form.Item
                                name="workPlace"
                                className="fw-bold"
                                rules={[
                                    { required: true, message: "Vui lòng nhập nơi công tác !" },
                                ]}
                                label={
                                    <div>
                                        <span className="fw-bold">Nơi công tác</span>
                                        <span
                                            style={{
                                                fontSize: "10px",
                                                color: "silver",
                                                fontWeight: "inherit",
                                            }}
                                        >
                                            {" "}
                                            VD: Đại Học Công Nghệ Sài Gòn,..{" "}
                                        </span>
                                    </div>
                                }
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    className=" w-100 fw-bold "
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Tạo tài khoản
                                </Button>
                            </Form.Item>
                        </Form>
                        <Link className="text-decoration-none" to="/login">
                            <div className="fw-bold ">Quay lại</div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterPage;
