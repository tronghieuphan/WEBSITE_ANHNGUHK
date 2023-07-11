import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import imgbook from "../../../assets/image/book.PNG";
import filebook from "../../../assets/file/book.pdf";
import "./style.scss";
import CardDocument from "../../Card/CardDocument";
function SliderDoccument(props) {
    const { listDocType } = props;
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1332,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 930,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
        ],
    };
    return (
        <div className="w-100">
            <Slider {...settings}>
                {listDocType?.map((value) => (
                    <div key={value.name}>
                        <CardDocument data={value} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default SliderDoccument;
