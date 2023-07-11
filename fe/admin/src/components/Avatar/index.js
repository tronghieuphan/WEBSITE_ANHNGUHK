import { UserOutlined } from "@ant-design/icons";
import { MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Avatar, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import removeCookie from "../../cookie/removeCookie";
import getCookie from "../../cookie/getCookie";
function AvatarDrop() {
    const user = getCookie("useradmin") ? JSON.parse(getCookie("useradmin")) : null;

    const navigate = useNavigate();
    const items = [
        {
            key: "1",
            label: "Profile",
            icon: <CgProfile />,
            onClick: () => {
                navigate("/profile");
            },
        },
        {
            key: "2",
            label: "Logout",
            icon: <MdLogout />,
            onClick: () => {
                removeCookie("useradmin");
                navigate("/");
            },
        },
    ];
    return (
        <>
            <div>
                <Dropdown
                    menu={{
                        items,
                    }}
                    placement="bottom"
                    className="mt-5"
                >
                    <a onClick={(e) => e.preventDefault()}>
                        {user?.image ? (
                            <Avatar size="large" src={user?.image} />
                        ) : (
                            <Avatar size="large" className="fs-4 fw-bold">
                                {user?.lastName}
                            </Avatar>
                        )}
                    </a>
                </Dropdown>
            </div>
        </>
    );
}

export default AvatarDrop;
