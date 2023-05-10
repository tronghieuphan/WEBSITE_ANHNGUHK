const { Sequelize, Model } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("trungtamanhngu", "root", null, {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Kết nối thành công");
    } catch (error) {
        console.error("Kết nối thất bại", error);
    }
};

module.exports = connectDB;
