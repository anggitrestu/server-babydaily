const { User } = require('../../models');
const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      fullName: 'string|empty:false',
      email: 'email|empty:false',
      password: 'string|min:6',
    };
    const check = v.validate(req.body, schema);
    if (check.length) {
      return res.status(400).json({
        status: 'error',
        message: check[0].message,
      });
    }

    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      return res.status(404).json({
        status: 'error',
        message: 'email already exist',
      });
    }

    const password = await bcrypt.hash(req.body.password, 10);
    const data = {
      fullName: req.body.fullName,
      email: req.body.email,
      password,
    };

    const createUser = await User.create(data);

    return res.json({
      status: 'success',
      data: {
        id: createUser.id,
      },
    });
  } catch (error) {
    res.status(404);
    res.json({ errors: error.message });
  }
};
