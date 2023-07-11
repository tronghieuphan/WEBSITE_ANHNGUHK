"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class course extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            course.belongsTo(models.type, { foreignKey: "typeId" });
            course.belongsTo(models.classify, { foreignKey: "classifyId" });  
            course.belongsTo(models.discount, { foreignKey: "discountId" });
            course.hasMany(models.classes, { foreignKey: "courseId" });
            course.belongsToMany(models.registration, {
                through: models.detailRegistration,
                foreignKey: "courseId",
            });
        }
    }
    course.init(
        {
            nameCourse: DataTypes.STRING(100),
            lesson: DataTypes.STRING(10),
            price: DataTypes.INTEGER,
            desTime: DataTypes.TEXT,
            desPrice: DataTypes.TEXT,
            desTarget: DataTypes.TEXT,
            desClassify: DataTypes.TEXT,
            listening:DataTypes.TEXT,
            reading:DataTypes.TEXT,
            writing:DataTypes.TEXT,
            speaking:DataTypes.TEXT,
            grammer:DataTypes.TEXT,
            vocabulary:DataTypes.TEXT,
            active: DataTypes.BOOLEAN,
            typeId: DataTypes.STRING(8),
            classifyId: DataTypes.STRING(8),
            discountId: DataTypes.STRING(8),


          
        },
        {
            sequelize,
            modelName: "course",
        }
    );
    return course;
};
