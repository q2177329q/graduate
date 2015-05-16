/**
 * Created by quan on 2015/4/30.
 */
var mongoose = require('mongoose');
var sendResp = require('../../sendResp');

var CurriculumSchema = mongoose.Schema({
    collegeName : String,//学院名
    specialtyName : String,//专业名
    grade : Number,//年级
    list : [//课程列表
        {
            name: String,//课程名
            teacher : String,//任课老师
            time : Number//上课时间
        }
    ]
})
mongoose.model('Curriculum', CurriculumSchema)
var Curriculum = mongoose.model('Curriculum');

module.exports = function( req, res, user ){

    Curriculum.findOne( {
        collegeName: user.collegeName,
        specialtyName : user.specialtyName,
        grade : user.grade
    }, function(err, result){
        if(err){
            return sendResp( false, '数据库错误', res );
        }

        if( !result ) {//还没存在
            var curriculum = new Curriculum({
                collegeName: user.collegeName,
                specialtyName: user.specialtyName,
                grade: user.grade,
                list: []
                })
            for( var i = 1; i <= 10; i++ ){
                if( user['curriculum' + i] ){
                    curriculum.list.push({
                        name:  user['curriculum' + i],
                        teacher: user['teacher' + i],
//                        time : [1,1,2,3,4,0,6,7,8,9,10,11,12,13,14,15]
                        time : 16
                    })
                }
            }
            curriculum.save(function (err, doc) {
                if (err) {
                    return sendResp( false, '数据库错误', res );
                }
                return sendResp( true, '增加成功', res );
            })
        }
        else {


            var curriculum,
                flag = null,
                same = false;
            for (var i = 1; i <= 10; i++) {
                curriculum = user['curriculum' + i];
                if (!curriculum) continue;
                if (result && result.list) {
                    same = false;
                    for (item in result.list) {
                        if (result.list[item].name === curriculum) {
                            same = true;
                            break;
                        }
                    }
                    if (!same) {
                        flag = true;
                        result.list.push({
                            name: curriculum,
                            teacher: user['teacher' + i]
                        })
                    }
                }
            }

            if (flag) {
                result.save(
                    function (err, doc) {
                        if (err) {
                            return sendResp( false, '数据库错误', res );
                        }
                        return sendResp( true, '增加成功', res );                    });
            }
            else {
                return sendResp( false, '学院已存在', res );
            }
        }
    })
}