import { Modal, Button, Form, Input, Select, Checkbox } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./style.scss";
import { FiImage } from "react-icons/fi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import typeAPI from "../../../services/typeAPI ";
import convertBase64Img from "../../../utils/convertBase64Img";
function DetailDocument(props) {
    //Nhận props
    const { open, handleCreate, handleUpdate, setOpen } = props;
    //REDUX
    const { document } = useSelector((state) => state.dataAdd);
    //FORM
    const [form] = Form.useForm();
    //useState
    const [cbfile, setCbFile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageUpload, setImage] = useState();
    const [fileupload, setFile] = useState({});
    const [valueEditor, setValueEditor] = useState();
    const [description, setDiscription] = useState();
    const [fileUp, setFileUp] = useState();
    const [listType, setListType] = useState([]);

    //get all
    const getAllType = async () => {
        try {
            setLoading(true);
            const response = await typeAPI.getAll();
            setListType(response.data.data);
            setLoading(false);
        } catch (err) {
            throw new Error(err);
        }
    };
    // Convert data to base64
    useEffect(() => {
        getAllType();
    }, []);
    useEffect(() => {
        setDiscription(document.description);
        setFileUp(document.filepdf);
        form.setFieldsValue({
            id: document.id,
            nameDocument: document.nameDocument,
            releaseDate: document.releaseDate,
            author: document.author,
            similarTopic: document.similarTopic,
            description: document.description,
            level: document.level,
            image: document.image,
            typeId: document.typeId,
        });
    }, [document]);
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImage(e.target.files[0]);
    };

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        const data = new FormData();
        data.append("id", e.id);
        data.append("nameDocument", e.nameDocument);
        data.append("author", e.author);
        data.append("releaseDate", e.releaseDate);
        data.append("similarTopic", e.similarTopic);
        data.append("level", e.level);
        data.append("description", valueEditor);
        data.append("typeId", e.typeId);
        data.append("filepdf", fileupload);
        if (document.id) {
            data.append("image", e.image);
        } else {
            data.append("image", await convertBase64Img(imageUpload));
        }

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
                if (document.id) {
                    setLoading(true);
                    handleUpdate(data);
                    setLoading(false);
                }
                //CREATE
                else {
                    setLoading(true);
                    handleCreate(data);
                    form.resetFields();
                    setLoading(false);
                }
            }
        });
    };

    let type = [];
    listType?.map((item) => type.push({ id: item.id, name: item.nameType }));

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
                    <Form.Item label="Mã tài liệu" name="id" hidden={document.id ? false : true}>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="Tên tài liệu"
                        name="nameDocument"
                        rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                    >
                        <Input />
                    </Form.Item>
                    <div className="row d-flex justify-content-between">
                        <Form.Item
                            label="Nhà xuất bản"
                            name="author"
                            className="col-md-6"
                            rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Ngày sản xuất"
                            name="releaseDate"
                            className="col-md-6"
                            rules={[{ required: true, message: "Vui lòng chọn thông tin !" }]}
                        >
                            <Input type="date" />
                        </Form.Item>
                    </div>

                    <div className="row d-flex justify-content-between">
                        <Form.Item
                            label="Độ sát đề"
                            name="similarTopic"
                            rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                            className="col-md-6"
                        >
                            <Input type="number" min="1" max="5" />
                        </Form.Item>
                        <Form.Item
                            label="Độ khó"
                            name="level"
                            rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                            className="col-md-6"
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <Form.Item
                        label="Mã loại"
                        name="typeId"
                        // rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                    >
                        <Select
                            className="m-1 w-100"
                            showSearch
                            style={{
                                width: 200,
                            }}
                            placeholder="Chọn loại"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                            }
                            options={type.map((item) => ({
                                value: item.id,
                                label: item.name,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[{ required: true, message: "Vui lòng nhập thông tin !" }]}
                    >
                        <CKEditor
                            editor={ClassicEditor}
                            data={description || ""}
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
                                setValueEditor(data);
                            }}
                        />
                    </Form.Item>
                    <Checkbox className="my-1" onChange={() => setCbFile(!cbfile)}>
                      {document.id?("Chọn sửa file (*)"):"Chọn file tài liệu (*)"}  
                    </Checkbox>
                    {cbfile ? (
                        <Form.Item
                            name="filepdf"
                            // rules={[{ required: true, message: "Vui lòng chọ file !" }]}
                        >
                            <Input
                                type="file"
                                accept="application/pdf"
                                name="filepdf"
                                value={fileUp}
                                onChange={(e) => handleFile(e)}
                            />
                        </Form.Item>
                    ) : (
                        ""
                    )}
                    <Form.Item label="Hình ảnh" name="image" className="img">
                        <div className="box-img d-flex justify-content-center align-items-center rounded-3 ">
                            {(imageUpload || document?.id) && (
                                <img
                                    src={imageUpload?.preview || document?.image}
                                    alt=""
                                    name="image"
                                    className="img-preview"
                                />
                            )}
                            {imageUpload || document?.id ? (
                                ""
                            ) : (
                                <>
                                    <div className="fs-2 text-image">
                                        <FiImage className="mx-2" />
                                        <span className="fw-bold">Chọn ảnh</span>
                                    </div>{" "}
                                </>
                            )}
                            <Input
                                type="file"
                                placeholder="Chọn hình ảnh"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e)}
                            />
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" className="text-center">
                            {document.id ? "Lưu" : "Thêm"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default DetailDocument;
