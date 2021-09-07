const { Product, Product_gallery } = require('../../models');

module.exports = async (req, res) => {
  try {
    const product = await Product.findAll({
      include: [
        {
          model: Product_gallery,
          as: 'product_galleries',
        },
      ],
    });

    return res.json({
      status: 'success',
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      erros: error.message,
    });
  }
};
