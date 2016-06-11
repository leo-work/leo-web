'use strict';
/**
* nodejs project
*
* @author leo <leo16241022@gmail.com>
*/

import mongoose from 'mongoose';

module.exports = function(done){
  const conn = mongoose.createConnection($.config.get('db.mongodb'));
  $.mongodb = conn;
  $.model = {};
  console.log('2323');
  done();
};
