/**
 * Created by quan on 2015/4/29.
 */
var mongoose = require('mongoose');

var teacher = mongoose.model('Teacher');

module.exports = function(req, res, tea){
    teacher.findOne({
        id : tea.id,
        password : tea.password
    },function(err, doc){
        if( err ) {
            return res.json({
                success : false,
                msg : '数据库错误'
            });
        }
        console.log(doc)
        if( doc && doc['_id']){
            req.session['_id'] = doc['_id'];
            req.session.name = doc.name;
            return res.redirect('/teacher/index')
        }
        else{
            return res.end(JSON.stringify({
                success : false,
                msg : '账号或密码错误'
            }));
        }
    })
}