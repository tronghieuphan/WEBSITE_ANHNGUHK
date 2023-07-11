import TitlePage from "../../components/TitlePage";
import "./style.scss";
import "animate.css";
import hinh from "../../assets/image/banner-search.png";
import { useParams } from "react-router-dom";
import { Segmented } from "antd";
import CouseContent from "../../components/Content/Course";
import courseAPI from "../../services/courseAPI";
import { useEffect } from "react";
import { useState } from "react";

function Course() {
    const { idType } = useParams();
    const [idCourse, setValueCourse] = useState("");
    const [detailCourse, setValueDetailCourse] = useState();
    const [detailCourseClass, setValueDetailCourseClass] = useState();
    const [listCourse, setListCourse] = useState();
    const tilte = {
        label: "CHƯƠNG TRÌNH LUYỆN THI ",
        style: "TOEIC",
        img: hinh,
    };

    const getCourseBy = async () => {
        let data = await courseAPI.getCourseBeLongType({ datafind: idType });
        setListCourse(data.data.data);
    };
    const findOneCourse = async () => {
        let data = await courseAPI.findCourse({ datafind: idCourse });
        setValueDetailCourse(data.data.data);
        setValueDetailCourseClass(data.data.data1);
    };

    useEffect(() => {
        getCourseBy();
    }, [idType]);
    useEffect(() => {
        findOneCourse();
    }, [idCourse]);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    return (
        <>
            <TitlePage data={tilte} />
            <div
                className={
                    idCourse === ""
                        ? "animate__bounceIn animate__delay-5s"
                        : "animate__bounceOut animate__delay-3s d-none"
                }
            >
                <div className="fs-4 fw-bold text-center my-5 text-muted">
                    Mời bạn chọn khóa học mà bạn muốn xem
                </div>
            </div>
            <Segmented
                options={listCourse?.map((item) => ({
                    label: (
                        <div>
                            <div className="text">{item?.nameCourse}</div>
                        </div>
                    ),
                    value: item?.id,
                }))}
                onChange={(e) => setValueCourse(e)}
            />
            {idCourse && (
                <CouseContent data={detailCourse} data1={detailCourseClass} scroll={{ x: true }} />
            )}
        </>
    );
}

export default Course;
