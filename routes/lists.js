const router = require("express").Router();
const listsController = require("../controllers/listsController");

router.route("/lists/:boardId")
    .get(listsController.findAll)

router.route("/lists")
    .post(listsController.create);


module.exports = router;