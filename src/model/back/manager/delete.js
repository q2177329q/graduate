
var mongoose = require('mongoose');
var sendResp = require('../../sendResp');

var model = mongoose.model('Manager');

module.exports = function( list, type, page, req, res ){

    switch(type){
        case 'manager':
            model = mongoose.model('Manager');
            break;
        case 'student':
            model = mongoose.model('Student');
            break;
        case 'class':
            model = mongoose.model('Class');
            break;
        case 'college':
            model = mongoose.model('College');
            break;
        case 'teacher':
            model = mongoose.model('Teacher');
            break;
        case 'curriculum':
            model = mongoose.model('Curriculum');
            break;
    }

    if( typeof list === 'string' ){console.log(list)
        model.findById(list, function( err, doc ){
            if( err ){
                return sendResp( false, '数据库错误', res );
            }
            doc.remove(function(err){
                if(err){
                    return sendResp( false, '数据库错误', res );
                }
                    return sendResp( true, '删除成功', res );
            }
        )
    })
    }
}