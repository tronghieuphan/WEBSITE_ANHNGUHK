import NavbarMenu from "../../components/Navbar";
import Footer from "../../components/Footer";
import "react-slideshow-image/dist/styles.css";
import "./style.scss";
import aos from "aos";
import "aos/dist/aos.css";
import Slide from "../../components/Slide/SliderIntro";
import CardCourse from "../../components/Card/CardCourse";
import logo from "../../assets/image/IELTS.png";
import SliderLecture from "../../components/Slide/SliderLecture";
import { useEffect } from "react";
function Home() {
    useEffect(() => {
        aos.init();
    }, []);
    const course = [
        {
            img: logo,
            name: "Toeic",
            description:
                "Chương trình luyện thi TOEIC chất lượng cao cho người bắt đầu. Cam kết đầu ra từ 550 - 650+ trong thời gian ngắn.",
        },
        {
            img: logo,
            name: "Iels",
            description:
                "Chương trình luyện thi TOEIC chất lượng cao cho người bắt đầu. Cam kết đầu ra từ 550 - 650+ trong thời gian ngắn.",
        },
        {
            img: logo,
            name: "Giao tiếp",
            description:
                "Chương trình luyện thi TOEIC chất lượng cao cho người bắt đầu. Cam kết đầu ra từ 550 - 650+ trong thời gian ngắn.",
        },
    ];
    return (
        <>
            <NavbarMenu />
            <div className="banner">
                <div className="d-flex align-items-center h-100 w-100 justify-content-center">
                    <div className="box-header-nav text-center">
                        <div>
                            <span className="home-title">
                                ANH NGỮ HK EDU • Phương pháp học hiệu quả
                            </span>
                            <br />
                            <span className="home-title-under"> Smart Blended Learning</span>
                            <br />
                            <div className="d-flex h-100 w-100 align-items-center justify-content-center text-center ">
                                <div className="home-register-button">
                                    Đăng ký
                                    <br />
                                    ngay !
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="text-center text-title">
                    <span className="title-span-1">
                        CHÀO BẠN ĐÃ ĐẾN VỚI TRUNG TÂM ANH NGỮ HK EDU
                    </span>
                    <br />
                    <span className="title-span-2">
                        Với <span className="title-span-3">HK EDU</span> chúng tôi luôn dành cho
                        khách hành những trãi nghiệm tuyệt vời khi đến đây
                    </span>
                </div>
                <div className="my-5 mx-5">
                    <Slide />
                </div>
            </div>
            <div className="decor-bar" style={{ marginTop: "100px" }}></div>
            <div>
                <div className="text-center text-title">
                    <span className="title-course-home">
                        Chương trình phù hợp cho <span>mọi yêu cầu</span>
                    </span>
                </div>
                <div className="row w-100 d-flex justify-content-center ">
                    {course.map((value, index) => {
                        let i = 1000 * (index + 1);
                        return (
                            <div
                                className="col-md-3 m-3 d-flex justify-content-center"
                                key={value.name}
                                data-aos="zoom-in-up"
                                data-aos-duration={i}
                            >
                                <CardCourse data={value} />
                            </div>
                        );
                    })}
                </div>
                {/* <div>
                    <div
                        data-aos="fade-right"
                        data-aos-duration="1500"
                        data-aos-easing="ease-in-sine"
                        data-aos-delay="300"
                    >
                        <div className="text-center text-title">
                            <span className="title-course-home">
                                Cảm nhận học viên <span>chuyên nghiệp</span>
                            </span>
                        </div>
                    </div>
                    <div
                        style={{ width: "85%" }}
                        className="d-block mx-auto mb-5"
                        data-aos="fade-left"
                        data-aos-duration="1500"
                        data-aos-delay="300"
                    >
                        <SliderLecture />
                    </div>
                </div> */}
                <div>
                    <div
                        data-aos="fade-right"
                        data-aos-duration="1500"
                        data-aos-easing="ease-in-sine"
                        data-aos-delay="300"
                    >
                        <div className="text-center text-title">
                            <span className="title-course-home">
                                Đội ngũ giảng viên <span>chuyên nghiệp</span>
                            </span>
                        </div>
                    </div>
                    <div
                        style={{ width: "85%" }}
                        className="d-block mx-auto mb-5"
                        data-aos="fade-left"
                        data-aos-duration="1500"
                        data-aos-delay="300"
                    >
                        <SliderLecture />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default Home;
