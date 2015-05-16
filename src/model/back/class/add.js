var mongoose = require('mongoose');
var sendResp = require('../../sendResp');

var ClassSchema = mongoose.Schema({
    className: String,//班级名
    grade: Number,//年级
    classNum: Number,//班别
    specialty: String,//专业
    headTeacher: String,//班主任
    collegeName: String,//学院
    studentNum: Number,//班级人数
    flag: Boolean,//排课标志
    curriculum : mongoose.Schema.Types.Mixed,//课表
    schedule: mongoose.Schema.Types.Mixed//课表，排课的时候用
})
mongoose.model('Class', ClassSchema)
var ClassInfo = mongoose.model('Class');

module.exports = function( req, res, user ){

    ClassInfo.findOne( {className: user.collegeName + user.specialty + user.grade + '(' + user.classNum + ')'}, function(err, result){
        if(err){
            return sendResp( false, '数据库错误', res );
        }

        else if( result ){
            return sendResp( false, '班级已存在', res );
        }

        else{
            var tt = [];
            for( var i = 0; i < 20; i++){
                tt.push({
                    0 : []
                })
            }
            var classInfo = new ClassInfo({
                className : user.collegeName +  user.specialty + user.grade + '(' + user.classNum  + ')',
                grade : user.grade,
                classNum : user.classNum,
                specialty : user.specialty,
                headTeacher : user.headTeacher,
                collegeName : user.collegeName,
                studentNum:user.studentNum,
                flag : false
            })
            classInfo.save(function(err, doc){
                if(err){
                    return sendResp( false, '数据库错误', res );
                }
                return sendResp( true, '增加成功', res );
            })
        }
    } )
}
