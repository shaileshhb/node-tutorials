require("dotenv").config();
const { Sequelize } = require("sequelize");

// Option 1
const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: console.log,
  }
);

// Option 2: Passing parameters separately (sqlite)
// const sequelize = new Sequelize({
//   dialect: 'mysql',
//   storage: 'path/to/database.sqlite'
// });

// Option 3
// const sequelize = new Sequelize('mysql://user:pass@example.com:5432/dbname')

module.exports = sequelize;
