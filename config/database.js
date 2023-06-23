import Sequelize from "sequelize";

/**
 * @see https://sequelize.org/docs/v6/getting-started/
 */
const db = new Sequelize('bienes_raices_node', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    define: {
        timestamps: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
});

export default db;