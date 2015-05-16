
var mongoose = require('mongoose');
var sendResp = require('../../sendResp');

var model = mongoose.model('College');

module.exports = function(req, res, body){
    model.findById(body['_id'],function(err, user){
        if(err){
            return sendResp( false, '数据库错误', res );
        }
        var specialtyList = user.specialtyList;
        for( i in body ){
            if(i === '_id') continue;
            for( item in specialtyList ){
                if( i === specialtyList[item].name ){
                    specialtyList[item].name = body[i];
                    break;
                }
            }
        }
        user.save(function(err){

            if(err)
                return sendResp( false, '数据库错误', res );

            return sendResp( true, '修改成功', res );
        })
    })
}