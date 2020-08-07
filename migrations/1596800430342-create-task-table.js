'use strict';

require('dotenv').config();

const db = require('../core/database');

module.exports.up = async () => {
    return db.query(`
        CREATE TABLE \`task\` (
            \`id\` SERIAL NOT NULL PRIMARY KEY,
            \`text\` VARCHAR(1024) NOT NULL,
            \`is_done\` BOOLEAN NOT NULL DEFAULT 0,
            \`user_id\` BIGINT UNSIGNED NOT NULL,
            FOREIGN KEY (\`user_id\`) REFERENCES user(\`id\`) ON DELETE CASCADE
        );
    `);
};

module.exports.down = async () => {
    return db.query(`
        DROP TABLE \`task\`;
    `);
};
