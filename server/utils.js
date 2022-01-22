const { customAlphabet } = require('nanoid');

const numericNanoId = customAlphabet('1234567890', 9);

module.exports = {
    numericNanoId
};