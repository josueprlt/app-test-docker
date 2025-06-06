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
    });

    Plan.associate = (models) => {
        Plan.hasMany(models.PlanTest, { foreignKey: 'planId', as: 'planTests', onDelete: 'CASCADE' });
    };

    return Plan;
};