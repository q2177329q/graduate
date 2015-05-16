
var mongoose = require('mongoose');
var sendResp = require('../../sendResp');

var model = mongoose.model('Curriculum');

module.exports = function(req, res, body){
    model.findById(body['_id'],function(err, user){
        if(err){
            return sendResp( false, '数据库错误', res );
        }
        var list = user.list;
        for( i in body ){
            var same = false;
            if(i === '_id') continue;
            for( item in list ){
                if( body[i] === list[item].name){
                    console.log(body[i] + 'ksdjfkdjk')
                    same = true;
                    break;
                }
            }
            if( !same ){
                console.log(body[i] + 'else')
                for( item in list ){

                    if( i === list[item].name ){
                        console.log(body[i] + 'else')
                        list[item].name = body[i];
                        break;
                    }
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