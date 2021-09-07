'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_gallery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product_gallery.init(
    {
      product_id: DataTypes.INTEGER,
      photo: DataTypes.STRING,
      isDefault: DataTypes.TINYINT,
    },
    {
      sequelize,
      modelName: 'Product_gallery',
    }
  );

  Product_gallery.associate = (models) => {
    Product_gallery.belongsTo(models.Product, {
      foreignKey: {
        name: 'product_id',
        allowNull: false,
      },
      as: 'product_galleries',
    });
  };
  return Product_gallery;
};
