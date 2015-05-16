/**
 * Created by quan on 2015/5/9.
 */
var mongoose = require('mongoose');
var sendResp = require('../../sendResp');

var HomeworkSchema = mongoose.Schema({
    curriculumName : String,//课程名
    teacherName : String,//老师名
    teacherId : String,//老师ID
    postTime : Number,//布置时间
    submitTime : String,//交作业时间
    text : String,//文字作业内容
    photos : String,//图片作业地址
    audio : String//音频作业地址
})
mongoose.model('Homework', HomeworkSchema)
var homework = mongoose.model('Homework');

module.exports = function(req, res){
    var date = new Date();
    homework.find({
        submitTime:{
            "$gte": date.getFullYear() + '-' +
                ((date.getMonth()+1)<10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1)) + '-' +
                (date.getDate()<10 ?  '0'+date.getDate() : date.getDate())
//            "$gte": '2015-05-01'
        }
    }).skip( 0).sort('submitTime').limit(10).exec(function(err, result){
        if (err) {
            return sendResp( false, '数据库错误', res );
        }
//        console.log(result)
        res.render('teacher/homework/hList',{
            title : '课程列表',
            hList : result
        })
    })
}