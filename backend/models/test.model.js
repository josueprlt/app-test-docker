module.exports = (sequelize, DataTypes) => {
    const Test = sequelize.define('Test', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW
        },
        success: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    Test.associate = (models) => {
        Test.hasMany(models.Log, { foreignKey: 'testId', as: 'logs', onDelete: 'CASCADE' });
    };

    return Test;
};