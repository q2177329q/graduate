/**
 * Created by quan on 2015/4/29.
 */
var mongoose = require('mongoose');
var sendResp = require('../../sendResp');


var Homework = mongoose.model('Homework');

module.exports = function( req, res, user ) {
    var homework = new Homework({
        curriculumName: user.curriculum,
        teacherId: req.session['_id'],
        teacherName: req.session.name,
        postTime: (new Date).getTime(),
        submitTime: user.date,
        text: user.homework
    })
    homework.save(function (err, doc) {
        if (err) {
            return sendResp(false, '数据库错误', res);
        }
        return sendResp(true, '增加成功', res);
    })
}
