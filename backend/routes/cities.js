const router = require('express').Router();
const { isUserAuthenticated } = require('../middlewares/auth');
const { db } = require('../helpers');
const repository = require('../repository.js')(db);

router.get('', isUserAuthenticated, repository.getCitiesByPermission);

router.post('', repository.createCity);

router.get('/:cityId', repository.getCityById);

router.delete('/:cityId', repository.deleteCity);

module.exports = router;
