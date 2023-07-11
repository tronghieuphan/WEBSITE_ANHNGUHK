"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            user.hasMany(models.point, { foreignKey: "studentId" });
            // user.hasMany(models.classes, { foreignKey: "lectureId" });
            user.hasMany(models.registration, { foreignKey: "studentId" });
            user.hasMany(models.registration, { foreignKey: "staffRegis" });
            user.hasMany(models.registration, { foreignKey: "staffPayment" });
            user.hasMany(models.review, { foreignKey: "studentId" });
            user.hasMany(models.outstanding, { foreignKey: "studentId" });
            user.hasMany(models.consult, { foreignKey: "userId" });
            user.belongsToMany(models.classes, {
                through: models.detailClassesStudent,
                foreignKey: "studentId",
            });
        }
    }
    user.init(
        {
            firstName: DataTypes.STRING(30),
            lastName: DataTypes.STRING(30),
            gender: DataTypes.BOOLEAN,
            dateBirth: DataTypes.DATEONLY,
            email: DataTypes.STRING(50),
            phone: DataTypes.STRING(15),
            street: DataTypes.STRING(30),
            ward: DataTypes.STRING(30),
            district: DataTypes.STRING(30),
            city: DataTypes.STRING(30),
            image: DataTypes.TEXT,
            workPlace: DataTypes.STRING(100),
            active: DataTypes.BOOLEAN,
            experience: DataTypes.STRING,
            specialize: DataTypes.STRING,
            description: DataTypes.TEXT,
            position: DataTypes.STRING(30),
            department: DataTypes.STRING(50),
            degree: DataTypes.STRING,
            typeUser: DataTypes.STRING(1),
            userName: DataTypes.STRING,
            passWord: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "user",
        }
    );
    return user;
};
