const { Product_gallery } = require('../../models');

module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    const success = await Product_gallery.destroy({
      where: { id: id },
    });
    if (!success) {
      throw Error('Product_gallery not found');
    }
    return res.json({
      status: 'success',
      message: `succes delete Product_gallery ${id}`,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      erros: error.message,
    });
  }
};
