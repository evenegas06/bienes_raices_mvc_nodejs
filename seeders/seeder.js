import { exit } from "node:process";

import categories from "./categorySeeder.js";
import prices from "./priceSeeder.js";

import Category from "../models/Category.js";
import Price from "../models/Price.js";

import db from "../config/database.js";

const importData = async () => {
    try {
        // Auth
        await db.authenticate();

        // Generate columns
        await db.sync();

        // Insert data
        await Promise.all([
            Category.bulkCreate(categories),
            Price.bulkCreate(prices),
        ]);

        console.log('Import data successful');
        exit();

    } catch (error) {
        console.error(error);
        exit(1);
    }
};

if (process.argv[2] === '-i') {
    importData();
}