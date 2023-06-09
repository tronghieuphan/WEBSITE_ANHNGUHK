"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class document extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            document.belongsTo(models.type, { foreignKey: "typeId" });
        }
    }
    document.init(
        {
            nameDocument: DataTypes.STRING(100),
            author: DataTypes.STRING(50),
            releaseDate: DataTypes.DATEONLY,
            image: DataTypes.TEXT,
            download: DataTypes.INTEGER,
            filepdf: DataTypes.TEXT,
            fileview: DataTypes.TEXT,
            level: DataTypes.STRING(20),
            similarTopic: DataTypes.INTEGER,
            description: DataTypes.TEXT,
            typeId: DataTypes.STRING(8),
        },
        {
            sequelize,
            modelName: "document",
        }
    );
    return document;
};
