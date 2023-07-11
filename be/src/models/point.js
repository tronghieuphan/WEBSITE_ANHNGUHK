"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class point extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // point.belongsTo(models.course, { foreignKey: "discountId" });
            point.belongsTo(models.user, { foreignKey: "studentId" });
            point.belongsTo(models.classes, { foreignKey: "classesId" });
        }
    }
    point.init(
        {
            numberPoint: DataTypes.FLOAT,
            result: DataTypes.STRING(20),
            studentId: DataTypes.STRING(8),
            classesId: DataTypes.STRING(8),
        },
        {
            sequelize,
            modelName: "point",
        }
    );
    return point;
};
