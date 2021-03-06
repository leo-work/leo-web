'use strict';

/**
* nodejs project
*
* @author leo <leo16241022@gmail.com>
*/


module.exports = function (done) {

    $.router.post('/api/topic/add', $.checkLogin,  async function (req, res, next) {

      req.body.author = req.session.user._id;
      if ('tags' in req.body) {
        req.body.tags = req.body.tags.split(',').map(v => v.trim()).filter(v => v);
      }

      const topic = await $.method('topic.add').call(req.body);

      res.json({success:true,topic});

    });


    $.router.get('/api/topic/list', async function (req, res, next) {

      if ('tags' in req.query) {
        req.query.tags = req.query.tags.split(',').map(v => v.trim()).filter(v => v);
      }

      const list = await $.method('topic.list').call(req.query);

      res.json({success:true,list});

    });


    $.router.get('/api/topic/item/:topic_id', async function (req, res, next) {

      const topic = await $.method('topic.get').call({_id: req.params.topic_id});
      if (!topic)
        return next(new Error(`帖子： ${req.params.topic_id} 不存在！`));
      res.json({success:true,topic});
    });


    $.router.post('/api/topic/item/:topic_id', $.checkLogin, $.checkTopicAuthor, async function (req, res, next) {

      if ('tags' in req.body) {
        req.body.tags = req.body.tags.split(',').map(v => v.trim()).filter(v => v);
      }

      req.body._id = req.params.topic_id;
      await $.method('topic.update').call(req.body);

      const topic = await $.method('topic.get').call({_id: req.params.topic_id});

      res.json({success:true,topic});

    });


    $.router.delete('/api/topic/item/:topic_id', $.checkLogin, $.checkTopicAuthor, async function (req, res, next) {

      const topic = await $.method('topic.delete').call({_id: req.params.topic_id});

      res.json({success:true,topic});

    });


    $.router.post('/api/topic/item/:topic_id/comment/add', $.checkLogin, async function (req, res, next) {

      req.body._id = req.params.topic_id;
      req.body.author = req.session.user._id;

      const comment = await $.method('topic.comment.add').call(req.body);

      res.json({success:true,comment});
    });


    $.router.post('/api/topic/item/:topic_id/comment/delete', $.checkLogin, async function (req, res, next) {

      req.body._id = req.params.topic_id;

      const query = {
        _id: req.params.topic_id,
        cid: req.body.cid,
      };
      const comment = await $.method('topic.comment.get').call(query);

      if (comment && comment.comments && comment.comments[0]) {
        const item = comment.comments[0];
        if (req.session.user.isAdmin || item.author.toString() === req.session.user._id.toString()) {
          await $.method('topic.comment.delete').call(query);
        } else {
          return next(new Error('access denied'));
        }
      } else {
        return next(new Error('评论不存在!'));
      }
      res.json({success:true,comment: comment.comments[0]});
    });

  done();

};
