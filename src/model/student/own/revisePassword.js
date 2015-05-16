/**
 * Created by quan on 2015/4/27.
 */
var mongoose = require('mongoose');
var student = mongoose.model('Student');


module.exports = function(req, res){
    var _id = req.session['_id'];
    var user = req.body;
    console.log(_id)
    student.findOne({
        _id : _id,
        password : user['password-old']
    }, function(err, doc){
        if(err){
            return res.end(JSON.stringify({
                success : false,
                msg : '数据库错误'
            }))
        }
        if( doc.length < 1){
            return res.end(JSON.stringify({
                success : false,
                msg : '密码错误'
            }))
        }
        console.log(doc)
        doc.password = user['password-new'];
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