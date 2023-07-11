import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardComment from "../../Card/CardComment";
import reviewAPI from "../../../services/reviewAPI";
import "./style.scss";
import { useEffect, useState } from "react";
function SliderComment() {
    const [listReview, setListReview] = useState();

    const getAllReview = async () => {
        try {
            const response = await reviewAPI.getReview();
            setListReview(response.data.data);
        } catch (err) {
            throw new Error(err);
        }
    };
    useEffect(() => {
        getAllReview();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    infinite: true,
                    dots: true,
                },
            },
        ],
    };
    return (
        <div>
            <Slider {...settings}>
                {listReview?.map((value) => (
                    <div key={value.id}>
                        <CardComment data={value} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default SliderComment;
