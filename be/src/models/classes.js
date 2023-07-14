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
            classes.belongsTo(models.course, { foreignKey: "courseId" });
            // classes.belongsTo(models.user, { foreignKey: "lectureId" });
            classes.hasMany(models.consult, { foreignKey: "classesId" });
            classes.hasMany(models.point, { foreignKey: "classesId" });
            classes.belongsToMany(models.weekday, {
                through: models.detailClassesWeek,
                foreignKey: "classesId",
            });
            classes.hasMany(models.detailClassesWeek, { foreignKey: "classesId" });
            classes.belongsToMany(models.user, {
                through: models.detailClassesStudent,
                foreignKey: "classesId",
            });
        }
    }

    classes.init(
        {
            nameClasses: DataTypes.STRING(30),
            startDate: DataTypes.DATEONLY,
            endDate: DataTypes.DATEONLY,
            startHour: DataTypes.TIME,
            endHour: DataTypes.TIME,
            quantity: DataTypes.INTEGER,
            quantityRes: DataTypes.INTEGER,
            quantityMin: DataTypes.INTEGER,
            active: DataTypes.BOOLEAN,
            courseId: DataTypes.STRING(8),
            lectureId: DataTypes.STRING(8),
        },
        {
            sequelize,
            modelName: "classes",
        }
    );
    return classes;
};
