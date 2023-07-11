import { Modal, Button, Form, Input, Select, Checkbox } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import typeAPI from "../../../services/typeAPI ";
import discountAPI from "../../../services/discountAPI";
import classifyAPI from "../../../services/classifyAPI";

function DetailCousre(props) {
    //Nhận props
    const { open, handleCreate, handleUpdate, setOpen } = props;
    //REDUX
    const { course } = useSelector((state) => state.dataAdd);
    //FORM
    const [form] = Form.useForm();
    //useState
    const [loading, setLoading] = useState(false);

    const [valueDesClassify, setValueDesClassify] = useState();
    const [valueDesTime, setValueDesTime] = useState();
    const [valueDesPrice, setValueDesPrice] = useState();
    const [valueDesTarget, setValueDesTarget] = useState();
    const [valueDesListening, setValueDesListening] = useState();
    const [valueDesReading, setValueDesReading] = useState();
    const [valueDesSpeaking, setValueDesSpeaking] = useState();
    const [valueDesWriting, setValueDesWriting] = useState();
    const [valueDesGrammer, setValueDesGrammer] = useState();
    const [valueDesVocabulary, setValueDesVocabulary] = useState();

    const [desClassify, setdesClassify] = useState();
    const [desTime, setdesTime] = useState();
    const [desPrice, setdesPrice] = useState();
    const [desTarget, setdesTarget] = useState();
    const [desListening, setdesListening] = useState();
    const [desReading, setdesReading] = useState();
    const [desWriting, setdesWriting] = useState();
    const [desSpeaking, setdesSpeaking] = useState();
    const [desGrammer, setdesGrammer] = useState();
    const [desVocabulary, setdesVocabulary] = useState();

    const [listType, setListType] = useState([]);
    const [listDiscount, setListDiscount] = useState([]);
    console.log('listDiscount: ', listDiscount);
    const [listClassify, setListClassify] = useState([]);

    const [valueType, setValueType] = useState();

    const [cblisten, setCbListen] = useState(false);
    const [cbreading, setCbReading] = useState(false);
    const [cbwriting, setCbWriting] = useState(false);
    const [cbspeaking, setCbSpeaking] = useState(false);
    const [cbgrammer, setCbGrammer] = useState(false);
    const [cbvocabulary, setCbVocabulary] = useState(false);
    const [cb, setValueCb] = useState(false);
    //GET API
    const getAllType = async () => {
        try {
            const data = await typeAPI.getAll();
            setListType(data.data.data);
        } catch (err) {
            throw new Error(err);
        }
    };
    const getAllDiscount = async () => {
        try {
            const data = await discountAPI.getAllActive();
            setListDiscount(data.data.data);
        } catch (err) {
            throw new Error(err);
        }
    };
    const getAllClassify = async () => {
        try {
            const data = await classifyAPI.getAll();
            setListClassify(data.data.data);
        } catch (err) {
            throw new Error(err);
        }
    };

    useEffect(() => {
        getAllType();
        getAllDiscount();
        getAllClassify();
    }, []);
    useEffect(() => {
        if (course) {
            setdesClassify(course?.desClassify);
            setdesPrice(course?.desPrice);
            setdesTime(course?.desTime);
            setdesTarget(course?.desTarget);
            setdesListening(course?.desListening);
            setdesReading(course?.desReading);
            setdesWriting(course?.desWriting);
            setdesSpeaking(course?.desSpeaking);
            setdesGrammer(course?.desGrammer);
            setdesVocabulary(course?.desVocabulary);
        }

        form.setFieldsValue({
            id: course?.id,
            nameCourse: course?.nameCourse,
            lesson: course?.lesson,
            price: course?.price,
            desTime: course?.desTime,
            desTarget: course?.desTarget,
            desClassify: course?.desClassify,
            desPrice: course?.desPrice,
            listening: course?.listening,
            reading: course?.reading,
            speaking: course?.speaking,
            writing: course?.writing,
            grammer: course?.grammer,
            vocabulary: course?.vocabulary,
            typeId: course?.typeId,
            discountId: course?.discountId,
            classifyId: course?.classifyId,
        });
    }, [course]);

    const handleOnchange = (value) => {
        setValueType(value);
    };

    const handleSubmit = async (e) => {
        let obj = {
            ...e,
            desClassify: valueDesClassify,
            desPrice: valueDesPrice,
            desTarget: valueDesTarget,
            desTime: valueDesTime,
            listening: valueDesListening,
            reading: valueDesReading,
            writing: valueDesWriting,
            speaking: valueDesSpeaking,
            grammer: valueDesGrammer,
            vocabulary: valueDesVocabulary,
        };
        console.log(obj);
        Swal.fire({
            title: "BẠN CÓ MUỐN LƯU THÔNG TIN?",
            confirmButtonText: "Lưu",
            showCancelButton: true,
            cancelButtonText: "Hủy",
            customClass: {
                title: "fs-5 text-dark",
                confirmButton: "bg-primary shadow-none",
                cancelButton: "bg-warning shadow-none",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                //UPDATE
                if (course?.id) {
                    setLoading(true);
                    handleUpdate(obj);
                    setLoading(false);
                }
                //CREATE
                else {
                    setLoading(true);
                    handleCreate(obj);
                    form.resetFields();
                    resetSkill();
                    setLoading(false);
                }
            }
        });
    };
    const resetSkill = () => {
        setCbGrammer(false);
        setCbListen(false);
        setCbReading(false);
        setCbSpeaking(false);
        setCbVocabulary(false);
        setCbWriting(false);
        setValueCb(false);
    };
    return (
        <>
            <Modal
                title={
                    <>
                        <div className="fs-4 fw-bold">Thông tin chi tiết</div>
                        <hr />
                    </>
                }
                centered
                open={open}
                okButtonProps={{
                    style: {
                        display: "none",
                    },
                }}
                cancelButtonProps={{
                    style: {
                        visibility: "hidden",
                    },
                }}
                className="my-3 "
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <Form layout="vertical" onFinish={handleSubmit} form={form} className="px-3">
                    <Form.Item label="Mã khóa học" name="id" hidden={course?.id ? false : true}>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Tên khóa học"
                        name="nameCourse"
                        rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                    >
                        <Input />
                    </Form.Item>
                    <div className="row d-flex justify-content-between">
                        <Form.Item
                            label="Bài học"
                            name="lesson"
                            className="col-md-6"
                            rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Học phí"
                            name="price"
                            className="col-md-6"
                            rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                        >
                            <Input type="number" />
                        </Form.Item>
                    </div>
                    <Form.Item
                        label="Mô tả đối tượng "
                        name="desClassify"
                        rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                    >
                        <CKEditor
                            editor={ClassicEditor}
                            data={desClassify || ""}
                            onReady={(editor) => {
                                editor.editing.view.change((writer) => {
                                    writer.setStyle(
                                        "height",
                                        "200px",
                                        editor.editing.view.document.getRoot()
                                    );
                                });
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setValueDesClassify(data);
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả mục tiêu "
                        name="desTarget"
                        rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                    >
                        <CKEditor
                            editor={ClassicEditor}
                            data={desTarget || ""}
                            onReady={(editor) => {
                                editor.editing.view.change((writer) => {
                                    writer.setStyle(
                                        "height",
                                        "200px",
                                        editor.editing.view.document.getRoot()
                                    );
                                });
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setValueDesTarget(data);
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả thời gian "
                        name="desTime"
                        rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                    >
                        <CKEditor
                            editor={ClassicEditor}
                            data={desTime || ""}
                            onReady={(editor) => {
                                editor.editing.view.change((writer) => {
                                    writer.setStyle(
                                        "height",
                                        "200px",
                                        editor.editing.view.document.getRoot()
                                    );
                                });
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setValueDesTime(data);
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả học phí "
                        name="desPrice"
                        rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                    >
                        <CKEditor
                            editor={ClassicEditor}
                            data={desPrice || ""}
                            onReady={(editor) => {
                                editor.editing.view.change((writer) => {
                                    writer.setStyle(
                                        "height",
                                        "200px",
                                        editor.editing.view.document.getRoot()
                                    );
                                });
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setValueDesPrice(data);
                            }}
                        />
                    </Form.Item>
                    <div className="my-3 fs-5 fw-bold text-center">
                        ----- THÔNG TIN KỸ NĂNG CUNG CẤP -----
                    </div>
                    <div className="text-center my-3">
                        <Checkbox checked={cblisten} onChange={() => setCbListen(!cblisten)}>
                            Listening
                        </Checkbox>
                        {cblisten ? (
                            <Form.Item name="listening" className="my-2">
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={desListening || ""}
                                    onReady={(editor) => {
                                        editor.editing.view.change((writer) => {
                                            writer.setStyle(
                                                "height",
                                                "200px",
                                                editor.editing.view.document.getRoot()
                                            );
                                        });
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setValueDesListening(data);
                                    }}
                                />
                            </Form.Item>
                        ) : (
                            ""
                        )}
                        <Checkbox
                            checked={cbreading}
                            className="my-2"
                            onChange={() => setCbReading(!cbreading)}
                        >
                            Reading
                        </Checkbox>
                        {cbreading ? (
                            <Form.Item name="reading" className="my-2">
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={desReading || ""}
                                    onReady={(editor) => {
                                        editor.editing.view.change((writer) => {
                                            writer.setStyle(
                                                "height",
                                                "200px",
                                                editor.editing.view.document.getRoot()
                                            );
                                        });
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setValueDesReading(data);
                                    }}
                                />
                            </Form.Item>
                        ) : (
                            ""
                        )}
                        <Checkbox
                            checked={cbwriting}
                            className="my-2"
                            onChange={() => setCbWriting(!cbwriting)}
                        >
                            Writing
                        </Checkbox>
                        {cbwriting ? (
                            <Form.Item name="writing" className="my-2">
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={desWriting || ""}
                                    onReady={(editor) => {
                                        editor.editing.view.change((writer) => {
                                            writer.setStyle(
                                                "height",
                                                "200px",
                                                editor.editing.view.document.getRoot()
                                            );
                                        });
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setValueDesWriting(data);
                                    }}
                                />
                            </Form.Item>
                        ) : (
                            ""
                        )}
                        <Checkbox
                            checked={cbspeaking}
                            className="my-2"
                            onChange={() => setCbSpeaking(!cbspeaking)}
                        >
                            Speaking
                        </Checkbox>
                        {cbspeaking ? (
                            <Form.Item name="speaking" className="my-2">
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={desSpeaking || ""}
                                    onReady={(editor) => {
                                        editor.editing.view.change((writer) => {
                                            writer.setStyle(
                                                "height",
                                                "200px",
                                                editor.editing.view.document.getRoot()
                                            );
                                        });
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setValueDesSpeaking(data);
                                    }}
                                />
                            </Form.Item>
                        ) : (
                            ""
                        )}
                        <Checkbox
                            checked={cbgrammer}
                            className="my-2"
                            onChange={() => setCbGrammer(!cbgrammer)}
                        >
                            Grammer
                        </Checkbox>
                        {cbgrammer ? (
                            <Form.Item name="grammer" className="my-2">
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={desGrammer || ""}
                                    onReady={(editor) => {
                                        editor.editing.view.change((writer) => {
                                            writer.setStyle(
                                                "height",
                                                "200px",
                                                editor.editing.view.document.getRoot()
                                            );
                                        });
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setValueDesGrammer(data);
                                    }}
                                />
                            </Form.Item>
                        ) : (
                            ""
                        )}
                        <Checkbox
                            checked={cbvocabulary}
                            className="my-2"
                            onChange={() => setCbVocabulary(!cbvocabulary)}
                        >
                            Vocabulary
                        </Checkbox>
                        {cbvocabulary ? (
                            <Form.Item name="vocabulary" className="my-2">
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={desVocabulary || ""}
                                    onReady={(editor) => {
                                        editor.editing.view.change((writer) => {
                                            writer.setStyle(
                                                "height",
                                                "200px",
                                                editor.editing.view.document.getRoot()
                                            );
                                        });
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setValueDesVocabulary(data);
                                    }}
                                />
                            </Form.Item>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="my-3 fs-5 fw-bold text-center">
                        ----- THÔNG TIN LIÊN QUAN -----
                    </div>
                    <div className="row">
                        <Form.Item
                            label="Mã loại"
                            name="typeId"
                            className={valueType === "L_0D474E" ? "col-md-4" : "col-md-6"}

                            // rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                        >
                            <Select
                                showSearch
                                placeholder="Chọn loại"
                                optionFilterProp="children"
                                onChange={handleOnchange}
                                filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                                options={listType?.map((item) => ({
                                    value: item.id,
                                    label: item.nameType,
                                }))}
                            />
                        </Form.Item>
                        {valueType === "L_0D474E" ? (
                            <>
                                <Form.Item
                                    label="Mã đối tượng"
                                    name="classifyId"
                                    className="col-md-4"

                                    // rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                                >
                                    <Select
                                        showSearch
                                        placeholder="Chọn đối tượng"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            (option?.label ?? "")
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        options={listClassify?.map((item) => ({
                                            value: item.id,
                                            label: item.nameClassify,
                                        }))}
                                    />
                                </Form.Item>
                            </>
                        ) : (
                            ""
                        )}
                        <Form.Item
                            label="Mã khuyến mãi"
                            name="discountId"
                            className={valueType === "L_0D474E" ? "col-md-4" : "col-md-6"}
                            // rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                        >
                            <Select
                                showSearch
                                placeholder="Chọn khuyến mãi"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                                options={listDiscount?.map((item) => ({
                                    value: item.id,
                                    label: item.nameDiscount + " - " + item.percent + "%",
                                }))}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item>
                        <Button htmlType="submit" className="d-block mx-auto">
                            {course?.id ? "Lưu" : "Thêm"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default DetailCousre;
