
var mongoose = require('mongoose');
var sendResp = require('../../sendResp');

var model = mongoose.model('Class');

module.exports = function(req, res, body){
    var className = body.collegeName + body.specialty + body.grade + '(' + body.classNum + ')'
    model.findOne( {className: className }, function(err, result) {
        if (err) {
            return sendResp(false, '数据库错误', res);
        }

        if( result ){
            return sendResp( false, '班级已存在', res );
        }

        model.findById(body['_id'], function (err, user) {
            if (err) {
                return sendResp(false, '数据库错误', res);
            }

            for (i in body) {
                if (i === '_id' || !body[i]) continue;
                user[i] = body[i];
            }
            user.className = className;

            user.save(function (err) {
                if (err)
                    return sendResp(false, '数据库错误', res);

                return sendResp(true, '修改成功', res);
            })
        })

    })
}