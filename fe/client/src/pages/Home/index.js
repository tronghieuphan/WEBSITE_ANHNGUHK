import "react-slideshow-image/dist/styles.css";
import "./style.scss";
import aos from "aos";
import "aos/dist/aos.css";
import Slide from "../../components/Slide/SliderIntro";
import CardCourse from "../../components/Card/CardCourse";
import SliderLecture from "../../components/Slide/SliderLecture";
import { useEffect, useState } from "react";
import SliderComment from "../../components/Slide/SlideComment";
import CardPointStudent from "../../components/Card/CardPointStudent";
import typeAPI from "../../services/typeAPI ";
import outstandingAPI from "../../services/outstandingAPI";
import reviewAPI from "../../services/reviewAPI";
import SliderType from "../../components/Slide/SliderType";

function Home() {
    //State
    const [listType, setListType] = useState();
    const [listOutstanding, setListOutstanding] = useState();

    const getAllCourse = async () => {
        try {
            const response = await typeAPI.getAll();
            setListType(response.data.data);
        } catch (err) {
            throw new Error(err);
        }
    };

    const getAllOutstanding = async () => {
        try {
            const response = await outstandingAPI.getAll();
            setListOutstanding(response.data.data);
        } catch (err) {
            throw new Error(err);
        }
    };

    useEffect(() => {
        getAllCourse();
        getAllOutstanding();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        aos.init();
    }, []);
    return (
        <>
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
                            <div className="d-flex h-100 align-items-center justify-content-center text-center ">
                                <a href="#course1" style={{ textDecoration: "none" }}>
                                    {" "}
                                    <div className="home-register-button">
                                        Đăng ký
                                        <br />
                                        ngay !
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div data-aos="zoom-in" data-aos-duration="3000">
                    <div className="text-center text-title">
                        <div className="title-span-1">
                            CHÀO BẠN ĐÃ ĐẾN VỚI TRUNG TÂM ANH NGỮ HK EDU
                        </div>
                        <br />
                        <span className="title-span-2">
                            Với <span className="title-span-3">HK EDU</span> chúng tôi luôn dành cho
                            khách hành những trãi nghiệm tuyệt vời khi đến đây
                        </span>
                    </div>
                </div>
                <div className="my-5 mx-5">
                    <Slide />
                </div>
            </div>
            <div className="decor-bar" style={{ marginTop: "100px" }}></div>
            <div className="w-100" id="course1">
                <div data-aos="zoom-in" data-aos-duration="1500">
                    <div>
                        <div className="text-center text-title">
                            <span className="title-course-home">
                                Chương trình phù hợp cho <span>mọi yêu cầu</span>
                            </span>
                        </div>
                    </div>

                    <div className="row d-flex justify-content-center w-100">
                        <SliderType />
                    </div>
                </div>
                <div style={{ backgroundColor: "#F3F8FF" }} className="pt-2">
                    <div
                        data-aos="zoom-in"
                        data-aos-duration="1500"
                        data-aos-easing="ease-in-sine"
                        data-aos-delay="300"
                    >
                        <div className="w-100">
                            <div className="text-center text-title">
                                <span className="title-course-home">
                                    Học viên <span>điểm cao</span>
                                </span>
                            </div>
                        </div>
                        <div className="w-100 d-flex flex-wrap justify-content-center ">
                            {listOutstanding?.map((value, index) => {
                                let i = 1000 * (index + 1);
                                return (
                                    <div
                                        className="col-md-3 m-3 d-flex justify-content-center"
                                        key={value.id}
                                        data-aos="zoom-in-up"
                                        data-aos-duration={i}
                                    >
                                        <CardPointStudent data={value} />
                                    </div>
                                );
                            })}
                        </div>
                        <div data-aos="zoom-in" data-aos-duration="2000">
                            <div
                                style={{ width: "85%" }}
                                className="d-block mx-auto mb-5 pb-2"
                            ></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        data-aos="zoom-in"
                        data-aos-duration="1500"
                        data-aos-easing="ease-in-sine"
                        data-aos-delay="300"
                    >
                        <div className="w-100">
                            <div className="text-center text-title">
                                <span className="title-course-home">
                                    Cảm nhận của <span>học viên</span>
                                </span>
                            </div>
                        </div>
                        <div data-aos="zoom-in" data-aos-duration="2000">
                            <div style={{ width: "85%" }} className="d-block mx-auto mb-5 pb-2">
                                <SliderComment />
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    data-aos="zoom-in"
                    data-aos-duration="1500"
                    data-aos-easing="ease-in-sine"
                    data-aos-delay="300"
                >
                    <div className="w-100">
                        <div className="text-center text-title">
                            <span className="title-course-home">
                                Đội ngũ giảng viên <span>chuyên nghiệp</span>
                            </span>
                        </div>
                        <div
                            style={{ width: "85%" }}
                            className="d-block mx-auto mb-5"
                            data-aos="fade-left"
                            data-aos-duration="2000"
                            data-aos-delay="300"
                        >
                            <SliderLecture />
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
}
export default Home;
