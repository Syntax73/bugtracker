require('dotenv').config();

module.exports = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect: process.env.DB_DIALECT,
  logging: true,
  define: {
    underscored: true,
    timestamps: true,
    underscoredAll: true,
  },
};
