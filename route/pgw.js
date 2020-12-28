const router = require('express-promise-router')();

const pgwController = require('../controller/pgw');

router.route('/create').post(pgwController.create);
router.route('/execute').post(pgwController.execute);

module.exports = router;