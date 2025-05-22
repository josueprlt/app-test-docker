module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define('Log', {
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        provenance: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        success: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null,
        },
    });

    Log.associate = (models) => {
        Log.belongsTo(models.Test, { foreignKey: 'testId', as: 'test' });
    };

    return Log;
};