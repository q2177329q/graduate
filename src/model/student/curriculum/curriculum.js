/**
 * Created by quan on 2015/5/6.
 */
var mongoose = require('mongoose');
var cla = mongoose.model('Class');


module.exports = function(req, res, user){
    var _id = req.session['_id'],

        collegeName = req.session.collegeName,
        specialty = req.session.specialty,
        grade = req.session.grade,
        classNo= req.session.classNo;
    console.log(_id)
    cla.findOne({
        className : collegeName + specialty + grade + '(' + classNo + ')'
    }, function(err, doc){
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
        res.render('student/curriculum/curriculum',{title:'个人课表',
            user:cur})
    })
}