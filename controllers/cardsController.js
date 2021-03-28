const db = require("../models");

module.exports = {
  create: async (req, res) => {
    const newCard = await db.Card.create(req.body);
    res.json(newCard);
  },
  update: async (req, res) => {
    await db.Card.update(req.body, {
      where: {
        id: req.body.id
      }
    });
    res.end();
  }
};