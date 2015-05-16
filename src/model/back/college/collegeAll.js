
var mongoose = require('mongoose');
var sendResp = require('../../sendResp');

module.exports = function( type, req, res ){
    var model = mongoose.model('College');

    var listObj = {};

    model.find().exec(
        function(err, doc) {
            if (err) {
                return sendResp( false, '数据库错误', res );

            }

            listObj.success = true;
            listObj.data = doc;

            res.json(listObj)
        }
    )
}