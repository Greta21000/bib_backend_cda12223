const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const HttpError = require("./models/http-error");
const musiquesRoutes = require("./routes/musiques-routes");
// const filmsRoutes = require('./routes/films-routes');

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/musiques", musiquesRoutes);
// app.use('/api/films', filmsRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Page non trouvée", 404);
  next(error);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    //vérifier si la réponse a terminé / a été retournée
    return next(error);
  }
  res.status(error.code || 500); //vérifier si un code erreur spécifique a été généré par le router
  res.json({ message: error.message || "Une erreur non gérée est survenue" });
});

const uri = `mongodb+srv://gretaUser:NBx2Ov4kfGJtKQbM@clustergreta.sak53ax.mongodb.net/Greta?retryWrites=true&w=majority`;

const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
  .connect(uri, options)
  .then(() => {
    app.listen(port, console.log(`Server running on port ${port}`));
  })
  .catch((err) => {
    console.log(err);
  });
