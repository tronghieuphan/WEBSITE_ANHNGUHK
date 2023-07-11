import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./style.scss";
const Slide = () => {
    return (
        <div>
            <Fade duration={2000} transitionDuration={2000} autoplay={true}>
                <div className="each-slide">
                    <div>
                        <img src="https://res.cloudinary.com/dt2bxtoc3/image/upload/v1687294693/03-min_z4gzcq.png" />
                    </div>
                    <p style={{ width: "40%" }}>
                        <div className="fs-5 " style={{lineHeight:"40px"}}>
                            <span className="fw-bold">Cơ sở vật chất hiện đại</span> <br />
                            <div className="fs-6 w-75 d-block m-auto">
                                Với trung trâm anh ngữ HK EDU thì trung tâm sẽ đầu tư trang thiết bị
                                hiện đại đễ hổ trợ tốt nhất cho các học viên tham gia học tập.
                            </div>
                        </div>
                    </p>
                </div>
                <div className="each-slide">
                    <p style={{ width: "40%" }}>
                        <div className="fs-5 " style={{lineHeight:"40px"}}>
                            <span className="fw-bold">Tự tin giao tiếp trong mọi nơi</span> <br />
                            <div className="fs-6 w-75 d-block m-auto">
                                Sau các khoa học trung tâm đảm bảo các học viên sẽ có được nhưng
                                kiến thức nên tảng trang bị cho bản thân có thể tự tin giao tiếp
                                vưới người bản xứ
                            </div>
                        </div>
                    </p>

                    <div>
                        <img src="https://res.cloudinary.com/dt2bxtoc3/image/upload/v1687294689/khoi-dong-nam-hoc-moi-voi-apollo-english1439790135_lfmfuh.jpg" />
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                        <img src="https://res.cloudinary.com/dt2bxtoc3/image/upload/v1687294689/cung-cap-giao-vien-nuoc-ngoai-tphcm_pmemsn.jpg" />
                    </div>
                    <p style={{ width: "40%" }}>
                        <div className="fs-5 " style={{lineHeight:"40px"}}>
                            <span className="fw-bold">Nhiều giảng viên nhiệt tình và tận tâm</span>{" "}
                            <br />
                            <div className="fs-6 w-75 d-block m-auto">
                                Trung tâm luôn tâm trong thể phục vụ tốt nhất cho học viên nên các
                                giảng viên tại trung tâm sẽ nhiệt tình giúp đữo mỗi khi học viên cần
                            </div>
                        </div>
                    </p>
                </div>
            </Fade>
        </div>
    );
};

export default Slide;
