const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(403).json({
        message: 'No files were uploaded.',
      });
    }

    res.status(201).json({
      message: 'File uploaded successfully',
      data: { src: `/uploads/${req.file.filename}` },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { uploadImage };
