const express = require('express');
const router = express.Router();

const CountriesController = require('../controller/CountriesController');

/* Endpoint utilizzato per generare il db */

router.get('/CreateDb', CountriesController.CreateDb);

/* Endpoint per ottenere tutti i risultati */

router.get('/GetAll', CountriesController.GetAll);

/* Endpoint per ricercare i paesi nel Db con le singole perole o parti essa */

router.get( '/Search/:name',  CountriesController.Search);

/* Endpoint per ottenere tutti i risultati filtrati per regione */

router.get('/Region/:region', CountriesController.RegionFilter);

/* Endpoint per ottenere tutti i risultati filtrati per regione */

router.get('/Region/:region/:name', CountriesController.SearchRegionFilter);

module.exports = router;
