const router = require("express").Router();
const cardsController = require("../controllers/cardsController");


router.route("/cards")
    .post(cardsController.create)
    .put(cardsController.update);


module.exports = router;