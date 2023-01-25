var Joi = require("joi");

const validationMiddleware = (req, resp, next) => {
  const path = req.route.path;
  console.log(path, "Path");
  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "gmail"] },
      }),
    phone: Joi.number().integer().required(),
    address: Joi.string().min(3).max(50),
    skills: Joi.string(),
    hobbies: Joi.string(),
    short_desc: Joi.string(),
  });

  const schemapost = Joi.object()
    .keys({
      name: Joi.string().min(3).max(30).required(),
      // email: Joi.string()
      //   .required()
      //   .email({
      //     minDomainSegments: 2,
      //     tlds: { allow: ["com", "gmail"] },
      //   }),
    })
    .unknown(true);

  const { error } =
    path === "/" ? schema.validate(req.body) : schemapost.validate(req.body);

  if (error) {
    resp.status(404).json({ error: error });
  } else {
    next();
  }
};

module.exports = validationMiddleware;
