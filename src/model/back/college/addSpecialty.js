
var mongoose = require('mongoose');
var sendResp = require('../../sendResp');

var College = mongoose.model('College');

module.exports = function( req, res, body ){

    College.findOne( {collegeName: body.collegeName}, function(err, result){
        if(err){
            return sendResp( false, '数据库错误', res );
        }

        if( result )
            for( i in result.specialtyList ){
                if(i.name === body.specialty )
                    return sendResp( false, '专业已存在', res );
            }

        result.specialtyList.push({
            name : body.specialty
        })
        result.save(function(err, doc){
            if(err){
                return sendResp( false, '数据库错误', res );
            }
            return sendResp( true, '增加成功', res );
        })
    } )
}
