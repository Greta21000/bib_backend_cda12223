const express = require('express')
const musiquesRoutes = require('./routes/musiques-routes');
// const filmsRoutes = require('./routes/films-routes');

const app = express()
const port = 5000

app.use('/api/musiques', musiquesRoutes);
// app.use('/api/films', filmsRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
