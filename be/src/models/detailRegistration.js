"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class detailRegistration extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    detailRegistration.init(
        {
            quantity: DataTypes.INTEGER,
            amountCourse: DataTypes.INTEGER,
            priceDiscount: DataTypes.INTEGER,
            registerId: DataTypes.STRING(8),
            courseId: DataTypes.STRING(8),
        },
        {
            sequelize,
            modelName: "detailRegistration",
        }
    );
    return detailRegistration;
};
