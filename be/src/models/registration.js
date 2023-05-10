"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class registration extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // registration.belongsTo(models.registration, { foreignKey: "studentId" });
            // registration.belongsTo(models.registration, { foreignKey: "staffId" });
            // registration.belongsToMany(models.course, {
            //     through: models.detailRegistration,
            //     foreignKey: "registerId",
            // });
        }
    }
    registration.init(
        {
            regisDate: DataTypes.DATE,
            total: DataTypes.INTEGER,
            studentId: DataTypes.STRING(8),
            staffId: DataTypes.STRING(8),
            methodId: DataTypes.STRING(8),
        },
        {
            sequelize,
            modelName: "registration",
        }
    );
    return registration;
};
