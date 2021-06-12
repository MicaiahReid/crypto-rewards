const router = require("express").Router();
const controllers = require("../controllers");

router.route("/contract/deploy").get(controllers.contract.deploy);
router.route("/contract/deposit").get(controllers.contract.deposit);
router.route("/contract/withdraw").get(controllers.contract.withdraw);

module.exports = router;