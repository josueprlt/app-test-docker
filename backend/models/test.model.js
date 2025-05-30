module.exports = (sequelize, DataTypes) => {
    const Test = sequelize.define('Test', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        success: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        valid: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        exclud: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    Test.associate = (models) => {
        Test.hasMany(models.Log, { foreignKey: 'testId', as: 'logs', onDelete: 'CASCADE' });
    };

    return Test;
};