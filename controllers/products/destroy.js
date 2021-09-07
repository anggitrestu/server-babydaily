const { Product } = require('../../models');

module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    const success = await Product.destroy({
      where: { id: id },
    });
    if (!success) {
      throw Error('product not found');
    }
    return res.json({
      status: 'success',
      message: `succes delete product ${id}`,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      erros: error.message,
    });
  }
};
