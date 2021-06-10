const router = require("express").Router();
const controllers = require("../controllers");

router.route("/campaigns").get(controllers.campaign.index);

module.exports = router;