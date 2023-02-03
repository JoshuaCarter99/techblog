const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    async checkPassword(loginPW) {
        const validPW = await bcrypt.compare(loginPW, this.password);
        return validPW;
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true 
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6],
            },
        },
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;