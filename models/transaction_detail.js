'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction_detail.init(
    {
      product_id: DataTypes.INTEGER,
      transaction_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Transaction_detail',
    }
  );

  return Transaction_detail;
};
