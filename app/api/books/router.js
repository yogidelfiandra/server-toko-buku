const express = require('express');
const router = express.Router();
const { auth } = require('../../middlewares/auth');
const {
  getAllBooks,
  createBooks,
  updateBooks,
  deleteBooks,
} = require('./controller');

router.get('/books', auth, getAllBooks);
router.post('/books', auth, createBooks);
router.put('/books/:id', auth, updateBooks);
router.delete('/books/:id', auth, deleteBooks);

module.exports = router;
