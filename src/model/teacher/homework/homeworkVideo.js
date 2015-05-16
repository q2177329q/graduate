/**
 * Created by quan on 2015/5/9.
 */
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');
var mongoose = require('mongoose');
var Homework = mongoose.model('Homework');
var sendResp = require('../../sendResp');


module.exports = function(req, res, user){

    var base64Data = req.body.img.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    name = (new Date()).getTime();
    fs.writeFile("./public/images/homework/"+ name +".png", dataBuffer, function(err) {
        if(err){
            console.log('false')

        }else{
            var homework = new Homework({
                curriculumName: user.curriculum,
                teacherId: req.session['_id'],
                teacherName: req.session.name,
                postTime: (new Date).getTime(),
                submitTime: user.date,
                photos : name + '.png'
            })
            homework.save(function (err, doc) {
                if (err) {
                    return sendResp(false, '数据库错误', res);
                }
                console.log('dkkkkkkkkkkk')
                return sendResp(true, '增加成功', res);
            })
        }
    });
}