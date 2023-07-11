"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class classify extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            classify.hasMany(models.course, { foreignKey: "classifyId" });

        }
    }
    classify.init(
        {
            nameClassify: DataTypes.STRING(20),
        },
        {
            sequelize,
            modelName: "classify",
        }
    );
    return classify;
};
