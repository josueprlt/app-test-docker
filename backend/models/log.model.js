module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define('Log', {
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        success: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    Log.associate = (models) => {
        Log.belongsTo(models.Test, { foreignKey: 'testId', as: 'test' });
    };

    return Log;
};  