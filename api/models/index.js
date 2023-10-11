const dbConfig = require("../../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users.js")(sequelize, Sequelize);
db.assets = require("./assets.js")(sequelize, Sequelize);
db.purchases = require("./purchases.js")(sequelize, Sequelize);
db.admins = require("./admins.js")(sequelize, Sequelize);
db.places = require("./places.js")(sequelize, Sequelize);
db.transactions = require("./transactions.js")(sequelize, Sequelize);
db.vouchers = require("./vouchers.js")(sequelize, Sequelize);

module.exports = db;