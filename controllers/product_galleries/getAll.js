const { Product_gallery, Product } = require('../../models');

module.exports = async (req, res) => {
  try {
    const product_galleries = await Product_gallery.findAll();
    return res.json({
      status: 'success',
      data: product_galleries,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      errors: error.message,
    });
  }
};
