'use strict';
/**
* nodejs project
*
* @author leo <leo16241022@gmail.com>
*/

module.exports = function(done){
  const debug = $.createDebug('mongoose');
  debug('load index ...');
  $.router.get('/',function(req,res,next){
    res.end(`北京时间是：${new Date()}`);
  });
  done();
};
