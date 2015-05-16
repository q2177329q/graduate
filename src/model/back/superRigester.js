/**
 * Created by Administrator on 2015/4/8.
 */
//var settings = require('../settings.js');
var mongoose = require('mongoose');
//var connectDb = require('connect')();

//var db = mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));
//db.once( 'open', function (callback) {
//    console.log( 'open' );
//});
//
//mongoose.createConnection( settings.uri );
var SuperSchema = mongoose.Schema({
    username : String,
    password : String,
    type : String
})

var Super = mongoose.model('Super', SuperSchema);

module.exports = function( user ){console.log(1);
    Super.find( {username: user.username}, function(err, result){
        if(err){console.log(2);
            //####
            console.log(err);
        }
        else if(result.length){console.log(result);
            //####
            return ;
        }
        else{console.log(4);
            console.log(result)
            var supers = new Super({
                username : user.username,
                password : user.password,
                type : user.type
            })
            supers.save(function(err, doc){
                //####
                if(err){
                    return console.log(err);
                }
                console.log(doc);
            })
        }
    } )
}