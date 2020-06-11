'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      remember_token: DataTypes.STRING,
      api_token: DataTypes.STRING,
    },
    {
      createdAt: 'created_at',
      updatedAt: 'created_at',
    },
  );
  user.associate = function (models) {
    // associations can be defined here
  };
  return user;
};
