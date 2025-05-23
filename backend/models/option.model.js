module.exports = (sequelize, DataTypes) => {
    const Option = sequelize.define('Option', {
        question: {
            type: DataTypes.STRING,
            allowNull: false
        },
        choice: {
            type: DataTypes.JSONB,
            allowNull: false
        }
    });

    Option.associate = (models) => {
        Option.belongsTo(models.Test, { foreignKey: 'testId', as: 'test' });
    };

    return Option;
};
