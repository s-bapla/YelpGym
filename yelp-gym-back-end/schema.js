const joi = require('joi')

module.exports.gymSchema = joi.object({
    name: joi.string().required(),
    location: joi.string().required(),
    description: joi.string().required(),
    image: joi.string().required(),
    price: joi.number().required().min(0)
});