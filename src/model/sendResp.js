/**
 * Created by quan on 2015/5/2.
 */
module.exports = function( success, msg, res ){
    res.json({
        success : success,
        msg : msg
    })
}