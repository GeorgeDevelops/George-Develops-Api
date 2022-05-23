const config = require('config');
const mongoose  = require('mongoose');
const logger = require('./logger');

module.exports = function(){
    let db = config.get('db');
    mongoose.connect(db, () => {
        return logger.info("Connected on database " + db);
    });
}