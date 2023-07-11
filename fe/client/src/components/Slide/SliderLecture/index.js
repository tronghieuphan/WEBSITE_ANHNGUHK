import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardLecture from "../../Card/CardLecture";
import "./style.scss";
import { useEffect, useState } from "react";
import userAPI from "../../../services/userAPI";
function SliderLecture() {
    const [listLecture, setListLecture] = useState();

    const getAllLecture = async () => {
        try {
            const response = await userAPI.getAllTypeUser({ typeUser: "2" });
            setListLecture(response.data.data);
        } catch (err) {
            throw new Error(err);
        }
    };
    useEffect(() => {
        getAllLecture();
    }, []);
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
                breakpoint: 1220,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 630,
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
                {listLecture?.map((value) => (
                    <div key={value.id} className="d-flex justify-content-center">
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
