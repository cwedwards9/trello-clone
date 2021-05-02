const db = require("../models");
const userAuth = require("../middleware/userAuth");

module.exports = {
  findOne: async (req, res) => {
    const loggedIn = await userAuth.isLoggedIn(req, res);
    if(!loggedIn) return res.status(401).json("You must be logged in and the to do that!");
    const oneBoard = await db.Board.findOne({ where: { id: req.params.id } });
    res.json(oneBoard);
  },
  findAll: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if(!loggedIn) return res.status(401).json("You must be logged in to do that!");
    const getBoards = await db.Board.findAll({ where: { UserId: req.user } });
    res.json({ boardData: getBoards });
  },
  create: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if(!loggedIn) return res.status(401).json("You must be logged in to do that!");
    const newBoard = await db.Board.create({ ...req.body, UserId: req.user });
    res.json(newBoard.dataValues);
  },
  update: async (req, res) => {
    const loggedIn = await userAuth.isLoggedIn(req, res);
    if(!loggedIn) return res.status(401).json("You must be logged in and the owner to do that!");
    await db.Board.update(req.body, { where: { id: req.params.id } });
    res.end();
  },
  delete: async (req, res) => {
    const loggedIn = await userAuth.isLoggedIn(req, res);
    if(!loggedIn) return res.status(401).json("You must be logged in and the owner to do that!");
    await db.Board.destroy({ where: { id: req.params.id } });
    res.end();
  }
};