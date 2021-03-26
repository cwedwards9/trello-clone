const db = require("../models");

module.exports = {
  findAll: async (req, res) => {
    const getLists = await db.List.findAll({ include: db.Card });
    res.json({ listData: getLists });
  },
  create: async (req, res) => {
    const newList = await db.List.create(req.body);
    res.json(newList.dataValues);
  }
};