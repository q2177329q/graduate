/**
 * Created by quan on 2015/4/25.
 */
var mongoose = require('mongoose');
var student = mongoose.model('Student');


module.exports = function(req, res, user){
    var _id = req.session['_id'];
    console.log(_id)
    student.findById(_id, function(err, doc){
        if(err){
            console.log(err)
            return err;
        }
        user = doc;
        console.log('doc'+ doc);
        res.render('student/ownMsg',{title:'个人信息',
            user:doc})
    })
}