const router = require('express').Router();

const { isUserAuthenticated } = require('../middlewares/auth');
const { db } = require('../helpers');
const repository = require('../repository.js')(db);

router.get('/:cityId/attractions', repository.getAttractionsForCityId);

router.post('/attractions', repository.addAttractionToACity);

router.delete('/attractions/:attractionId', repository.deleteAttraction);

router.put('/attractions', repository.editAttraction);

router.post('/rating/:attractionId', isUserAuthenticated, repository.addAttractionRating);

router.put('/rating/:attractionId', isUserAuthenticated, repository.editAttractionRating);

module.exports = router;
