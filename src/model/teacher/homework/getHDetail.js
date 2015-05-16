/**
 * Created by quan on 2015/5/9.
 */
var sendResp = require('../../sendResp');
var mongoose = require('mongoose');
var homework = mongoose.model('Homework');
var sendResp = require('../../sendResp');

module.exports = function(req, res, id){
    homework.findById(id,function(err, result){
        if(err){
            if(err){
                return sendResp( false, '数据库错误', res );
            }
        }
        if( result ){
            res.render('teacher/homework/detail',{
                title:'作业',
                detail : result
            })
        }
    })
}
