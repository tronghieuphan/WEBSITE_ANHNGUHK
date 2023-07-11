import { Input, Form, Select} from "antd";

function Consult() {
    return (
        <>
            <div className="w-75 rounded-3 mx-auto my-5 p-5" style={{ backgroundColor: "#f3f8ff" }}>
                <div className="tablet">
                    <p className="d-block fw-bold fs-4 text-center ">ĐĂNG KÝ TƯ VẤN MIỄN PHÍ</p>

                    <Form onFinish={""} layout="vertical">
                        <div className="row m-auto  ">
                            <div className="col-md-4">
                                <div className="fw-bold text-center d-block">
                                    Thông tin người dùng
                                </div>
                                <hr />
                                <div className="w-75 m-3 mx-auto">
                                    <Form.Item pla>
                                        <Input placeholder="Ho và tên"></Input>
                                    </Form.Item>
                                    <Form.Item>
                                        <Input placeholder="Số điẹn thoại"></Input>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="fw-bold text-center d-block">
                                    Mục tiêu hướng đến
                                </div>
                                <hr />
                                <div className="w-75 m-3 mx-auto">
                                    <Form.Item>
                                        <Select
                                            defaultValue="lucy"
                                            options={[
                                                {
                                                    label: "Manager",
                                                    options: [
                                                        {
                                                            label: "Jack",
                                                            value: "jack",
                                                        },
                                                        {
                                                            label: "Lucy",
                                                            value: "lucy",
                                                        },
                                                    ],
                                                },
                                                {
                                                    label: "Engineer",
                                                    options: [
                                                        {
                                                            label: "yiminghe",
                                                            value: "Yiminghe",
                                                        },
                                                    ],
                                                },
                                            ]}
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Select
                                            defaultValue="lucy"
                                            options={[
                                                {
                                                    label: "Manager",
                                                    options: [
                                                        {
                                                            label: "Jack",
                                                            value: "jack",
                                                        },
                                                        {
                                                            label: "Lucy",
                                                            value: "lucy",
                                                        },
                                                    ],
                                                },
                                                {
                                                    label: "Engineer",
                                                    options: [
                                                        {
                                                            label: "yiminghe",
                                                            value: "Yiminghe",
                                                        },
                                                    ],
                                                },
                                            ]}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="col-md-4 ">
                                <div className="fw-bold text-center d-block">Dich vụ</div>
                                <hr />
                                <div className="d-flex align-items-center justify-content-center">
                                    <div className="w-75 m-3 ">
                                        <Form.Item>
                                            <Input placeholder="Ho và tên"></Input>
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Form.Item>
                            <div className="d-block text-center">
                                <button
                                    style={{
                                        backgroundColor: "#ff2222",
                                        padding: "15px 20px",
                                        fontWeight: "bold",
                                        color: "white",
                                        border: "none",
                                        fontSize: "17px",
                                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                                        borderRadius: "30px",
                                    }}
                                >
                                    Gửi thông tin
                                </button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default Consult;
