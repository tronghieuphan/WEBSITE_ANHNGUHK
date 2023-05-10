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
            
            // user.hasMany(models.point, { foreignKey: "userId" });
            // user.hasOne(models.account, { foreignKey: "accountId" });
            // user.hasMany(models.classes, { foreignKey: "lectureId" });
            // user.hasMany(models.registration, { foreignKey: "studentId" });
            // user.hasMany(models.registration, { foreignKey: "staffId" });
            // user.hasMany(models.review, { foreignKey: "userId" });
            // user.belongsToMany(models.classes, {
            //     through: models.detailClassesStudent,
            //     foreignKey: "studentId",
            // });
            // user.belongsToMany(models.discount, {
            //     through: models.detailDiscountStudent,
            //     foreignKey: "studentId",
            // });
        }
    }
    user.init(
        {
            firstName: DataTypes.STRING(30),
            lastName: DataTypes.STRING(30),
            gender: DataTypes.BOOLEAN,
            dateBirth: DataTypes.DATE,
            email: DataTypes.STRING(50),
            phone: DataTypes.STRING(15),
            street: DataTypes.STRING(30),
            ward: DataTypes.STRING(30),
            district: DataTypes.STRING(30),
            city: DataTypes.STRING(30),
            image: DataTypes.TEXT,
            experience: DataTypes.STRING,
            specialize: DataTypes.STRING,
            description:DataTypes.TEXT,
            position: DataTypes.STRING(30),
            degree: DataTypes.STRING,
            typeUser: DataTypes.STRING(1),
            accountId: DataTypes.STRING(8),
        },
        {
            sequelize,
            modelName: "user",
        }
    );
    return user;
};
