import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import classesAPI from "../../../services/classesAPI";
import CardClasses from "../../../components/Card/CardClasses";
import "./style.scss";
import getCookie from "../../../cookie/getCookie";
function PointList() {
    const user = getCookie("useradmin") ? JSON.parse(getCookie("useradmin")) : null;

    const [listClasses, setListClasses] = useState([]);
    const [idClasses, setIdClasses] = useState();
    //Gọi API
    const getAllClasses = async () => {
        try {
            // setLoading(true);
            const response = await classesAPI.getListLecClas(user);
            setListClasses(response.data.data);
            // setLoading(false);
        } catch (err) {
            throw new Error(err);
        }
    };
    useEffect(() => {
        getAllClasses();
    }, []);
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.8 } }}
            >
                <div className="text-muted">
                    <div className="">
                        <p className="fs-4 fw-bold">DANH SÁCH ĐIỂM</p>
                        <>
                            <div className="d-flex flex-wrap">
                                {listClasses?.data?.map((values) => (
                                    <div key={values.id}>
                                        <CardClasses value={values} setIdClasses={setIdClasses} />
                                    </div>
                                ))}
                            </div>
                        </>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default PointList;
