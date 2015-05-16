/**
 * Created by quan on 2015/5/6.
 */
var mongoose = require('mongoose');
var teacher = mongoose.model('Teacher');


module.exports = function(req, res, title, ref){
    var _id = req.session['_id'];
    console.log(_id)
    teacher.findById(_id, function(err, doc){
        if(err){
            console.log(err)
            return err;
        }
        var cur = []
        for( item = doc.curriculum.length - 1; item >= 0; item-- ){
            var curriculum = doc.curriculum[item].curriculumName;

            if( cur.length > 0 ){
                for( i in cur){
                    if( cur[i] === curriculum ){
                        curriculum = null;
                        break;
                    }
                }
                if( curriculum ) cur.push( curriculum )
            }
            else{
                cur.push( curriculum )
            }
        }
        console.log(cur)
        res.render(ref,{title:title,
            user:cur})
    })
}