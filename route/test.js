const router = require('express-promise-router')();

const testController = require('../controller/test');

router.route('/get').get(testController.get);
router.route('/post').post(testController.post);

module.exports = router;