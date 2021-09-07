const { User } = require('../../models');
const bcrypt = require('bcrypt');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    email: 'email|emptyLfalse',
    password: 'string|min:6',
  };

  const check = v.compile(schema);
  if (!check) {
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

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'user not found',
    });
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isValidPassword) {
    return res.status(404).json({
      status: 'error',
      message: 'password failed',
    });
  }

  return res.json({
    status: 'success',
    data: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    },
  });
};
