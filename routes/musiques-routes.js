const express = require('express')
const HttpError = require('../models/http-error')

const router = express.Router();

const MUSIQUES = [
    {
        id : '1',
        auteur: "Daft Punk",
        annee: 2013,
        titre: "Get lucky",
        imageUrl: "https://cdn-www.konbini.com/fr/images/files/2013/12/get-lucky-daft-punk.png"
    },
    {
        id : '2',
        auteur: "David Guetta ft Sia",
        annee: 2011,
        titre: "Titanium",
        imageUrl: "https://images-eu.ssl-images-amazon.com/images/I/51cQ8TfyqJL._SX342_QL70_ML2_.jpg"
    },
    {
        id : '3',
        auteur: "Shaka Ponk",
        annee: 2019,
        titre: "Smells like teen spirits",
        imageUrl: "https://i.ytimg.com/vi/MEecsZXQjCs/maxresdefault.jpg"
    },
    {
        id : '4',
        auteur: "Imagine Dragon",
        annee: 2018,
        titre: "Natural",
        imageUrl: "https://i.pinimg.com/originals/9f/1e/58/9f1e58187a71ef80a06be9da1261ccfd.jpg"
    }
  ];


router.get('/', (req, res) => {
    res.json({MUSIQUES})
  //   console.log(req);
  })

router.get('/:musiqueid', (req, res, next) => {
    const mId = req.params.musiqueid;
    // console.log(mId)
    const musique = MUSIQUES.find(m => {
        return m.id === mId;
    })
    if (!musique){
        // return res.status(404).json({message: "Musique non trouvée pour cet identifiant"})
        return next(
            new HttpError('Musique non trouvée', 404));
        //    throw new HttpError('Musique non trouvée', 404);
    }

    res.json({musique})
})

module.exports = router;