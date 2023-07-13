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
            registration.belongsTo(models.user, { foreignKey: "studentId" });
            registration.belongsTo(models.registration, { foreignKey: "staffRegis" });
            registration.belongsTo(models.registration, { foreignKey: "staffPayment" });
            registration.belongsToMany(models.course, {
                through: models.detailRegistration,
                foreignKey: "registerId",
            });
        }
    }
    registration.init(
        {
            paymentDate: DataTypes.DATE,
            regisDate: DataTypes.DATE,
            total: DataTypes.INTEGER,
            active: DataTypes.BOOLEAN,
            note: DataTypes.TEXT,
            activeCancel: DataTypes.BOOLEAN,
            method: DataTypes.STRING(50),
            studentId: DataTypes.STRING(8),
            staffRegis: DataTypes.STRING(8),
            staffPayment: DataTypes.STRING(8),
        },
        {
            sequelize,
            modelName: "registration",
        }
    );
    return registration;
};
