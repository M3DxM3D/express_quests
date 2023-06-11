const express = require("express");
require('dotenv').config()
const app = express();
const port = process.env.APP_PORT 

//utilisation d'un middleware pour que le JSON soit bien lu

app.use(express.json());


// chemin racine : bienvenue
const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};
app.get("/", welcome);



// chemin pour afficher les films
const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

//chemin pour afficher les utilisateurs

const userHandlers = require("./userHandlers");

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);

//chemin pour ajouter un film: 

app.post("/api/movies", movieHandlers.postMovie);


//chemin pour ajouter un utilisateur: 

app.post("/api/users", userHandlers.postUser);


















app.listen(port, (error) => {
  if (error) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
