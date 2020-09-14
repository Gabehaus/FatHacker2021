const Joi = require("joi");

module.exports = {
  validateBody: schema => {
    return (req, res, next) => {
      const result = schema.validate(req.body);
      if (result.error) {
        return res.status(400).json(result.error);
      }

      if (!req.value) {
        req.value = {};
      }
      req.value["body"] = result.value;
      next();
    };
  },

  schemas: {
    usersSchema: Joi.object().keys({
      name: Joi.string(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required()
        .min(6)
        .max(12),
      confirm_password: Joi.string()
        .valid(Joi.ref("password"))
        .messages({ "any.only": "Passwords do not match" })
    })
  }
};
