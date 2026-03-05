module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define("Type", {
    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  return Type;
};
