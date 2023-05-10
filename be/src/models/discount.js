"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class discount extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // discount.hasMany(models.course, { foreignKey: "discountId" });
            // discount.belongsToMany(models.user, {
            //     through: models.detailDiscountStudent,
            //     foreignKey: "discountId",
            // });
        }
    }
    discount.init(
        {
            nameDiscount: DataTypes.STRING(50),
            percent: DataTypes.INTEGER,
            code: DataTypes.STRING(10),
            startDade: DataTypes.DATE,
            endDate: DataTypes.DATE,
            condition: DataTypes.INTEGER,
            description: DataTypes.TEXT,
            active: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "discount",
        }
    );
    return discount;
};
