const db = require("../models");

module.exports = {
  create: async (req, res) => {
    const newCard = await db.Card.create(req.body);
    res.json(newCard);
  }
};