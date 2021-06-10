const router = require("express").Router();
const controllers = require("../controllers");

router.route("/user").post(controllers.user.new);
router.route("/user/:address").get(controllers.user.view);

module.exports = router;