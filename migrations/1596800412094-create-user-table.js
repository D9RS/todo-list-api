'use strict';

require('dotenv').config();

const db = require('../core/database');

module.exports.up = async () => {
    return db.query(`
        CREATE TABLE \`user\` (
            \`id\` SERIAL NOT NULL PRIMARY KEY,
            \`login\` VARCHAR(32) NOT NULL UNIQUE,
            \`password\` VARCHAR(64) NOT NULL
        );
    `);
};

module.exports.down = async () => {
    return db.query(`
        DROP TABLE \`user\`;
    `);
};
