var mongoose = require('mongoose');
var sendResp = require('../../sendResp');

var model = mongoose.model('Teacher');

module.exports = function(req, res, body){
    model.findById(body['_id'],function(err, user){
        if(err){
            return sendResp( false, '数据库错误', res );
        }
        for( i in body ){
            if(i === '_id' || i === 'collegeName' || i === 'collegeName2' ) continue;
            user[i] = body[i];
        }
        user.collegeName = body.collegeName || body.collegeName2;

        user.save(function(err){
            if(err)
                return sendResp( false, '数据库错误', res );

            return sendResp( true, '修改成功', res );
        })
    })
}
