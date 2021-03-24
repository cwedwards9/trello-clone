module.exports = (sequelize, DataTypes) => {
    const List = sequelize.define("List", {
        listTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        freezeTableName: true
    });

    return List;
}