'use strict';
/**
* nodejs project
*
* @author leo <leo16241022@gmail.com>
*/

module.exports = function (set, get, has){
  //if(has())
  //服务器监听端口
  set('web.port',3000);

  //web session secret
  set('web.session.secret','test');
};
