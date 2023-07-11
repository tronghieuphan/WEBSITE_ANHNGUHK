"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class detailClassesWeek extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    detailClassesWeek.init(
        {
            classesId: DataTypes.STRING(8),
            weekdayId: DataTypes.STRING(8),
           
        },
        {
            sequelize,
            modelName: "detailClassesWeek",
        }
    );
    return detailClassesWeek;
};
