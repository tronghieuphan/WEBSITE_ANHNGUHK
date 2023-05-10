"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class type extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // type.hasMany(models.document, { foreignKey: "typeId" });
            // type.hasMany(models.course, { foreignKey: "typeId" });

        }
    }
    type.init(
        {
            nameType: DataTypes.STRING(20),
        },
        {
            sequelize,
            modelName: "type",
        }
    );
    return type;
};
