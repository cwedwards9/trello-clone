const router = require("express").Router();
const listsController = require("../controllers/listsController");

router.route("/lists")
    .get(listsController.findAll)
    .post(listsController.create);


module.exports = router;