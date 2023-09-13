const joi = require('joi')

module.exports.gymSchema = joi.object({
    name: joi.string().required(),
    location: joi.string().required(),
    description: joi.string().required(),
    image: joi.string().required(),
    price: joi.number().required().min(0)
});

module.exports.reviewSchema = joi.object({
    body: joi.string().required(),
    rating: joi.number().required().min(0).max(5)
})