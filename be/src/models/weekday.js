"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class weekday extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            weekday.belongsToMany(models.classes, {
                through: models.detailClassesWeek,
                foreignKey: "weekdayId",
            });

        }
    }
    weekday.init(
        {
            nameWeekday: DataTypes.STRING(10),
        },
        {
            sequelize,
            modelName: "weekday",
        }
    );
    return weekday;
};
