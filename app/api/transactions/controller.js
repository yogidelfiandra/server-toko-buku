const { Transaction, DetailTransaction } = require('../../db/models');
const { Op } = require('sequelize');

module.exports = {
  getTransactionList: async (req, res, next) => {
    try {
      const { keyword = '' } = req.query;

      let condition = {
        user: req.user.id,
      };

      if (keyword !== '') {
        condition = {
          ...condition,
          invoice: { [Op.like]: `%${keyword}%` },
        };
      }

      const transaction = await Transaction.findAll({
        where: condition,
        include: {
          model: DetailTransaction,
          as: 'detailTransaction',
          attributes: [
            'id',
            'transaction',
            'book',
            'titleBook',
            'imageBook',
            'priceBook',
            'quantity',
          ],
        },
      });
      res.status(200).json({
        message: 'Transaction retrieved successfully',
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  },
  detailTransactionList: async (req, res, next) => {
    try {
      const { id } = req.params;

      const detailTransaction = await Transaction.findOne({
        where: { id: id },
        include: {
          model: DetailTransaction,
          as: 'detailTransaction',
          attributes: [
            'id',
            'transaction',
            'book',
            'titleBook',
            'imageBook',
            'priceBook',
            'quantity',
          ],
        },
      });
      res.status(200).json({
        message: 'Detail Transaction retrieved successfully',
        data: detailTransaction,
      });
    } catch (error) {
      next(error);
    }
  },
};
