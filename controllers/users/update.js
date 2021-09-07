const { User } = require('../../models');
const bcrypt = require('bcrypt');
const validator = require('fastest-validator');
const V = new validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      fullName: 'string|empty:false',
      email: 'email|empty:false',
      password: 'string|min:6',
    };

    const validate = V.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json({
        status: 'error',
        message: validate[0].message,
      });
    }

    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'user not found',
      });
    }

    const email = req.body.email;
    if (email) {
      const checkEmail = await User.findOne({
        where: { email },
      });
      if (checkEmail && email !== user.email) {
        return res.status(409).json({
          status: 'error',
          message: 'email already exist',
        });
      }
    }

    const password = await bcrypt.hash(req.body.password, 10);
    const { fullName } = req.body;
    await user.update({
      fullName,
      email,
      password,
    });

    return res.json({
      status: 'success',
      data: {
        id: user.id,
        fullName,
        email,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      errors: error.message,
    });
  }
};
