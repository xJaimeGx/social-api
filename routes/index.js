const router = require('express').Router();
//import api routes through api/index.js
const apiRoutes = require('./api');

//adds /api prefix to the routes
router.use('/api', apiRoutes);

//throw error 404 if wrong route
router.use((req, res) => {
    res.status(404).send('<h1>404 Error!</h1>');
  });

module.exports = router;

