const mongoose = require('mongoose');
const Review = require('./ReviewModel');

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

const Schema = mongoose.Schema;

const gymSchema = new Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

gymSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({_id: {$in: doc.reviews}});
    }
})

module.exports = mongoose.model('Gym', gymSchema);
