const Controller = require('../controllers/controller');
const router = require('express').Router();
const cors = require('cors');

router.use(cors())

router.get('/', Controller.test)

module.exports = router;