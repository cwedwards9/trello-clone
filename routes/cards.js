const router = require("express").Router();
const cardsController = require("../controllers/cardsController");


router.route("/cards")
    .post(cardsController.create);


module.exports = router;