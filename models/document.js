'use strict';
module.exports = (sequelize, DataTypes) => {
  const document = sequelize.define(
    'document',
    {
      user_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      alias: DataTypes.STRING,
      local_path: DataTypes.STRING,
    },
    {
      createdAt: 'created_at',
      updatedAt: 'created_at',
    },
  );
  document.associate = function (models) {
    // associations can be defined here
  };
  return document;
};
