const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const Countries = sequelize.define( 'Countries', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:true
    },
    capital:{
        type:Sequelize.STRING,
        allowNull:false
    },
    region:{
        type:Sequelize.STRING,
        allowNull:false
    },
    native_name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    population:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    sub_region:{
        type:Sequelize.STRING,
        allowNull:false
    },
    top_level_domain:{
        type:Sequelize.STRING,
        allowNull:false
    },
    currencies:{
        type:Sequelize.STRING,
        allowNull:false
    },
    languages:{
        type:Sequelize.STRING,
        allowNull:false
    },
    borders:{
        type:Sequelize.STRING,
        allowNull:false
    },
    flag:{
        type:Sequelize.STRING,
        allowNull:false
    }
},{
    timestamps:false,
    tableName: 'Countries'
});

module.exports = Countries;