/**
 * Created by Administrator on 2015/4/8.
 */

//var settings = require('../settings');
var mongoose = require('mongoose');
var encript = require('../encript');


var Super = mongoose.model( 'Super' )

module.exports = function(req, res, callback){

    var password = encript( req.body.password );
    console.log(req.body.username)
    Super.find({
        username : req.body.username,
        password : password
    },function(err, doc){
        console.log(doc);
        if( err ) {
            res.redirect('login');
        }
        if( doc.length > 0 ){
            res.redirect('/');
        }
        else{
            res.redirect('login');
        }
    })
}