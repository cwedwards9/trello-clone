const db = require("../models");

// Middleware for restricting routes if a user is not logged in / authorized owner
module.exports = {
    // If the user is logged in, return true to continue with the request
    isLoggedIn: (req, res) => {
      if (req.user) {
        return true;
      }
    
      // Otherwise, return false
      return false;
    },

    // isBoardOwner: async (req, res) => {
    //   if(req.user) {
    //     const foundBoard = await db.Board.findOne({ where: { id: req.params.id } });
    //     if(foundBoard.dataValues.UserId === req.user.id) {
    //       return true;
    //     }
    //     return false;
    //   }
    //     return false;
    // }
};