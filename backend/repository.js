const sequelize = require('sequelize');
const { City, Permission, Attraction, AttractionsRating } = require('./db/models');

module.exports = () => {
  const getCitiesByPermission = async (req, res) => {
    const { googleId } = req.user;
    try {
      const permissions = await Permission.findAll(
        { attributes: ['cityId'] },
        { where: { googleId: googleId } }
      );
      const allCities = await Promise.all(
        permissions.map(async (p) => await City.findByPk(p.cityId))
      );
      res.status(200).json(allCities);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message || 'Failed to fetch cities' });
    }
  };

  const createCity = async (req, res) => {
    const { city } = req.body;
    const { googleId } = req.user;

    if (!city) {
      res.status(400).json({ message: 'City name can not be empty' });
    }

    try {
      const newCity = await City.create({ city });
      await Permission.create({ cityId: newCity.id, googleId });
      return res.status(200).json({ message: 'New city created successfully', body: newCity });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message || 'Failed to add a new city' });
    }
  };

  const getCityById = async (req, res) => {
    const { cityId } = req.params;
    try {
      const city = await City.findByPk(cityId);
      res.status(200).json(city);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message || 'Failed to fetch city' });
    }
  };

  const deleteCity = async (req, res) => {
    const { cityId } = req.params;
    try {
      const city = await City.findByPk(cityId);
      const removedCity = await city.destroy();
      res.status(200).json({ message: 'City successfully removed', body: removedCity });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message || 'Failed to delete city' });
    }
  };

  const getAttractionsForCityId = async (req, res) => {
    const { cityId } = req.params;
    try {
      const attractionsWithRating = await Attraction.findAll({
        where: { cityId: cityId },
        attributes: {
          include: [[sequelize.fn('AVG', sequelize.col('AttractionsRatings.rating')), 'rating']],
        },
        include: {
          model: AttractionsRating,
          attributes: [],
        },
        raw: true,
        group: ['Attraction.id'],
      });
      res.status(200).json(attractionsWithRating);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message || 'Failed to fetch attractions' });
    }
  };

  const addAttractionToACity = async (req, res) => {
    const { cityId } = req.body;
    try {
      const attractionPayload = req.body;
      const city = await City.findByPk(cityId);

      const attraction = await city.createAttraction({
        cityId,
        attraction: attractionPayload.attraction,
        lat: attractionPayload.lat,
        lng: attractionPayload.lng,
      });
      res.status(200).json({ message: 'Attraction created successfully', body: attraction });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message || 'An error occured while adding attraction' });
    }
  };

  const deleteAttraction = async (req, res) => {
    const { attractionId } = req.params;
    try {
      const attraction = await Attraction.findByPk(attractionId);
      const removedAttraction = await attraction.destroy();
      res.status(200).json({ message: 'Attraction removed', body: removedAttraction });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: err.message || 'An error occured while deleting attraction' });
    }
  };

  const editAttraction = async (req, res) => {
    const { id: attractionId, attraction } = req.body;

    if (!attraction || !attractionId) {
      res.status(400).json({ message: 'Attraction can not be empty' });
    }

    try {
      const attractionToUpdate = await Attraction.findByPk(attractionId);
      attractionToUpdate.attraction = attraction;
      await attractionToUpdate.save();
      res.status(200).json({ message: `Attraction id: ${attractionId} updated` });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message || 'Failed to edit attraction' });
    }
  };

  const addAttractionRating = async (req, res) => {
    const { googleId } = req.user;
    const { rating } = req.body;
    const { attractionId } = req.params;

    if (!rating) {
      res.status(400).json({ message: 'Rating can not be empty' });
    }

    try {
      const attraction = await Attraction.findByPk(attractionId);
      const newAttractionsRating = await attraction.createAttractionsRating({
        attractionId: attractionId,
        rating: rating,
        googleId: googleId,
      });
      res.status(200).json({ message: 'Attractions rating added', body: { newAttractionsRating } });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message || 'Failed to add rating' });
    }
  };

  const editAttractionRating = async (req, res) => {
    const { googleId } = req.user;
    const { rating } = req.body;
    const { attractionId } = req.params;

    if (!rating) {
      res.status(400).json({ message: 'Rating can not be empty' });
    }

    try {
      const attractionRatingToUpdate = await AttractionsRating.findOne({
        where: {
          attractionId: attractionId,
          googleId: googleId,
        },
      });

      attractionRatingToUpdate.rating = rating;
      attractionRatingToUpdate.save();
      res.json({ message: `Attraction rating updated`, body: attractionRatingToUpdate });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message || 'Failed to edit rating' });
    }
  };

  return Object.create({
    getCitiesByPermission,
    createCity,
    getCityById,
    deleteCity,
    getAttractionsForCityId,
    addAttractionToACity,
    deleteAttraction,
    editAttraction,
    addAttractionRating,
    editAttractionRating,
  });
};
