const { Product_gallery } = require('../../models');

module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    const product_gallery = await Product_gallery.findByPk(id);

    if (!product_gallery) {
      return res.status(404).json({
        status: 'error',
        erros: 'product_gallery not found',
      });
    }

    return res.json({
      status: 'success',
      data: product_gallery,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      erros: error.message,
    });
  }
};
