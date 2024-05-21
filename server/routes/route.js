const Controller = require('../controllers/controller');
const router = require('express').Router();
const cors = require('cors');
const errorHandlers = require('../middlewares/errorHandlers');

router.use(cors())

router.get('/', Controller.test)
router.post('/register', Controller.postRegister)

router.use(errorHandlers)

module.exports = router;