const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json()); 
app.use(cors()); 

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/myMovieDB"); 

const movieSchema = new mongoose.Schema({ 
    title: String, 
    id: Number, 
    poster_path: String,
    release_date: String, 
    vote_average: Number  
});
const Movie = mongoose.model("Movie", movieSchema);

app.post("/api/favorites", async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.json({ message: "Movie saved to DB!", movie: newMovie });
    } catch (error) {
        res.status(500).json({ error: "Failed to save movie" });
    }
});

app.get("/api/favorites", async (req, res) => {
    try {
        const favorites = await Movie.find();
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch favorites" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
