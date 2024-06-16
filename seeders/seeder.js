import { exit } from "node:process";

import categories from "./categorySeeder";
import Category from "../models/Category.js";
import db from "../config/database.js";

const importData = async () => {
    try {
        // Auth
        await db.authenticate();

        // Generate columns
        await db.sync();

        // Insert data
        await Category.bulkCreate(categories);
        console.log('Import data successful');
        exit();

    } catch (error) {
        console.error(error);
        exit(1);
    }
};