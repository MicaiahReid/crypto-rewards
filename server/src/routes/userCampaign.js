const router = require("express").Router();
const controllers = require("../controllers");

router.route("/enroll").post(controllers.userCampaign.enroll);
router.route("/verify").post(controllers.userCampaign.verify);

module.exports = router;
