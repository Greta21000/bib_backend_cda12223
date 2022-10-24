const express = require('express')

const musiquesControllers = require('../controllers/musiques-controllers');

const router = express.Router();

router.get('/', musiquesControllers.getMusiques)

router.get('/:musiqueid', musiquesControllers.getMusiqueById)

router.post('/', musiquesControllers.createMusique)

router.patch('/:musiqueid', musiquesControllers.updateMusique)

module.exports = router;