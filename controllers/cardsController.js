const db = require("../models");
const userAuth = require("../middleware/userAuth");

module.exports = {
  create: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if(!loggedIn) return res.status(401).json("You must be logged in to do that!");
    const newCard = await db.Card.create(req.body);
    res.json(newCard);
  },
  update: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if(!loggedIn) return res.status(401).json("You must be logged in to do that!");
    const updatedCard = await db.Card.update(req.body, {
      where: {
        id: req.body.id
      }
    });
    res.json(updatedCard);
  }
};