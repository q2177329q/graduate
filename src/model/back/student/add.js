/**
 * Created by Administrator on 2015/4/9.
 */
var mongoose = require('mongoose');
var sendResp = require('../../sendResp');

var StucentSchema = mongoose.Schema({
    stuId : Number,//学号
    password : String,//密码
    name : String,//姓名
    sex : String,//性别
    birthday : String,//生日,
    classNo : String,//班别
    email : String,//邮件
    tel : Number,//电话
    admission : String,//入学时间
    address : String,//住址
    comment : String,//备注
    collegeName : String,//学院
    specialty : String,//专业
    grade : Number//年级
})
mongoose.model('Student', StucentSchema)
var Student = mongoose.model('Student');

module.exports = function( req, res, user ){

    Student.findOne( {stuId: user.stuId}, function(err, result){
        if(err){
            return sendResp( false, '数据库错误', res );
        }

        else if( result ){console.log(result);
            return sendResp( false, '用户已存在', res );
        }

        else{
            var student = new Student({
                stuId : user.stuId,
                password : String(user.stuId).slice(-6),
                name : user.name,
                sex : user.sex,
                birthday : user.birthday,
                classNo : user.classNo,
                email : user.email,
                tel : user.tel,
                admission : user.admission,
                address : user.address,
                comment : user.comment,
                collegeName : user.collegeName,
                specialty : user.specialty,
                grade : user.grade
            })
            student.save(function(err, doc){
                if(err){
                    return sendResp( false, '数据库错误', res );
                }
                return sendResp( true, '增加成功', res );
            })
        }
    } )
}