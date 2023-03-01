const Joi = require('joi');

const createUserSchema = Joi.object({
      name: Joi.string()
               .required()
               .min(5),

      profession: Joi.string()
                  .required(),

      password: Joi.string()
                   .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                   .required(),
      confirm_pwd: Joi.ref("password"),
      phone: Joi.number()
            .min(12),
      email: Joi.string()
                .email({minDomainSegments: 2, tlds: {allow: ['com', 'net', 'thejitu']}}),
      DOB: Joi.date()
              .less('12-31-2020')
              .required(),
      age: Joi.boolean()
              .truthy(26)
              .valid(true)
              .required(),
      refered: {
            isRefered: Joi.boolean(),
            referer: Joi.string()
                        .when("isRefered", {is: true, then: Joi.required(), otherwise:Joi.optional()})
      }

}).with("password", "confirm_pwd")
  .xor("phone", "email")


const validateCreateUserSchema = (payload)=>{
      return createUserSchema.validateAsync(payload, {abortEarly:false})
}

module.exports = validateCreateUserSchema