"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class account extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // account.belongsTo(models.user, { foreignKey: "accountId" });

        }
    }
    account.init(
        {
            username: DataTypes.STRING(30),
            password: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "account",
        }
    );
    return account;
};
