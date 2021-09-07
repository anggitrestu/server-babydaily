const { Product } = require('../../models');
const Validator = require('fastest-validator');
const V = new Validator();
const slugify = require('slugify');

module.exports = async (req, res) => {
  try {
    const schema = {
      name: 'string|empty:false',
      type: 'string|empty:false',
      description: 'string|empty:false',
      price: 'number|empty:false',
      quantity: 'number|empty:false',
    };

    const validate = V.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json({
        status: 'error',
        message: validate[0].message,
      });
    }

    const id = req.params.id;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'product not found',
      });
    }

    const slugh = slugify(req.body.name, {
      lower: true,
    });

    const data = {
      name: req.body.name,
      slug: slugh,
      type: req.body.type,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
    };

    const createProduct = await product.update(data);

    return res.json({
      status: 'success update',
      data: createProduct,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      erros: error.message,
    });
  }
};
