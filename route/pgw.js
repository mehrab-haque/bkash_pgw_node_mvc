const router = require('express-promise-router')();

const pgwController = require('../controller/pgw');

router.route('/create').post(pgwController.create);
router.route('/execute').post(pgwController.execute);
router.route('/query').post(pgwController.query);
router.route('/search').post(pgwController.search);

module.exports = router;