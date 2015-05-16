
var mongoose = require('mongoose');
var sendResp = require('../../sendResp');

module.exports = function( type, page, perPage, req, res ){
    switch (type){
        case 'manager':
            var model = mongoose.model('Manager');
            break;
        case 'student':
            var model = mongoose.model('Student');
            break;
        case 'class':
            var model = mongoose.model('Class');
            break;
        case 'college':
            var model = mongoose.model('College');
            break;
        case 'teacher':
            var model = mongoose.model('Teacher');
            break;
        case 'curriculum':
            var model = mongoose.model('Curriculum');
            break;
    }
    var listObj = {};

    model.find().skip( (page-1)*perPage ).limit(perPage).exec(
        function(err, doc) {
            if (err) {
                return sendResp( false, '数据库错误', res );
            }

            if( page === 1 ){
                model.count(function(err,cou){
                    if(err){
                        return sendResp( false, '数据库错误', res );
                    }
                    listObj.pageNum = Math.ceil( cou/perPage);
                    listObj.page = page;
                    listObj.success = true;
                    listObj.data = doc;

                    res.json(listObj)
                })
            }
            else {
                listObj.page = page;
                listObj.success = true;
                listObj.data = doc;

                res.json(listObj);
            }
        }
    )
}