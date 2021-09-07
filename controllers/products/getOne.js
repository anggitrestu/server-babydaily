const { Product, Product_gallery } = require('../../models');

module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id, {
      include: {
        model: Product_gallery,
        as: 'product_galleries',
      },
    });

    if (!product) {
      return res.status(404).json({
        status: 'error',
        erros: 'product not found',
      });
    }

    return res.json({
      product,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      erros: error.message,
    });
  }
};
