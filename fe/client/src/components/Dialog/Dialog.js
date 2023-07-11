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

export const errorInfo = (title, content) => {
    Swal.fire({
        icon: "error",
        title: title,
        text: content,
        showConfirmButton: false,
        timer: 2500,
        customClass: {
            title: "fs-5 text-error",
        },
    });
};
export const info = (title, content) => {
    Swal.fire({
        icon: "warning",
        title: title,
        text: content,
        showConfirmButton: false,
        timer: 2500,
        customClass: {
            title: "fs-5 text-warning",
        },
    });
};

export const successInfo = (title) => {
    Swal.fire({
        icon: "success",
        title: title,
        showConfirmButton: false,
        timer: 1500,
        customClass: {
            title: "fs-5 text-success",
        },
    });
};
