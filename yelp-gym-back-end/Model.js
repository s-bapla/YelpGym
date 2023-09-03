const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/YelpGym', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to mongo.');
    })
    .catch((e) => {
        console.log('ERROR:', e);
    });

const Schema = mongoose.Schema

const gymSchema = new Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
    location: String
})

module.exports = mongoose.model('Gym', gymSchema)
console.log(module.exports)