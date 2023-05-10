"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class classes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // classes.belongsTo(models.course, { foreignKey: "courseId" });
            // classes.belongsTo(models.user, { foreignKey: "lectureId" });
            // classes.belongsToMany(models.weekday, {
            //     through: models.detailClassesWeek,
            //     foreignKey: "classesId",
            // });
            // classes.belongsToMany(models.user, {
            //     through: models.detailClassesStudent,
            //     foreignKey: "classesId",
            // });

        }
    }
    classes.init(
        {
            nameClasses: DataTypes.STRING(30),
            startDate:DataTypes.DATE,
            endDate:DataTypes.DATE,
            price:DataTypes.INTEGER,
            courseId:DataTypes.STRING(8),
            lectureId:DataTypes.STRING(8),
        },
        {
            sequelize,
            modelName: "classes",
        }
    );
    return classes;
};
