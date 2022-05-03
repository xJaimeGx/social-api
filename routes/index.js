const router = require('express').Routes();
//import api routes through api/index.js
const routesAPI = require('./api');

//adds /api prefix to the routes
router.use('/api', routesAPI);

//throw error 404 if wrong route
router.use((req, res) => {
    res.status(404).send('404 Error');
});

module.exports = router;

