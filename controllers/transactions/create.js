const { Transaction, Transaction_detail, Product } = require('../../models');

module.exports = async (req, res) => {
  try {
    const uuid = `trx${Math.floor(Math.random() * 1000000000)}`;
    const dataTransaction = {
      uuid: uuid,
      name: 'anggit',
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      transaction_total: req.body.transaction_total,
      transaction_status: req.body.transaction_status,
    };
    const createTransaction = await Transaction.create(dataTransaction);
    const transactionId = createTransaction.id;

    let data = [];
    req.body.transaction_details.forEach(async (product_id, index) => {
      data[index] = product_id;
      await Transaction_detail.create({
        transaction_id: transactionId,
        product_id: product_id,
      });
    });

    return res.json({
      status: 'success',
      data: {
        data: createTransaction,
        product_details: data,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      errors: error.message,
    });
  }
};
