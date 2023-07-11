import Fill from "../../components/Fill";
import TitlePage from "../../components/TitlePage";
import review from "../../assets/image/review.png";
import CardPointStudent from "../../components/Card/CardPointStudent";
import { useEffect, useState } from "react";
import outstandingAPI from "../../services/outstandingAPI";

function Outstanding() {
    const [listPoint, setListPoint] = useState([]);
    let getAllPoint = async () => {
        let data = await outstandingAPI.getAll();
        setListPoint(data.data.data);
    };
    useEffect(() => {
        getAllPoint();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const tilte = {
        label: "ĐIỂM SỐ NỔI BẬT CỦA",
        style: "HỌC VIÊN",
        img: review,
    };

    return (
        <>
            <TitlePage data={tilte} />
            <Fill />
            {/* DIEM TOEIC */}
            <div className="d-flex flex-wrap justify-content-center">
                {listPoint?.map((value) => {
                    return (
                        <div className="col-md-3 m-3 d-flex justify-content-center" key={value.id}>
                            <CardPointStudent data={value} />
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Outstanding;
