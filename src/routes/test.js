'use strict';
/**
* nodejs project
*
* @author leo <leo16241022@gmail.com>
*/

module.exports = function(done){
  console.log('首页');
  $.router.get('/',function(req,res,next){
    res.end(`北京时间是：${new Date()}`);
  });
  done();
};
