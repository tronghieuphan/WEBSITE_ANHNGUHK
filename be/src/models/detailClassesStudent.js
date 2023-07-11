"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class detailClassesStudent extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    detailClassesStudent.init(
        {
            studentId: DataTypes.STRING(8),
            classesId: DataTypes.STRING(8),
        },
        {
            sequelize,
            modelName: "detailClassesStudent",
        }
    );
    return detailClassesStudent;
};
