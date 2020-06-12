module.exports = function (errors) {
  return errors.map((error) => ({
    path: error.path,
    message: error.message,
  }));
};
