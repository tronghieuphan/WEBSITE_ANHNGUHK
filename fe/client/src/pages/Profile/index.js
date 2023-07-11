import TitlePage from "../../components/TitlePage";
import InfoUser from "./Info";
import hinh from "../../assets/image/banner-search.png";
import "./style.scss";
import getCookie from "../../cookie/getCookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Profile() {
    const tilte = {
        label: "THÔNG TIN TÀI KHOẢN ",
        style: "CÁ NHÂN",
        img: hinh,
    };
    const navigate = useNavigate();
    const [value, setValue] = useState(true);
    const user = getCookie("user") ? JSON.parse(getCookie("user")) : null;
   
    
    useEffect(() => {
        if (user === null) {
            navigate("/");
        } else {
            setValue(value);
        }
    }, [value]);
    
    return (
        <>
            <TitlePage data={tilte} />
            <div className="container-fluid w-100  ">
                <div className="d-flex justify-content-center align-items-center w-100">
                    <div className="box-user">
                        <p className="text-center bg-primary pt-2 text-light fs-4 fw-bold title-user">
                            THÔNG TIN CÁ NHÂN
                        </p>
                        <div
                            className="row mx-auto"
                            style={{ width: "90%", paddingBottom: "50px" }}
                        >
                            <InfoUser 
                            user={user} 
                            setValue={setValue} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
