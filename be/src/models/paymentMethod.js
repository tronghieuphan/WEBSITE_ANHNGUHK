"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class paymentMethod extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // paymentMethod.hasMany(models.registration, { foreignKey: "methodId" });
        }
    }
    paymentMethod.init(
        {
            nameMethod: DataTypes.STRING(40),
        },
        {
            sequelize,
            modelName: "paymentMethod",
        }
    );
    return paymentMethod;
};
