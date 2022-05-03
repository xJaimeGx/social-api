const router = require('express').Router();
const routesUser = require('./user-routes');

router.use('/users', routesUser);

module.exports = router;