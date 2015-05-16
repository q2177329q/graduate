var mongoose = require('mongoose');
var sendResp = require('../../sendResp');
var model = mongoose.model('Manager');

module.exports = function(req, res, manager){
    model.findById(manager['_id'],function(err, user){
        if(err){
            return sendResp( false, '数据库错误', res );
        }
        for( i in manager ){
            if(i === '_id') continue;
            user[i] = manager[i];
        }
        user.save(function(err){
            if(err)
                return sendResp( false, '数据库错误', res );

            return sendResp( true, '修改成功', res );
        })
    })
}