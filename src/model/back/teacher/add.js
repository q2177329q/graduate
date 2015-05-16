/**
 * Created by Administrator on 2015/4/9.
 */
var mongoose = require('mongoose');
var sendResp = require('../../sendResp');

var TeacherSchema = mongoose.Schema({
    name : String,//姓名
    id : Number,//工号
    password : String,//密码
    tel : Number,//电话
    email : String,//邮件
    collegeName : String,//专业
    sex : String,//性别
    curriculum : mongoose.Schema.Types.Mixed//课程
})
mongoose.model('Teacher', TeacherSchema)
var teacher = mongoose.model('Teacher');

module.exports = function( req, res, user ){

    teacher.findOne( {id: user.id}, function(err, result){
        if(err){
            return sendResp( false, '数据库错误', res );
        }

        else if( result ){
            return sendResp( false, '用户已存在', res );
        }

        else{
            var tea = new teacher({
                name : user.name,
                id : user.id,
                password : String(user.id).slice(-6),
                tel : user.tel,
                email : user.email,
                collegeName : user.collegeName,
                sex : user.sex
            })
            tea.save(function(err, doc){
                if(err){
                    return sendResp( false, '数据库错误', res );
                }
                return sendResp( true, '增加成功', res );
            })
        }
    } )
}
