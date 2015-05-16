
var mongoose = require('mongoose');
var sendResp = require('../../sendResp');

var model = mongoose.model('College');

module.exports = function(req, res, body){
    model.findById(body['_id'],function(err, user){

        if(err){
            return sendResp( false, '数据库错误', res );
        }
        for( i in body ){
            if(i === '_id') continue;
            user[i] = body[i];
        }
        user.save(function(err){
            if(err)
                return sendResp( false, '数据库错误', res );

            return sendResp( true, '修改成功', res );
        })
    })
}