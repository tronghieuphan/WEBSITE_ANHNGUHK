"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class outstanding extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            outstanding.belongsTo(models.user, { foreignKey: "studentId" });
            outstanding.belongsTo(models.type, { foreignKey: "typeId" });
        }
    }
    outstanding.init(
        {
            point: DataTypes.FLOAT,
            image: DataTypes.TEXT,
            studentId: DataTypes.STRING(8),
            typeId: DataTypes.STRING(8),
        },
        {
            sequelize,
            modelName: "outstanding",
        }
    );
    return outstanding;
};
