const router = require("express").Router();
const controllers = require("../controllers");

router.route("/campaigns/:address?").get(controllers.campaign.index);

module.exports = router;
