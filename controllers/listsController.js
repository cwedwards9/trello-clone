const db = require("../models");
const userAuth = require("../middleware/userAuth");

module.exports = {
  findAll: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if(!loggedIn) return res.status(401).json("You must be logged in to do that!");
    const getLists = await db.List.findAll({ where: { BoardId: req.params.boardId }, include: db.Card });
    res.json({ listData: getLists });
  },
  create: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    console.log(loggedIn);
    if(!loggedIn) return res.status(401).json("You must be logged in to do that!");
    const newList = await db.List.create(req.body);
    res.json(newList.dataValues);
  },
  update: async (req, res) => {
    const loggedIn = userAuth.isLoggedIn(req, res);
    if(!loggedIn) return res.status(401).json("You must be logged in to do that!");
    await db.List.update(req.body, {
      where: {
        id: req.body.id
      }
    });
    res.end();
  },
  delete: async (req, res) => {
    const loggedIn = isLoggedIn(req, res);
    if(!loggedIn) return res.status(401).json("You must be logged in to do that!");
    await db.List.destroy({ where: { id: req.params.listId } });
    res.end();
  }
};