"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class skill extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // skill.belongsToMany(models.course, {
            //     through: models.detailCourseSkill,
            //     foreignKey: "skillId",
            // });
        }
    }
    skill.init(
        {
            nameSkill: DataTypes.STRING(30),
        },
        {
            sequelize,
            modelName: "skill",
        }
    );
    return skill;
};
