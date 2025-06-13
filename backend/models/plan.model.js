module.exports = (sequelize, DataTypes) => {
    const Plan = sequelize.define('Plan', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        dateTimeLaunch: {
            type: DataTypes.DATE,
        },
        repeatUnit: {
            type: DataTypes.TEXT,
        },
        repeatEvery: {
            type: DataTypes.INTEGER,
        },
        valid: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        version: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
    });

    Plan.associate = (models) => {
        Plan.hasMany(models.PlanTest, { foreignKey: 'planId', as: 'planTests', onDelete: 'CASCADE' });
    };

    return Plan;
};