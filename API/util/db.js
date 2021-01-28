const Sequelize = require('sequelize');
const { DB_PWD, DB_NAME, DB_USER, SERVER_DB } = process.env

const sequelize = new Sequelize( DB_NAME, DB_USER, DB_PWD, {
    dialect:'mssql',
    host : 'localhost',
    dialectOptions:{
        options:{
            encrypt: true
        }
    } 
} );


module.exports = sequelize;
