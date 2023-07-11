import TitlePage from "../../components/TitlePage";
import about from "../../assets/image/about.png";
import icon1 from "../../assets/image/icon1.png";
import icon2 from "../../assets/image/icon2.png";
import icon3 from "../../assets/image/icon3.png";
import Iframe from "react-iframe";
import "./style.scss";
import { useEffect } from "react";
function About() {
    const tilte = {
        label: "LIÊN HỆ VỚI",
        style: "CHÚNG TÔI",
        img: about,
    };
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    return (
        <>
            <TitlePage data={tilte} />
            <div className="m-5 text-center">
                <p className="fs-2 fw-bold">TRUNG TÂM ANH NGỮ HK EDU</p>
                <cite className="text-muted">
                    Liên hệ HK EDU để được tư vấn lộ trình học phù hợp dành cho bạn.
                </cite>
                <div className="row w-100 d-flex justify-content-center mt-5">
                    <div className="col-md-3 m-2">
                        <img src={icon1} alt="" width={60} />
                        <p className="fs-4 fw-bold p-none">Call Us</p>
                        <a className="text-decoration-none">
                            <p className="fs-6">089333808</p>
                        </a>
                    </div>
                    <div className="col-md-3 m-2 mid">
                        <img src={icon2} alt="" width={70} />
                        <p className="fs-4 fw-bold p-none">Email Us</p>
                        <a
                            className="text-decoration-none "
                            href="mailto:hkeducation.090801@gmail.com"
                        >
                            <p className="fs-6">hkeducation.090801@gamil.com</p>
                        </a>
                    </div>
                    <div className="col-md-3 m-2">
                        <img src={icon3} alt="" width={70} />
                        <p className="fs-4 fw-bold p-none">Chat With Us</p>
                        <a
                            className="text-decoration-none"
                            href="https://www.facebook.com/messages/t/118758061254347"
                        >
                            <p className="fs-6">FB: Hk edu</p>
                        </a>
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: "#f3f8ff" }} className="w-100 py-5">
                <div className="d-flex">
                    <div className="text-start w-75 px-5 m-4">
                        <p className="fs-4 fw-bold">ĐỊA CHỈ</p>

                        <p>Số 180 Cao Lỗ, phường 4, quận 8, TP. Hồ Chí Minh</p>
                    </div>
                    <a
                        href="https://goo.gl/maps/XnFD4tazY4oUT16E8"
                        class="main-btn blue-trans-btn map-intro-btn btn-map"
                    >
                        XEM CHỈ ĐƯỜNG
                    </a>
                </div>
                <Iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.9544104258935!2d106.67525717469653!3d10.737997189408453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f62a90e5dbd%3A0x674d5126513db295!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgU8OgaSBHw7Ju!5e0!3m2!1svi!2s!4v1683997792525!5m2!1svi!2s"
                    width="1200"
                    height="450"
                    style={{ border: "0" }}
                    allowfullscreen={true}
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    className="d-block m-auto"
                ></Iframe>
            </div>
        </>
    );
}

export default About;
