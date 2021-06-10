const router = require("express").Router();
const controllers = require("../controllers");

router.route("/enroll").post(controllers.userCampaign.enroll);

module.exports = router;
