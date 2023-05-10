"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class detailCourseSkill extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    detailCourseSkill.init(
        {
            courseId: DataTypes.STRING(8),
            skillId: DataTypes.STRING(8),
            description:DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "detailCourseSkill",
        }
    );
    return detailCourseSkill;
};
