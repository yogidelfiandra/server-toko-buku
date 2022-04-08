const { User } = require('../../db/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  signin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const checkUser = await User.findOne({ where: { email: email } });
      if (!checkUser) {
        res.status(404).json({ message: 'Email user not found' });
      } else {
        const checkPassword = bcrypt.compareSync(password, checkUser.password);

        if (checkPassword) {
          const token = jwt.sign(
            {
              user: {
                id: checkUser.id,
                name: checkUser.name,
                email: checkUser.email,
              },
            },
            'secret'
          );
          res.status(200).json({ message: 'Login success', data: token });
        } else {
          res.status(403).json({ message: 'Wrong password' });
        }
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
