module.exports = (sequelize, DataTypes) => {
  const Director = sequelize.define("Director", {
    names: {
      type: DataTypes.STRING(120),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });

  return Director;
};
