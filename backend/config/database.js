module.exports = {
  development: {
    storage: process.env.DB_FILE,
    dialect: process.env.DB_DIALECT,
    seederStorage: process.env.DB_SEEDER_STORAGE,
    benchmark: true,
    logQueryParameters: true,
    typeValidation: true,
    // logging: false
  },
};
