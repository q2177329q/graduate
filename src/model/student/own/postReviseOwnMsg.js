/**
 * Created by quan on 2015/4/27.
 */
var mongoose = require('mongoose');
var student = mongoose.model('Student');


module.exports = function(req, res){
    var _id = req.session['_id'];
    console.log(_id)
    student.findById(_id, function(err, doc){
        if(err){
            return res.end(JSON.stringify({
                success : false,
                msg : '数据库错误'
            }))
        }
        var user = req.body;
        for( item in user ){
            doc[item] = user[item];
        }
        doc.save(function(err){
            if(err){
                return res.end(JSON.stringify({
                    success : false,
                    msg : '数据库错误'
                }))
            }
            res.end(JSON.stringify({
                success : true,
                msg : '修改成功'
            }));
        })
    })
}