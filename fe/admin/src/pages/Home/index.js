import Animation from "./Animation";
function Content() {
    return (
        <>
            <div className="m-4 ">
                <div className="p-4 text-muted fw-bold text-center">
                    <p className="fs-3">
                        CHỦ ĐỀ : XÂY DỰNG WEBSITE ĐĂNG KÝ KHÓA HỌC TẠI <br />
                        TRUNG TÂM ANH NGỮ HK
                    </p>
                    <p className="fs-4">Môn học: Luận văn tốt nghiệp</p>
                    <p className="fs-4">Giảng viên hướng dẫn: ThS. Nguyễn Trường Hải</p>
                    <p className="fs-5">Họ và tên sinh viên:</p>
                    <p className="fs-5">Phan Trọng Hiếu - DH51903591</p>
                </div>
                <div className="position-absolute bottom-0 end-0 m-5">
                    <Animation />
                </div>
            </div>
        </>
    );
}

export default Content;
