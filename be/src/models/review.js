"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class review extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            review.belongsTo(models.user, { foreignKey: "studentId" });
        }
    }
    review.init(
        {
            description: DataTypes.TEXT,
            active: DataTypes.BOOLEAN,
            star: DataTypes.FLOAT,
            activeHidden: DataTypes.BOOLEAN,
            studentId: DataTypes.STRING(8),
        },
        {
            sequelize,
            modelName: "review",
        }
    );
    return review;
};
