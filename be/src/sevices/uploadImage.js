const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
    cloud_name: "dt2bxtoc3",
    api_key: "858865243562678",
    api_secret: "80x9AZsUUJHNJulocZwP6MUp20g",
});

// Upload
let uploadImage = async (dataImage, nameImage) => {
    return new Promise(async (resolve, reject) => {
        try {
            await cloudinary.uploader.upload_large(
                dataImage,
                {
                    public_id: `document/${nameImage}`,
                },
                (err, result) => {
                    if (err) console.log(err);
                    if (result) {
                        resolve(result);
                    }
                }
            );
            // res.then((data) => {
            //     console.log(data);
            //     console.log(data.secure_url);
            //     resolve(data);
            // }).catch((err) => {
            //     console.log(err);
            // });
        } catch (e) {
            reject(e);
        }
    });
};

export default uploadImage;
