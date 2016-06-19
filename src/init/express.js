'use strict';
/**
* nodejs project
*
* @author leo <leo16241022@gmail.com>
*/
import path from 'path';
import express from 'express';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import multiparty from 'connect-multiparty';
import session from 'express-session';

module.exports = function(done){
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:false}));
  app.use(multiparty());
  app.use(session({
    secret:$.config.get('web.session.secret')
  }));
  const router = express.Router();

  const routerWrap = {};
  ['get','post','put','del','delete','head'].forEach(method=>{
    routerWrap[method]=function(path, ...fnList){
      fnList = fnList.map(fn=>{
        return function(req,res,next){
          const ret = fn(req,res,next);
          if(ret.catch)
            ret.catch(next);
        };
      });
      router[method](path, ...fnList);
    }
  });

  $.router = routerWrap;

  app.use(router);
  app.use('/static', serveStatic(path.resolve(__dirname, '../../static')));

  app.listen($.config.get('web.port'),(err) =>{
    console.log($.config.get('web.port'));
    done(err);
  });
};
