module.exports = (sequelize, DataTypes) => {
    const PlanTest = sequelize.define('PlanTest', {
        planId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Plans',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        testId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Tests',
                key: 'id'
            },
            onDelete: 'CASCADE'
        }
    });

    PlanTest.associate = (models) => {
        PlanTest.belongsTo(models.Plan, { foreignKey: 'planId', as: 'plans' });
        PlanTest.belongsTo(models.Test, { foreignKey: 'testId', as: 'tests' });
    };

    return PlanTest;
};