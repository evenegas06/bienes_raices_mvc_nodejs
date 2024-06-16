import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Category = db.define('categories', {
    name: {
        type: DataTypes.STRING(35),
        allowNull: false,
    }
});

export default Category;