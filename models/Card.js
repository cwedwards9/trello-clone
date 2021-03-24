module.exports = (sequelize, DataTypes) => {
    const Card = sequelize.define("Card", {
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dueDate: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        workingMember: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        freezeTableName: true
    });

    return Card;
}