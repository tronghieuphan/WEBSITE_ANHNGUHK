import { NavLink } from "react-router-dom";
import { AiOutlineRead } from "react-icons/ai";
import { MdOutlineBook } from "react-icons/md";
import "./style.scss";
function Fill() {
    return (
        <>
            <div>
                <div className="w-100">
                    <div className="box-document d-flex">
                        <NavLink
                            to="/review"
                            className="text-decoration-none nav-link-fill"
                            activeclassname="active"
                        >
                            <div className="border-fill">
                                <MdOutlineBook /> REVIEW
                            </div>
                        </NavLink>

                        <NavLink to="/outstanding" className="text-decoration-none nav-link-fill">
                            <div className="border-fill">
                                <AiOutlineRead /> ĐIỂM SỐ NỔI BẬT
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Fill;
