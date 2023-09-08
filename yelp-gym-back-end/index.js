const express = require('express');
const Gym = require('./Model');
const cors = require('cors');
const app = express();
const err = require('./util/error')



app.use(cors());


app.use(express.urlencoded({ extended: true }));

app.use(express.json());

/* get all gyms */
app.get('/gyms', async (req, res, next) => {
    try {
        const gyms = await Gym.find({});
        res.send(gyms)
    } catch(e) {
        next(e)
    }
});

app.get('/gyms/:id', async (req, res, next) => {

    try {
        const { id } = req.params;
        const gym = await Gym.findById(id);
        res.send(gym)
    }
    catch(e) {
        next(e)
    }

});

app.post('/gyms', async (req, res, next) => {

    try {
        const gym = new Gym(req.body)
        await gym.save()
        res.status(200).send();
    } catch(e) {
        next(e);
    }

});

app.put('/gyms/:id', async (req, res, next) => {

    
    try {
        const gym = req.body
        const { id } = req.params;
        const response = await Gym.findByIdAndUpdate(id, gym)
        res.send(response);
    } catch(e) {
        next(e);
    }

});

app.delete('/gyms/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const gym = await Gym.findByIdAndDelete(id);
        res.status(203).send();
    } catch(e) {
        next(e)
    }

});

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