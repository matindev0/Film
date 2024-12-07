const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://matindev:Matin@cluster0.lcv6xlw.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema and Model
const FilmSchema = new mongoose.Schema({
    title: String,
    video_url: String
});

const Film = mongoose.model('Film', FilmSchema);

// Routes
app.get('/films', async (req, res) => {
    try {
        const films = await Film.find();
        res.json(films);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/films', async (req, res) => {
    const { title, video_url } = req.body;
    try {
        const newFilm = new Film({ title, video_url });
        await newFilm.save();
        res.json(newFilm);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
