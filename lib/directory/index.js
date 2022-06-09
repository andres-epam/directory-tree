const fs = require('fs');
const path = require('path');
const config = require('../../config');

const url = path.join(__dirname, '../../', config.directoryPath);

exports.directory = JSON.parse(fs.readFileSync(url));
