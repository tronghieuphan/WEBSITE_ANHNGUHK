import CardComment from "../../components/Card/CardComment";
import Fill from "../../components/Fill";
import TitlePage from "../../components/TitlePage";
import review from "../../assets/image/review.png";
import CardPointStudent from "../../components/Card/CardPointStudent";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { info, successDialog } from "../../components/Dialog/Dialog";
import { setDataReview } from "../../slices/dataAdd";
import reviewAPI from "../../services/reviewAPI";
import DetailReview from "./Detail.js";
import outstandingAPI from "../../services/outstandingAPI";
import getCookie from "../../cookie/getCookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import setCookie from "../../cookie/setCookie";
function Review() {
    const [hid, setHidden] = useState(1);
    const [open, setOpen] = useState(false);
    const [listPoint, setListPoint] = useState([]);
    const [listReview, setListReview] = useState([]);
    const user = getCookie("user") ? JSON.parse(getCookie("user")) : null;
    console.log("user: ", user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let getAllPoint = async () => {
        let data = await outstandingAPI.getAll();
        setListPoint(data.data.data);
    };
    let getAllReview = async () => {
        let data = await reviewAPI.getReview();
        setListReview(data.data.data);
    };

    useEffect(() => {
        getAllPoint();
        getAllReview();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const handleCreate = async (obj) => {
        const data = await reviewAPI.create(obj);
        if (data.data.message === "Create Successfully") {
            successDialog();
            getAllReview();
        }
    };
    const handleDataCreate = () => {
        if (!user) {
            Swal.fire({
                title: "Bạn hãy đăng nhập để được trải nghiệm",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "OK !",
                customClass: {
                    title: "fs-5 text-warning",
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    let obj = {
                        code: "pagereview",
                    };
                    navigate("/login");
                    setCookie("review", JSON.stringify(obj));
                }
            });
        } else if (user?.typeUser !== "1") {
            info("Rất tiếc !", "Chỉ những học viên của trung tâm mới được đánh giá trung tâm");
        } else {
            setOpen(!open);
            dispatch(setDataReview([]));
        }
    };

    const tilte = {
        label: "REVIEW TỪ",
        style: "HỌC VIÊN",
        img: review,
    };

    return (
        <>
            <TitlePage data={tilte} />
            <Fill />
            <Button className="d-block m-auto" onClick={handleDataCreate}>
                Tạo đánh giá
            </Button>
            <DetailReview handleCreate={handleCreate} open={open} setOpen={setOpen} />
            {/* REVIEW */}
            <div className={hid === 1 ? "d-block" : "d-none"}>
                <div className="d-flex flex-wrap justify-content-center">
                    {listReview?.map((value) => (
                        <div className="m-3" key={value.name}>
                            <CardComment data={value} />
                        </div>
                    ))}
                </div>
            </div>

            {/* DIEM TOEIC */}
            <div className={hid === 2 ? "d-block" : "d-none"}>
                <div className="d-flex flex-wrap justify-content-center">
                    {listPoint?.map((value) => {
                        return (
                            <div
                                className="col-md-3 m-3 d-flex justify-content-center"
                                key={value.id}
                            >
                                <CardPointStudent data={value} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Review;
