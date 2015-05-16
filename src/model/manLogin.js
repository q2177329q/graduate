/**
 * Created by Administrator on 2015/4/8.
 */
  var crypto = require('crypto');

  module.exports = function(old){
    return crypto.update(old).digest('hex');
  }