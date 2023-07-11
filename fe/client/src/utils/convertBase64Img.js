const convertBase64Img = async (img) => {
    return new Promise((resolve, reject) => {
        const file = new FileReader();
        file.readAsDataURL(img);
        file.onload = () => {
            resolve(file.result);
        };
        file.onerror = (err) => {
            reject(err);
        };
    });
};

export default convertBase64Img;
