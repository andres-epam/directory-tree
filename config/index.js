const ENVIRONMENT = process.env.NODE_ENV || 'development';

if (ENVIRONMENT !== 'production') require('dotenv').config();

const configFile = `./${ENVIRONMENT}`;

const isObject = variable => variable instanceof Object;

/*
 * Deep immutable copy of source object into tarjet object and returns a new object.
 */
const deepMerge = (target, source) => {
    if (isObject(target) && isObject(source)) {
        return Object.keys(source).reduce(
            (output, key) => ({
                ...output,
                [key]: isObject(source[key]) && key in target ? deepMerge(target[key], source[key]) : source[key]
            }),
            { ...target }
        );
    }
    return target;
};

const config = {
    timezone: process.env.TIMEZONE || 'America/New_York',
    localeTIme: process.env.LOCALE_TIME || 'en-US'
};

const customConfig = require(configFile).config;
module.exports = deepMerge(config, customConfig);