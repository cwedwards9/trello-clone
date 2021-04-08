const db = require("../models");

module.exports = {
  findOne: async (req, res) => {
    const oneBoard = await db.Board.findOne({ where: { id: req.params.id } });
    res.json(oneBoard);
  },
  findAll: async (req, res) => {
    const getBoards = await db.Board.findAll();
    res.json({ boardData: getBoards });
  },
  create: async (req, res) => {
    const newBoard = await db.Board.create(req.body);
    res.json(newBoard.dataValues);
  },
  update: async (req, res) => {
    console.log(req.body);
    await db.Board.update(req.body, { where: { id: req.params.id } });
    res.end();
  },
  delete: async (req, res) => {
    await db.Board.destroy({ where: { id: req.params.id } });
    res.end();
  }
};