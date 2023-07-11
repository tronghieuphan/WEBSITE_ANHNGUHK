import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";
import aos from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import typeAPI from "../../../services/typeAPI ";
import CardCourse from "../../Card/CardCourse";
function SliderType() {
    const [listType, setListType] = useState([]);
    const getAllType = async () => {
        try {
            const data = await typeAPI.getAll();
            setListType(data.data.data);
        } catch (err) {
            throw new Error(err);
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
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
                breakpoint: 960,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 680,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    useEffect(() => {
        aos.init();
        getAllType();
    }, []);
    return (
        <div>
            <Slider {...settings}>
                {listType?.map((value, index) => {
                    let i = 1000 * (index + 1);
                    return (
                        <div
                            className="col-md-3 d-flex justify-content-center w-100"
                            key={value.id}
                            data-aos="zoom-in-up"
                            data-aos-duration={i}
                        >
                            <CardCourse data={value} />
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}
export default SliderType;
