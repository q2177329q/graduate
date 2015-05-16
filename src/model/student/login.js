/**
 * Created by Administrator on 2015/4/8.
 */
var mongoose = require('mongoose');

var Student = mongoose.model( 'Student' )

module.exports = function(req, res, callback){
    Student.find({
        stuId : req.body.stuUsername,
        password : req.body.stuPassword
    },function(err, doc){

        if( err ) {
            return res.json({
                success : false,
                msg : '数据库错误'
            });
        }
        if( doc.length > 0 ){
            req.session['_id'] = doc[0]['_id'];
            req.session.collegeName = doc[0].collegeName;
            req.session.specialty = doc[0].specialty;
            req.session.grade = doc[0].grade;
            req.session.classNo = doc[0].classNo;
            return res.redirect('/index')
        }
        else{
            return res.end(JSON.stringify({
                success : false,
                msg : '账号或密码错误'
            }));
        }
    })
}