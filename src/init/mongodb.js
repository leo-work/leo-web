'use strict';
/**
* nodejs project
*
* @author leo <leo16241022@gmail.com>
*/

import mongoose from 'mongoose';

module.exports = function(done){

  const debug = $.createDebug('mongoose');
  debug('create mongoose connection ...');

  const conn = mongoose.createConnection($.config.get('db.mongodb'));
  $.mongodb = conn;
  $.model = {};

  done();
};
