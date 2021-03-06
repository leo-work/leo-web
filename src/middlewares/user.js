'use strict';
/**
* nodejs project
*
* @author leo <leo16241022@gmail.com>
*/


module.exports = function(done){

  $.checkLogin = function(req,res,next){
    if(!(req.session.user && req.session.user._id))
      return next(new Error('请您先登陆之后再发帖！谢谢！'));
    next();
  };

  $.checkTopicAuthor = async function (req, res, next) {

  const topic = await $.method('topic.get').call({_id: req.params.topic_id});
  if (!topic) return next(new Error(`topic ${req.params.topic_id} does not exists`));

  req.topic = topic;

  // if (req.session.user.isAdmin) return next();
  // if (topic.author._id.toString() === req.session.user._id.toString()) return next();

  next(new Error('access denied'));

};

  done();

};
