'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init(
    {
      uuid: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.INTEGER,
      address: DataTypes.STRING,
      transaction_total: DataTypes.INTEGER,
      transaction_status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Transaction',
    }
  );

  Transaction.associate = (models) => {
    Transaction.belongsToMany(models.Product, {
      through: 'Transaction_detail',
      foreignKey: 'transaction_id',
      as: 'products',
    });
  };
  return Transaction;
};
