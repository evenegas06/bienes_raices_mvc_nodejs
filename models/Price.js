import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Price = db.define('prices', {
    name: {
        type: DataTypes.STRING(35),
        allowNull: false,
    }
});

export default Price;