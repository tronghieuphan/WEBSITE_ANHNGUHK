import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardLecture from "../../Card/CardLecture";
import teacher from "../../../assets/image/teacher.jpg";
import "./style.scss"
function SliderLecture() {
    const course = [
        {
            img: teacher,
            lecture: "Giảng viên",
            name: "Trọng hiếu",
            description:
                "Chương trình luyện thi TOEIC chất lượng cao cho người bắt đầu. Cam kết đầu ra từ 550 - 650+ trong thời gian ngắn.",
        },
        {
            img: teacher,
            lecture: "Giảng viên",
            name: "Trọng hiếu",
            description:
                "Chương trình luyện thi TOEIC chất lượng cao cho người bắt đầu. Cam kết đầu ra từ 550 - 650+ trong thời gian ngắn.",
        },
        {
            img: teacher,
            lecture: "Giảng viên",
            name: "Trọng hiếu",
            description:
                "Chương trình luyện thi TOEIC chất lượng cao cho người bắt đầu. Cam kết đầu ra từ 550 - 650+ trong thời gian ngắn.",
        },
        {
            img: teacher,
            lecture: "Giảng viên",
            name: "Trọng hiếu",
            description:
                "Chương trình luyện thi TOEIC chất lượng cao cho người bắt đầu. Cam kết đầu ra từ 550 - 650+ trong thời gian ngắn.",
        },
        {
            img: teacher,
            lecture: "Giảng viên",
            name: "Trọng hiếu",
            description:
                "Chương trình luyện thi TOEIC chất lượng cao cho người bắt đầu. Cam kết đầu ra từ 550 - 650+ trong thời gian ngắn.",
        },
    ];
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2500,
        pauseOnHover: true,
        speed: 500,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div>
            <Slider {...settings}>
                {course.map((value) => (
                    <div key={value.name}>
                        <h3>
                            <CardLecture data={value} />
                        </h3>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
export default SliderLecture;
