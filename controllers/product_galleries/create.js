const { Product_gallery, Product } = require('../../models');
const Validator = require('fastest-validator');
const V = new Validator();

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

    const product = await Product.findByPk(req.body.product_id);

    if (!product) {
      return res.status(404).json({
        status: 'error',
        errors: 'product not found',
      });
    }

    const { product_id, photo, isDefault } = req.body;
    const data = {
      product_id,
      photo,
      isDefault,
    };

    const product_gallery = await Product_gallery.create(data);

    return res.json({
      status: 'success',
      message: product_gallery,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      errors: error.message,
    });
  }
};
