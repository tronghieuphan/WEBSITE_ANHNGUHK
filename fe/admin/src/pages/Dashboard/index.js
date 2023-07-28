import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUsers,
    faBook,
    faCircleDollarToSlot,
    faChartSimple,
} from "@fortawesome/free-solid-svg-icons";
import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    Tooltip,
    Legend,
    Title,
    CategoryScale,
    LinearScale,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import "./style.scss";
import dashboardAPI from "../../services/dashboardAPI";
import { useEffect, useState } from "react";
import { VND } from "../../utils/formatVND";
function Dashboard() {
    ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

    //Set UseState

    const [value, setValue] = useState();

    //

    const data = {
        labels: ["Thành viên", "Học viên", "Giảng viên", "Nhân viên", "Admin"],
        datasets: [
            {
                label: "là",
                data: value?.objuser,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(167, 179, 255,0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(101, 122, 255,1)",
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Thông tin chi tiét doanh thu",
            },
            padding: {
                top: 10,
                bottom: 10,
            },
            font: {
                size: 50,
                style: "italic",
            },
        },
    };

    const labels = value?.month;

    const data1 = {
        labels,
        datasets: [
            {
                label: "Tổng thu",
                data: value?.tol,
                backgroundColor: "rgba(249, 255, 79, 0.6)",
            },
            {
                label: "Chiết khấu",
                data: value?.dis,
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
            {
                label: "Lợi nhuận",
                data: value?.amo,
                backgroundColor: "rgba(76, 222, 151,0.5)",
            },
        ],
    };

    const getAllDash = async () => {
        let data = await dashboardAPI.getAll();
        setValue(data.data.data);
    };

    useEffect(() => {
        getAllDash();
    }, []);
    return (
        <>
            <div className="m-2 px-1 text-muted">
                <div className=" fw-bold ">
                    <div className="row w-100">
                        <div className="col-md-3">
                            <div className="p-3 box-dashboard border1">
                                <div className="d-flex ">
                                    <div className="w-75">
                                        <div className="title-dash">Số lượng người dùng :</div>
                                        <div className="fs-5">{value?.user}</div>
                                    </div>
                                    <div className="w-25 d-flex justify-content-center align-items-center">
                                        <div className="bg-dashboard-icon bg-dash-icon1">
                                            <FontAwesomeIcon icon={faUsers} className="color1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 ">
                            <div className="p-3 box-dashboard border2">
                                <div className="d-flex">
                                    <div className="w-75">
                                        <div className="title-dash">Lượt đăng ký tư vấn :</div>
                                        <div className="fs-5">
                                            {value?.consult}
                                            {value?.consultNot === 0 ? (
                                                ""
                                            ) : (
                                                <span style={{ fontSize: "10px", color: "red" }}>
                                                    ( Còn {value?.consultNot} chưa xử lý )
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-25 d-flex justify-content-center align-items-center">
                                        <div className="bg-dashboard-icon bg-dash-icon2 ">
                                            <FontAwesomeIcon
                                                icon={faChartSimple}
                                                className="color2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 ">
                            <div className="p-3 box-dashboard border3">
                                <div className="d-flex">
                                    <div className="w-75">
                                        <div className="title-dash">Doanh thu :</div>
                                        <div className="fs-5">{VND.format(value?.price)}</div>
                                    </div>
                                    <div className="w-25 d-flex justify-content-center align-items-center">
                                        <div className="bg-dashboard-icon bg-dash-icon3">
                                            <FontAwesomeIcon
                                                icon={faCircleDollarToSlot}
                                                className="color3"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 ">
                            <div className="p-3 box-dashboard border4">
                                <div className="d-flex">
                                    <div className="w-75">
                                        <div className="title-dash">Số tài liệu :</div>
                                        <div className="fs-5">{value?.book}</div>
                                    </div>
                                    <div className="w-25 d-flex justify-content-center align-items-center">
                                        <div className="bg-dashboard-icon bg-dash-icon4">
                                            <FontAwesomeIcon icon={faBook} className="color4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div className="row w-100">
                    <div className="col-md-8">
                        <div className="box-chart-line">
                            <div className="p-3 fs-3">
                                <Bar options={options} data={data1} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="box-chart-icon">
                            <div className="fw-bold p-3"> Người dùng:</div>
                            <Doughnut data={data} />
                            <br />
                        </div>
                    </div>
                </div>
                {/* <div className="row">
                    <div className="col-md-8"></div>
                </div> */}
            </div>
        </>
    );
}

export default Dashboard;
