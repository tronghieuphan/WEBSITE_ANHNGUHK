import { TbCheckbox, TbAlarm, TbCoin, TbCurrentLocation } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../../components/Button";
import { Table } from "antd";
import "./style.scss";
import getCookie from "../../../cookie/getCookie";
import setCookie from "../../../cookie/setCookie";
import Swal from "sweetalert2";
function CouseContent(props) {
    const { data, data1 } = props;
    const { idType } = useParams();
    const navigate = useNavigate();
    const user = getCookie("user") ? JSON.parse(getCookie("user")) : null;

    const handleLogin = () => {
        if (user === null) {
            Swal.fire({
                title: "Bạn hãy đăng nhập trước khi đăng ký tư vấn",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Tôi đồng ý !",
                customClass: {
                    title: "fs-5 text-info",
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    let obj = {
                        code: "rescourse",
                        typeId: idType,
                    };
                    navigate("/login");
                    setCookie("course", JSON.stringify(obj));
                }
            });
        }
    };

    const columns = [
        {
            title: "Khai giảng",
            dataIndex: "startDate",
        },
        {
            title: "Lịch học",
            dataIndex: "weekdayId",
            render: (weekdayId) => <div>Thứ {weekdayId.sort() + "  "}</div>,
        },
        {
            title: "Thời gian",
            dataIndex: "hour",
        },
        {
            title: "Đăng ký",
            dataIndex: "",
            render: (record) =>
                user !== null ? (
                    <div className="text-center">
                        <Button record={record} data={data} />
                    </div>
                ) : (
                    <div className="text-center">
                        <button className="button-18" onClick={handleLogin}>
                            Chọn
                        </button>
                    </div>
                ),
        },
    ];

    return (
        <>
            <div className="m-auto">
                <div className="row m-auto w-60">
                    <div className="col-md-6">
                        <div className="text-course">
                            <p className="fs-5">
                                <TbCurrentLocation /> <span>Đối tượng</span>
                            </p>
                            <div
                                className="px-4"
                                dangerouslySetInnerHTML={{ __html: data?.desClassify }}
                            ></div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="text-course">
                            <p className="fs-5">
                                <TbAlarm /> <span>Thời gian</span>
                            </p>
                            <div
                                className="px-4"
                                dangerouslySetInnerHTML={{ __html: data?.desTime }}
                            ></div>
                        </div>
                    </div>
                </div>
                <div className="row m-auto w-60 my-5">
                    <div className="col-md-6">
                        <div className="text-course">
                            <p className="fs-5">
                                <TbCheckbox /> <span>Mục tiêu đầu ra</span>
                            </p>
                            <div
                                className="px-4"
                                dangerouslySetInnerHTML={{ __html: data?.desTarget }}
                            ></div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="text-course">
                            <p className="fs-5">
                                <TbCoin /> <span>Học phí</span>
                            </p>
                            <div
                                className="px-4"
                                dangerouslySetInnerHTML={{ __html: data?.desPrice }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: "#F3F8FF" }} className="py-3">
                <div className="text-center fs-4 m-5 fw-bold">Nội dung chương trình</div>
                <div className="w-75 d-block m-auto">
                    <table className="w-100 table-content-course">
                        <thead>
                            <tr>
                                <th>KỸ NĂNG</th>
                                <th>NỘI DUNG</th>
                            </tr>
                        </thead>
                        <tbody className="table-des-skill">
                            {data?.listening && (
                                <tr>
                                    <td>Listening</td>
                                    <td>
                                        <div
                                            dangerouslySetInnerHTML={{ __html: data?.listening }}
                                        ></div>
                                    </td>
                                </tr>
                            )}
                            {data?.reading && (
                                <tr>
                                    <td>Reading</td>
                                    <td>
                                        <div
                                            dangerouslySetInnerHTML={{ __html: data?.reading }}
                                        ></div>
                                    </td>
                                </tr>
                            )}
                            {data?.speaking && (
                                <tr>
                                    <td>Speaking</td>
                                    <td>
                                        <div
                                            dangerouslySetInnerHTML={{ __html: data?.speaking }}
                                        ></div>
                                    </td>
                                </tr>
                            )}
                            {data?.writing && (
                                <tr>
                                    <td>Writing</td>
                                    <td>
                                        <div
                                            dangerouslySetInnerHTML={{ __html: data?.writing }}
                                        ></div>
                                    </td>
                                </tr>
                            )}
                            {data?.grammer && (
                                <tr>
                                    <td>Grammer</td>
                                    <td>
                                        <div
                                            dangerouslySetInnerHTML={{ __html: data?.grammer }}
                                        ></div>
                                    </td>
                                </tr>
                            )}
                            {data?.vocabulary && (
                                <tr>
                                    <td>Vocabulary</td>
                                    <td>
                                        <div
                                            dangerouslySetInnerHTML={{ __html: data?.vocabulary }}
                                        ></div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <p className="fs-3 fw-bold m-5 text-center">LỊCH KHAI GIẢNG KHÓA HỌC</p>
                <div className="w-75 d-block mx-auto ">
                    <Table
                        dataSource={data1}
                        columns={columns}
                        pagination={false}
                        scroll={{ x: true }}
                    />
                </div>
            </div>
        </>
    );
}

export default CouseContent;
