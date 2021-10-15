const { Product_gallery } = require('../../models');
const Validator = require('fastest-validator');
const V = new Validator();
const slugify = require('slugify');

module.exports = async (req, res) => {
  try {
    const schema = {
      product_id: 'number|empty:false',
      photo: 'string|empty:false',
      isDefault: 'boolean|empty:false',
    };

    const validate = V.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json({
        status: 'error',
        message: validate[0].message,
      });
    }

    const id = req.params.id;
    const product_gallery = await Product_gallery.findByPk(id);

    if (!product_gallery) {
      return res.status(404).json({
        status: 'error',
        message: 'Product_gallery not found',
      });
    }

    const { product_id, photo, isDefault } = req.body;
    const data = {
      product_id,
      photo,
      isDefault,
    };

    const createProduct_gallery = await product_gallery.update(data);

    return res.json({
      status: 'success update',
      data: createProduct_gallery,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      erros: error.message,
    });
  }
};
