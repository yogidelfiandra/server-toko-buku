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
      next(error);
    }
  },

  signup: async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return res.status(403).json({ message: 'Password not match' });
      }

      const checkEmail = await User.findOne({ where: { email: email } });

      if (checkEmail) {
        return res.status(403).json({ message: 'Email already used' });
      }

      const user = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        role: 'admin',
      });

      delete user.dataValues.password;

      res.status(201).json({ message: 'Signup success', data: user });
    } catch (error) {
      next(error);
    }
  },
};
