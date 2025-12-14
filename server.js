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
    poster_path: String 
});
const Movie = mongoose.model("Movie", movieSchema);

app.post("/api/favorites", async (req, res) => {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.json({ message: "Movie saved to DB!", movie: newMovie });
});

app.listen(5000, () => console.log("Server running on port 5000"));
