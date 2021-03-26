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

    Card.associate = (models) => {
        Card.belongsTo(models.List, {
            foreign: {
                allowNull: false
            }
        });
    };

    return Card;
}