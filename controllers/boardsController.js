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
  }
};