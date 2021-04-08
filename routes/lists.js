const router = require("express").Router();
const listsController = require("../controllers/listsController");

router.route("/lists/:boardId")
    .get(listsController.findAll)

router.route("/lists/:listId")
    .delete(listsController.delete)

router.route("/lists")
    .post(listsController.create)
    .put(listsController.update);


module.exports = router;