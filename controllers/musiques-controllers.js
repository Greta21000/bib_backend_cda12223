const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-error");

const MUSIQUES = [
  {
    id: "1",
    auteur: "Daft Punk",
    annee: 2013,
    titre: "Get lucky",
    imageUrl:
      "https://cdn-www.konbini.com/fr/images/files/2013/12/get-lucky-daft-punk.png",
  },
  {
    id: "2",
    auteur: "David Guetta ft Sia",
    annee: 2011,
    titre: "Titanium",
    imageUrl:
      "https://images-eu.ssl-images-amazon.com/images/I/51cQ8TfyqJL._SX342_QL70_ML2_.jpg",
  },
  {
    id: "3",
    auteur: "Shaka Ponk",
    annee: 2019,
    titre: "Smells like teen spirits",
    imageUrl: "https://i.ytimg.com/vi/MEecsZXQjCs/maxresdefault.jpg",
  },
  {
    id: "4",
    auteur: "Imagine Dragon",
    annee: 2018,
    titre: "Natural",
    imageUrl:
      "https://i.pinimg.com/originals/9f/1e/58/9f1e58187a71ef80a06be9da1261ccfd.jpg",
  },
];

const getMusiques = (req, res) => {
  res.json({ MUSIQUES });
};

const getMusiqueById = (req, res, next) => {
  const mId = req.params.musiqueid;
  // console.log(mId)
  const musique = MUSIQUES.find((m) => {
    return m.id === mId;
  });
  if (!musique) {
    // return res.status(404).json({message: "Musique non trouvée pour cet identifiant"})
    return next(new HttpError("Musique non trouvée", 404));
  }
  res.json({ musique });
};

const createMusique = (req, res, next) => {
  console.log(req);
  const { titre, auteur, annee, imageUrl } = req.body;
  const createdMusique = {
    id: uuidv4(),
    titre,
    auteur,
    annee,
    imageUrl,
  };
  MUSIQUES.push(createdMusique);
  res.status(201).json({ musique: createdMusique });
};

const updateMusique = (req, res, next) => {
  const { titre, auteur, annee, imageUrl } = req.body;
  const mId = req.params.musiqueid;

  const updatedMusique = {
    ...MUSIQUES.find((m) => {
      return m.id === mId;
    }),
  };
  const musiqueIndex = MUSIQUES.findIndex((m) => m.id === mId);
  updatedMusique.titre = titre;
  updatedMusique.annee = annee;
  updatedMusique.auteur = auteur;
  updatedMusique.imageUrl = imageUrl;

  MUSIQUES[musiqueIndex] = updatedMusique;

  res.status(200).json({ musique: updatedMusique });
};

exports.getMusiques = getMusiques;
exports.getMusiqueById = getMusiqueById;
exports.createMusique = createMusique;
exports.updateMusique = updateMusique;
