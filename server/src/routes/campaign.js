const router = require("express").Router();
const controllers = require("../controllers");

router.route("/campaign").get(controllers.campaign.index);

module.exports = router;