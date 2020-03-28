const knex = require('knex');
const connection = require('../../knexfile');

const config = process.env.NODE_ENV == 'test' ? connection.test : connection.development;

module.exports = knex(config);