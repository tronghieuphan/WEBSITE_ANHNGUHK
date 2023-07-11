import TitlePage from "../../components/TitlePage";
import lectureimg from "../../assets/image/lecture.png";
import CardLecture from "../../components/Card/CardLecture";
import userAPI from "../../services/userAPI";
import { useEffect, useState } from "react";

function Lecture() {
    const [listLecture, setListLecture] = useState();
    const tilte = {
        label: "ĐỘI NGŨ GIẢNG VIÊN",
        style: "CHUYÊN NGHIỆP",
        img: lectureimg,
    };

    const getAllCourse = async () => {
        try {
            const response = await userAPI.getAllTypeUser({ typeUser: "2" });
            setListLecture(response.data.data);
        } catch (err) {
            throw new Error(err);
        }
    };

    useEffect(() => {
        getAllCourse();
    }, []);

    return (
        <>
            <TitlePage data={tilte} />
            <div className="d-flex flex-wrap justify-content-center mx-5 ">
                {listLecture?.map((value) => (
                    <div key={value.id}>
                        <CardLecture data={value} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default Lecture;
