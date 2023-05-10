import Swal from "sweetalert2";

export const successDialog = () => {
    Swal.fire({
        icon: "success",
        title: "LƯU THÀNH CÔNG",
        showConfirmButton: false,
        timer: 1000,
        customClass: {
            title: "fs-5 text-success",
        },
    });
};

export const deleteSuccess = () => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "XÓA THÀNH CÔNG",
        showConfirmButton: false,
        timer: 1000,
        customClass: {
            title: "fs-5 text-success",
        },
    });
};
export const exist = () => {
    Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Dữ liệu đã tồn tại trong hệ thống ",
    });
};
