"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class consult extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            consult.belongsTo(models.classes, { foreignKey: "classesId" });
            consult.belongsTo(models.user, { foreignKey: "userId" });
        }
    }
    consult.init(
        {
            target: DataTypes.STRING(50),
            timeComplete: DataTypes.STRING(20),
            active: DataTypes.BOOLEAN,
            dateArrive: DataTypes.DATEONLY,
            timeArrive: DataTypes.TIME,
            userId: DataTypes.STRING(8),
            classesId: DataTypes.STRING(8),
        },
        {
            sequelize,
            modelName: "consult",
        }
    );
    return consult;
};
