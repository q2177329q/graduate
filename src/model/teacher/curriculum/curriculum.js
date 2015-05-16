/**
 * Created by quan on 2015/5/6.
 */
var mongoose = require('mongoose');
var teacher = mongoose.model('Teacher');


module.exports = function(req, res, user){
    var _id = req.session['_id'];
    console.log(_id)
    teacher.findById(_id, function(err, doc){
        if(err){
            console.log(err)
            return err;
        }
       var cur = {}
       for( item = doc.curriculum.length - 1; item >= 0; item-- ){
           var week = doc.curriculum[item].week,
               time = doc.curriculum[item].time;
           cur['w'+week+'d'+time] = doc.curriculum[item]
       }
        console.log(cur)
        res.render('teacher/curriculum/curriculum',{title:'个人课表',
            user:cur})
    })
}