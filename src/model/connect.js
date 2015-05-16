/**
 * Created by quan on 2015/4/25.
 */
var settings = require('../settings');
var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once( 'open', function (callback) {
    console.log( 'open' );
});

var flag = null;

module.exports = function(res, req, next){
    if(flag) return next();

    flag = mongoose.connect( settings.uri );
    next();
}
