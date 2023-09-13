const express = require('express');
const Gym = require('./models/GymsModel');
const cors = require('cors');
const app = express();
const err = require('./util/error');
const { gymSchema, reviewSchema } = require('./schemaValidation.js');
const Review = require('./models/ReviewModel');




app.use(cors());


app.use(express.urlencoded({ extended: true }));

app.use(express.json());

function validateGymSchema(req, res, next) {
    const { error } = gymSchema.validate(req.body);

    if (error) {
        const msg = error.details.map((item) => {
            return item.message
        }).join(',');
        throw new err(msg, 400)
    } else {
        next();
    }
}

function validateReviewSchema(req, res, next) {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((item) => {
            return item.message
        }).join(',');
        throw new err(msg, 400)
    } else {
        next();
    }
}



/* get all gyms */
app.get('/gyms', async (req, res, next) => {
    try {
        const gyms = await Gym.find({});
        res.send(gyms)
    } catch (e) {
        next(e)
    }
});

app.get('/gyms/:id', async (req, res, next) => {

    try {
        const { id } = req.params;
        const gym = await Gym.findById(id).populate('reviews');
        res.send(gym)
    }
    catch (e) {
        next(e)
    }

});

app.post('/gyms', validateGymSchema, async (req, res, next) => {

    try {
        const gym = new Gym(req.body)
        await gym.save()
        res.status(200).send();
    } catch (e) {
        next(e);
    }

});

app.put('/gyms/:id', validateGymSchema, async (req, res, next) => {


    try {
        const gym = req.body
        const { id } = req.params;
        const response = await Gym.findByIdAndUpdate(id, gym)
        res.send(response);
    } catch (e) {
        next(e);
    }

});

app.delete('/gyms/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const gym = await Gym.findByIdAndDelete(id);
        res.status(203).send();
    } catch (e) {
        next(e)
    }

});



app.post('/gyms/:id/reviews', validateReviewSchema, async (req, res, next) => {
    try {
        const review = new Review(req.body);
        const gym = await Gym.findById(req.params.id);
        gym.reviews.push(review);
        await review.save();
        await gym.save();
        res.send({reviewId: review._id, body: review.body, rating: review.rating})
    } catch (e) {
        next(e)
    }

})

app.delete('/gyms/:id/reviews/:reviewId', async (req, res, next) => {
    try {
        const { id, reviewId } = req.params;
        await Gym.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
        await Review.findByIdAndDelete(reviewId);
        res.status(203).send();
    } catch(e) {
        next(e);
    }
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        status: 'error',
        statusCode: statusCode,
        message: message
    });
});

app.listen(8000, () => {
    console.log('listening on port 8000...')
});