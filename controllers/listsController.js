const db = require("../models");

module.exports = {
  findAll: async (req, res) => {
    const getLists = await db.List.findAll({ where: { BoardId: req.params.boardId }, include: db.Card });
    res.json({ listData: getLists });
  },
  create: async (req, res) => {
    const newList = await db.List.create(req.body);
    res.json(newList.dataValues);
  },
  update: async (req, res) => {
    await db.List.update(req.body, {
      where: {
        id: req.body.id
      }
    });
    res.end();
  },
  delete: async (req, res) => {
    await db.List.destroy({ where: { id: req.params.listId } });
    res.end();
  }
};