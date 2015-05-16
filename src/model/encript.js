/**
 * Created by Administrator on 2015/4/8.
 */
  var crypto = require('crypto');

  module.exports = function(old){
    return crypto.createHash('md5').update(old).digest('hex');
  }