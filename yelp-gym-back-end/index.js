const express = require('express');
const Gym = require('./Model');
const cors = require('cors');
const app = express();




app.use(cors());


app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.delete('/gyms/:id', async (req, res) => {

    const { id } = req.params
    const gym = await Gym.findByIdAndDelete(id);
    console.log("hii")
    res.status(203).send();
})
/* get all gyms */
app.get('/gyms', async (req, res) => {
    const gyms = await Gym.find({});
    res.send(gyms)
})

app.get('/gyms/:id', async (req, res) => {
    const { id } = req.params;
    const gym = await Gym.findById(id);
    console.log(gym)
    res.send(gym)
})

app.post('/gyms', async (req, res) => {
    const gym = new Gym(req.body)
    console.log(req.body)
    await gym.save()
    res.status(200).send();
})



app.listen(8000, () => {
    console.log('listening on port 8000...')
})