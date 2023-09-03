const express = require('express');
const Gym = require('./Model');
const cors = require('cors');
const app = express();




app.use(cors());


app.use(express.urlencoded({ extended: true }));


/* get all gyms */
app.get('/gyms', async (req, res) => {
    const gyms = await Gym.find({});
    res.send(gyms)
})



app.listen(8000, () => {
    console.log('listening on port 3000...')
})