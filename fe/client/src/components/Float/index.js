import { FloatButton } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/image/banner-search.png";
import { TbMessage } from "react-icons/tb";
import { SiZalo } from "react-icons/tb";
import "./style.scss";
function Float() {
    return (
        <>
            <FloatButton.Group
                trigger="hover"
                type="primary"
                style={{
                    right: 50,
                    textAlign: "center",
                }}
                icon={<TbMessage />}
            >
                <FloatButton className="btn-mes" />
                <FloatButton />
            </FloatButton.Group>
        </>
    );
}
export default Float;
