module.exports = (sequelize, DataTypes) => {
    const Board = sequelize.define("Board", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isStarred: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });

    Board.associate = (models) => {
        Board.hasMany(models.List, {
            onDelete: "cascade"
        });
    };

    return Board;
}