const fs = require('fs');
const result = {};
const asyncList = ['readdir', 'stat'];

const makePromise = key => {
    result[key] = (path, logger) => {
        return new Promise(function(resolve, reject) {
            fs[key](path, (error, result) => {
                if (error) {
                    reject(error);
                    return false;
                }
                resolve(result);
            });
        });
    };
};

asyncList.forEach(makePromise);

module.exports = result;
