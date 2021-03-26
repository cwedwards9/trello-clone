const db = require("../models");

module.exports = {
  findAll: async (req, res) => {
    const getBoards = await db.Board.findAll();
    res.json({ boardData: getBoards });
  },
  create: async (req, res) => {
    const newBoard = await db.Board.create(req.body);
    res.json(newBoard.dataValues);
  }
};