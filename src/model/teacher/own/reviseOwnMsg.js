/**
 * Created by quan on 2015/4/27.
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
        console.log('doc'+ doc);
        res.render('teacher/msg/reviseOwnMsg',{
            title:'修改信息',
            user:doc
        })
    })
}