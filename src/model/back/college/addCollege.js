
var mongoose = require('mongoose');
var sendResp = require('../../sendResp');

var CollegeSchema = mongoose.Schema({
    collegeName : String,//学院名
    dean : String,//院长
    specialtyList : [//专业列表
        {
            name: String,//专业名字
            studentNum: Number//专业人数
        }
    ]
})
mongoose.model('College', CollegeSchema)
var College = mongoose.model('College');

module.exports = function( req, res, user ){

    College.findOne( {collegeName: user.collegeName}, function(err, result){
        if(err){
            return sendResp( false, '数据库错误', res );
        }

        else if( result ){
            return sendResp( false, '学院已存在', res );
        }

        else{
            var college = new College({
                collegeName : user.collegeName,
                dean : user.dean,
            })
            college.save(function(err, doc){
                if(err){
                    return sendResp( false, '数据库错误', res );
                }
                return sendResp( true, '增加成功', res );
            })
        }
    } )
}
