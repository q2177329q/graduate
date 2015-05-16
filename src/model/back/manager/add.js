/**
 * Created by Administrator on 2015/4/9.
 */
var mongoose = require('mongoose');
var sendResp = require('../../sendResp');

var ManagerSchema = mongoose.Schema({
    username : String,//用户名
    password : String,//密码
    type : String,//管理员类型
    id : Number,//工号
    sex : String,//性别
    tel : Number,//电话
    email : String//邮箱
});
mongoose.model('Manager', ManagerSchema);
var Manager = mongoose.model('Manager');

module.exports = function( req, res, user ){

    Manager.findOne( {username: user.username}, function(err, result){
        if(err){
            return sendResp( false, '数据库错误', res );
        }

        else if( result ){
            return sendResp( false, '用户已存在', res );
        }

        else{
            var manager = new Manager({
                username : user.username,
                password : user.password,
                type : user.type,
                id : user.id,
                sex : user.sex,
                tel : user.tel,
                email : user.email
            })
            manager.save(function(err, doc){
                if(err){
                    return sendResp( false, '数据库错误', res );
                }
                return sendResp( true, '增加成功', res );
        })
        }
    })
}
