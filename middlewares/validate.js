function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) {
      return res.status(400).json({
        status: 'error',
        messages: error.details.map(d => d.message)
      });
    }
    req.body = value; // req.body validé et nettoyé
    next();
  };
}

module.exports = validate;
