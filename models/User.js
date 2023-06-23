import { DataTypes } from "sequelize";
import db from "../config/database.js";

/**
 * @see https://sequelize.org/docs/v6/core-concepts/model-basics/
 */
const User = db.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING,
    confirm: DataTypes.BOOLEAN
});

export default User;