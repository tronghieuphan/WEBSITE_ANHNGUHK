"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class detailDiscountStudent extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    detailDiscountStudent.init(
        {
            studentId: DataTypes.STRING(8),
            discountId: DataTypes.STRING(8),
        },
        {
            sequelize,
            modelName: "detailDiscountStudent",
        }
    );
    return detailDiscountStudent;
};
