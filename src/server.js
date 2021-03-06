'use strict';
/**
* nodejs project
*
* @author leo <leo16241022@gmail.com>
*/

import path from 'path';
import ProjectCore from 'project-core';
import createDebug from 'debug';

const $ = global.$ = new ProjectCore();
const type = "TypeError" ;

//创建debug函数
$.createDebug = function(name){
  return createDebug('my:' + name);
};

const debug = $.createDebug('server');

//加载配置文件
$.init.add((done) => {

  $.config.load(path.resolve(__dirname, 'config.js'));

  const env = process.env.NODE_ENV || null;

  if(env){
    $.config.load(path.resolve(__dirname, '../config', env + '.js'));
  }
  $.env = env;
  done();
});




//初始化mongodb
$.init.load(path.resolve(__dirname, 'init', 'mongodb.js'));

//加载Models
$.init.load(path.resolve(__dirname, 'models'));

//加载method
$.init.load(path.resolve(__dirname, 'method'));

//初始化Express
$.init.load(path.resolve(__dirname, 'init', 'express.js'));

//初始化中间件
$.init.load(path.resolve(__dirname, 'middlewares'));

//加载路由
$.init.load(path.resolve(__dirname, 'routes'));

//初始化
$.init((err) =>{
  if(err){
    const errbool = (err instanceof TypeError);
    process.exit(-1);//异常退出
  }else{
    console.log('init success ! [env = %s]',$.env);
  }
});
