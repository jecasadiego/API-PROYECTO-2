module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define("Media", {
    serial: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    url: {
      type: DataTypes.STRING(300),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isUrl: true,
      },
    },
    coverImage: {
      type: DataTypes.STRING(300),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    releaseYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1888,
        maxCurrentYear(value) {
          const maxYear = new Date().getFullYear() + 1;
          if (value > maxYear) {
            throw new Error(`releaseYear no puede ser mayor a ${maxYear}`);
          }
        },
      },
    },
  });

  return Media;
};
