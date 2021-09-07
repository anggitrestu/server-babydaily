'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      type: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );

  Product.associate = (models) => {
    Product.hasMany(models.Product_gallery, {
      foreignKey: {
        name: 'product_id',
        allowNull: false,
      },
      as: 'product_galleries',
    });
  };

  return Product;
};
