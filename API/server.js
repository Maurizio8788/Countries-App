const dotenv = require('dotenv').config();
const cors = require('cors');

const { PORT } = process.env;

/* EXPRESS */
const helmet = require('helmet');

const express = require('express');

const app = express();

app.use( helmet() );

app.disable('x-powered-by');


const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 
}

app.use( cors(corsOptions) );


/* Router */
const routerCountries = require('./router/RouterCountries');

app.use( '/api/countries', routerCountries );


/* DB Sequelize */

const sequelize = require('./util/db');
sequelize.sync()
.then(
    (resp) => {

    }
)
.catch(
    error => console.log(error)
)


app.listen( PORT, (res) => {
    console.log('Server attivo sulla porta configurata...');
} );