import TitlePage from "../../components/TitlePage";
import "./style.scss";
import CardDocument from "../../components/Card/CardDocument";
import hinh from "../../assets/image/banner-search.png";
import { useState, useEffect } from "react";
import documentAPI from "../../services/documentAPI";
import { Segmented, Input } from "antd";
import typeAPI from "../../services/typeAPI ";
const { Search } = Input;

function Document() {
    const [listDocument, setListDocument] = useState();
    const [listType, setListType] = useState([]);
    const [find, setFind] = useState();
    const tilte = {
        label: "DOWNLOAD TÀI LIỆU",
        style: "MIỄN PHÍ",
        img: hinh,
    };
    const getAllDocument = async () => {
        try {
            const response = await documentAPI.getAll();
            setListDocument(response.data.data);
        } catch (err) {
            throw new Error(err);
        }
    };
    const getAllType = async () => {
        try {
            const response = await typeAPI.getAll();
            setListType(response.data.data);
        } catch (err) {
            throw new Error(err);
        }
    };
    let getDocumentByType = async (e) => {
        const data = await documentAPI.findAllDocumentByType({ datafind: e });
        setListDocument(data.data.data);
    };
    let fill = [{ id: "", nameType: "All" }];
    listType?.map((item) => {
        fill.push(item);
    });
    useEffect(() => {
        getAllDocument();
        getAllType();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    const onSearch = async (value) => {
        let data = await documentAPI.findAllDocumentByName({ nameDocument: value });
        setListDocument(data.data.data);
        setFind(value);
    };

    return (
        <>
            <TitlePage data={tilte} />
            {find != undefined ? (
                <>
                    <div className="my-3">
                        <div className=" d-flex justify-content-center">
                            <Search
                                placeholder="Bạn muốn tìm gì ...."
                                onSearch={onSearch}
                                className="my-3 w-25"
                            />
                        </div>
                        <div className="fs-5 fw-bold text-muted text-center">
                            Bạn đang tìm:
                            <span className="fst-italic fw-bold text-primary">
                                {find === "" ? "Tất cả" : find}
                            </span>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Segmented
                        options={fill?.map((item) => ({
                            label: (
                                <div>
                                    <div className="text">{item?.nameType}</div>
                                </div>
                            ),
                            value: item?.id,
                        }))}
                        onChange={(e) => getDocumentByType(e)}
                    />

                    <div className=" d-flex justify-content-center">
                        <Search
                            placeholder="input search text"
                            onSearch={onSearch}
                            className="my-3 w-25"
                        />
                    </div>
                </>
            )}
            <div>
                <div
                    className="row"
                    style={{ margin: "0px 8%" }}
                    // className="d-flex flex-wrap justify-content-center p-3"
                >
                    {listDocument?.map((value) => (
                        <div className="col-md-4 " key={value.id}>
                            <CardDocument data={value} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Document;
