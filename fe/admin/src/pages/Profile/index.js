import { useNavigate } from "react-router-dom";
import getCookie from "../../cookie/getCookie";
import InfoUser from "./Info";
import "./style.scss";
import { useEffect, useState } from "react";
function Profile() {
    const navigate = useNavigate();
    const [value, setValue] = useState(true);
    const user = getCookie("useradmin") ? JSON.parse(getCookie("useradmin")) : null;
   
    
    useEffect(() => {
        if (user === null) {
            navigate("/");
        } else {
            setValue(value);
        }
    }, [value]);
    
    return (
        <>
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
