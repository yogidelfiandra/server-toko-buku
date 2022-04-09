const { Category } = require('../../db/models');

module.exports = {
  getAllCategories: async (req, res, next) => {
    try {
      const categories = await Category.findAll({
        where: { user: req.user.id },
        attributes: ['id', 'name'],
      });
      res.status(200).json({
        message: 'Categories retrieved successfully',
        data: categories,
      });
    } catch (err) {
      next(err);
    }
  },
  createCategories: async (req, res, next) => {
    try {
      const { name } = req.body;
      const categories = await Category.create({
        name: name,
        user: req.user.id,
      });

      res.status(201).json({
        message: 'Category created successfully',
        data: categories,
      });
    } catch (err) {
      next(err);
    }
  },
  updateCategories: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const checkCategory = await Category.findOne({
        where: { id: id, user: req.user.id },
      });

      const categories = await checkCategory.update({ name: name });

      res.status(200).json({
        message: 'Category updated successfully',
        data: categories,
      });
    } catch (err) {
      next(err);
    }
  },
  deleteCategories: async (req, res, next) => {
    Category.findOne({
      where: { id: req.params.id, user: req.user.id },
    })
      .then((categories) => {
        if (!categories) {
          return res.status(404).json({
            message: 'Category not found',
          });
        } else {
          categories.destroy();
          res.status(200).json({
            message: 'Category deleted successfully',
            data: categories,
          });
        }
      })
      .catch((err) => {
        next(err);
      });

    try {
      const { id } = req.params;
      const checkCategory = await Category.findOne({
        where: { id: id, user: req.user.id },
      });

      await checkCategory.destroy();

      res.status(200).json({
        message: 'Category deleted successfully',
      });
    } catch (err) {
      next(err);
    }
  },
};
